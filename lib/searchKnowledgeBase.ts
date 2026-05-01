import { knowledgeBase } from "@/data/knowledgeBase";

export function searchKnowledgeBase(query: string, eli18Mode: boolean): string {
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
