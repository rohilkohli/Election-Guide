import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { searchKnowledgeBase } from "@/lib/searchKnowledgeBase";
import type { ChatRequestBody } from "@/types";

/** Maximum character length accepted for a user message to prevent abuse. */
const MAX_MESSAGE_LENGTH = 500;

/**
 * System instruction that defines the AI persona and guardrails for the
 * ElectionPath civic assistant. The assistant is constrained to be:
 *  - Politically neutral and factual
 *  - Focused exclusively on the Indian electoral process
 *  - Aware of the ELI18 (Explain Like I'm 18) simplification mode
 */
function buildSystemPrompt(eli18Mode: boolean): string {
  return [
    "You are ElectionPath AI, a civic education assistant focused exclusively on",
    "explaining election processes, procedures, and democratic participation in India.",
    "Keep all responses factual, politically neutral, and educational only.",
    "Do not express opinions on political parties, candidates, or policies.",
    "Do not discuss topics outside of the Indian electoral system and democracy.",
    eli18Mode
      ? "Use very simple language appropriate for first-time voters aged 18. Avoid jargon."
      : "Use clear, informative language suitable for any adult citizen.",
  ].join(" ");
}

/**
 * POST /api/chat
 *
 * Accepts a JSON body with a `message` string and optional `eli18Mode` boolean.
 * Uses the Google Gemini API (gemini-1.5-flash) if GEMINI_API_KEY is set,
 * with automatic fallback to a local civic knowledge base on failure.
 *
 * Security measures:
 *  - Input length is validated and capped at MAX_MESSAGE_LENGTH characters.
 *  - Gemini safety settings block harmful content at the BLOCK_MEDIUM_AND_ABOVE threshold.
 *  - The `X-Powered-By` header is suppressed via next.config.ts.
 */
export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    // Validate request body shape
    if (
      typeof body !== "object" ||
      body === null ||
      typeof (body as Record<string, unknown>).message !== "string" ||
      !(body as Record<string, unknown>).message
    ) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const { message, eli18Mode } = body as ChatRequestBody;

    // Sanitize: enforce message length limit
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    const safeEli18Mode = eli18Mode === true;
    const geminiApiKey = process.env.GEMINI_API_KEY;

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
          ],
        });

        const result = await model.generateContent(message);
        const geminiAnswer = result.response.text();

        if (geminiAnswer) {
          return NextResponse.json({ response: geminiAnswer });
        }
      } catch (geminiError) {
        // Log on the server side, but don't expose internals to client
        console.error("[ElectionPath] Gemini API error, falling back to knowledge base:", geminiError);
      }
    }
    // ── End Gemini integration ─────────────────────────────────────────

    // Fallback: local knowledge base search
    const answer = searchKnowledgeBase(message, safeEli18Mode);
    return NextResponse.json({ response: answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 }
    );
  }
}
