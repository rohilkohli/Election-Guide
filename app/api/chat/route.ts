import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchKnowledgeBase } from "@/lib/searchKnowledgeBase";
import { sanitizeMessage, MAX_MESSAGE_LENGTH } from "@/lib/sanitize";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
  // ── Rate limiting ──
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before asking again." },
      { status: 429 }
    );
  }

  try {
    const body: unknown = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      typeof (body as Record<string, unknown>).message !== "string" ||
      !(body as Record<string, unknown>).message
    ) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const rawMessage = (body as Record<string, unknown>).message as string;

    // Reject oversized payloads before sanitisation
    if (rawMessage.length > MAX_MESSAGE_LENGTH * 2) {
      return NextResponse.json(
        { error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const message = sanitizeMessage(rawMessage);

    if (!message) {
      return NextResponse.json({ error: "Message cannot be empty after sanitisation." }, { status: 400 });
    }

    const { eli18Mode } = body as { message: string; eli18Mode?: unknown };
    const safeEli18Mode = eli18Mode === true;

    // ── Gemini API integration ──
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // System instruction is kept strictly separate from user content to
        // reduce prompt-injection risk.
        const systemInstruction =
          "You are ElectionPath AI, a civic education assistant. " +
          "Your ONLY topic is the Indian election process — procedures, voter rights, " +
          "EVMs, the Election Commission, and democratic participation. " +
          "You MUST remain factual and politically neutral at all times. " +
          "Never express opinions on parties, candidates, or government policies. " +
          "If a question is unrelated to elections or civics, politely decline. " +
          (safeEli18Mode
            ? "Use clear, simple language suitable for first-time voters aged 18."
            : "Use accurate, formal language appropriate for an informed adult citizen.");

        const result = await model.generateContent({
          systemInstruction,
          contents: [{ role: "user", parts: [{ text: message }] }],
        });

        const geminiAnswer = result.response.text();

        if (geminiAnswer) {
          return NextResponse.json({ response: geminiAnswer });
        }
      } catch (geminiError) {
        console.error("Gemini API Error:", geminiError);
        // Fall through to knowledge-base fallback
      }
    }
    // ── End Gemini integration ──

    // Knowledge-base fallback (works without any API key)
    const answer = searchKnowledgeBase(message, safeEli18Mode);
    return NextResponse.json({ response: answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 }
    );
  }
}
