import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchKnowledgeBase } from "@/lib/searchKnowledgeBase";

export async function POST(req: NextRequest) {
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

    const { message, eli18Mode } = body as { message: string; eli18Mode?: unknown };
    const safeEli18Mode = eli18Mode === true;

    // ── Gemini API integration ──
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        // Using the highly efficient gemini-1.5-flash model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `You are ElectionPath AI, a civic education assistant focused exclusively
          on explaining election processes, procedures, and democratic participation.
          Keep responses factual, politically neutral, and educational only.
          Do not express opinions on political parties, candidates, or policies.
          ${safeEli18Mode ? "Use simple language suitable for first-time voters aged 18." : ""}
          Base your answers on the Indian electoral system.`;

        const result = await model.generateContent(`${systemPrompt}\n\nUser question: ${message}`);
        const geminiAnswer = result.response.text();
        
        if (geminiAnswer) {
          return NextResponse.json({ response: geminiAnswer });
        }
      } catch (geminiError) {
        console.error("Gemini API Error:", geminiError);
        // Fallback to Knowledge Base if API fails
      }
    }
    // ── End Gemini integration ──

    // Use mock knowledge base fallback
    const answer = searchKnowledgeBase(message, safeEli18Mode);
    return NextResponse.json({ response: answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 }
    );
  }
}
