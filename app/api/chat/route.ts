import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { searchKnowledgeBase } from "@/lib/searchKnowledgeBase";
import { validateMessage } from "@/lib/validateMessage";
import { logInfo, logWarn, logError } from "@/lib/logger";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import type { ChatRequestBody } from "@/types";



/**
 * POST /api/chat
 *
 * Accepts a JSON body with a `message` string and optional `eli18Mode` boolean.
 * Uses the Google Gemini API (gemini-1.5-flash) if GEMINI_API_KEY is set,
 * with automatic fallback to a local civic knowledge base on failure.
 *
 * Security measures:
 *  - Input is validated and sanitised via {@link validateMessage}.
 *  - Gemini safety settings block harmful content at the BLOCK_MEDIUM_AND_ABOVE threshold.
 *  - All server events are logged in Google Cloud Logging JSON format via {@link logInfo}.
 *  - The `X-Powered-By` header is suppressed via next.config.ts.
 *  - Response-Time header is added for observability.
 */
export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body: unknown = await req.json();

    // Validate that the body is an object before extracting message
    if (typeof body !== "object" || body === null) {
      logWarn("Chat: invalid request body", { body: typeof body });
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const rawMessage = (body as Record<string, unknown>).message;
    const validation = validateMessage(rawMessage);

    if (!validation.valid) {
      logWarn("Chat: message validation failed", { error: validation.error });
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const { sanitized: message } = validation;
    const { eli18Mode } = body as ChatRequestBody;
    const safeEli18Mode = eli18Mode === true;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    logInfo("Chat: request received", {
      messageLength: message.length,
      eli18Mode: safeEli18Mode,
      hasApiKey: Boolean(geminiApiKey),
    });

    // ── Gemini API (primary path) ──────────────────────────────────────
    if (geminiApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: buildSystemPrompt(safeEli18Mode),
          // Safety settings to prevent harmful or off-topic content
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ],
        });

        const result = await model.generateContent(message);
        const geminiAnswer = result.response.text();

        if (geminiAnswer) {
          const elapsed = Date.now() - start;
          logInfo("Chat: Gemini response sent", {
            responseLength: geminiAnswer.length,
            elapsedMs: elapsed,
          });
          return NextResponse.json(
            { response: geminiAnswer },
            {
              headers: {
                "X-Response-Time": `${elapsed}ms`,
                "Cache-Control": "no-store",
              },
            }
          );
        }
      } catch (geminiError) {
        // Log on the server side, but don't expose internals to client
        logError("Chat: Gemini API error, falling back to knowledge base", {
          error: String(geminiError),
        });
      }
    }
    // ── End Gemini integration ─────────────────────────────────────────

    // Fallback: local knowledge base search
    const answer = searchKnowledgeBase(message, safeEli18Mode);
    const elapsed = Date.now() - start;
    logInfo("Chat: knowledge base response sent", {
      elapsedMs: elapsed,
      eli18Mode: safeEli18Mode,
    });
    return NextResponse.json(
      { response: answer },
      {
        headers: {
          "X-Response-Time": `${elapsed}ms`,
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    logError("Chat: unexpected server error", { error: String(err) });
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 }
    );
  }
}
