import { NextRequest, NextResponse } from "next/server";
import { knowledgeBase } from "@/data/knowledgeBase";

// ─────────────────────────────────────────────
// Gemini API integration placeholder
// To enable: set GEMINI_API_KEY in .env.local
// and uncomment the Gemini block below.
// ─────────────────────────────────────────────

function searchKnowledgeBase(query: string, eli18Mode: boolean): string {
  const normalizedQuery = query.toLowerCase().trim();

  // Score each entry by keyword match count
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((acc, kw) => {
      return acc + (normalizedQuery.includes(kw.toLowerCase()) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return eli18Mode ? bestMatch.eli18Answer : bestMatch.answer;
  }

  // Fallback generic response
  return eli18Mode
    ? "That's a great question! I don't have a specific answer for that yet. Try asking about voter registration, EVMs, voting day, vote counting, or the Model Code of Conduct. You can also explore the Election Journey page for a complete overview."
    : "I don't have a specific answer for that in my knowledge base right now. You can ask me about voter registration, EVMs, voting day procedures, vote counting, the Model Code of Conduct, or government formation. For comprehensive information, visit the Election Commission of India website at eci.gov.in.";
}

export async function POST(req: NextRequest) {
  try {
    const { message, eli18Mode } = await req.json() as { message: string; eli18Mode: boolean };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // ── Gemini API integration (uncomment when GEMINI_API_KEY is set) ──
    // const geminiApiKey = process.env.GEMINI_API_KEY;
    // if (geminiApiKey) {
    //   const systemPrompt = `You are ElectionPath AI, a civic education assistant focused exclusively
    //     on explaining election processes, procedures, and democratic participation.
    //     Keep responses factual, politically neutral, and educational only.
    //     Do not express opinions on political parties, candidates, or policies.
    //     ${eli18Mode ? "Use simple language suitable for first-time voters aged 18." : ""}
    //     Base your answers on the Indian electoral system.`;
    //
    //   const response = await fetch(
    //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         contents: [{ parts: [{ text: `${systemPrompt}\n\nUser question: ${message}` }] }],
    //       }),
    //     }
    //   );
    //   const data = await response.json();
    //   const geminiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    //   if (geminiAnswer) {
    //     return NextResponse.json({ response: geminiAnswer });
    //   }
    // }
    // ── End Gemini integration ──

    // Use mock knowledge base fallback
    const answer = searchKnowledgeBase(message, eli18Mode || false);
    return NextResponse.json({ response: answer });
  } catch {
    return NextResponse.json(
      { error: "Failed to process your question. Please try again." },
      { status: 500 }
    );
  }
}
