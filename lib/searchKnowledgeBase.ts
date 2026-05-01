import { knowledgeBase } from "@/data/knowledgeBase";
import type { KnowledgeEntry } from "@/types";

/** Fallback response shown when no keyword matches are found in standard mode. */
const STANDARD_FALLBACK =
  "I don't have a specific answer for that in my knowledge base right now. You can ask me about voter registration, EVMs, voting day procedures, vote counting, the Model Code of Conduct, or government formation. For comprehensive information, visit the Election Commission of India website at eci.gov.in.";

/** Fallback response shown when no keyword matches are found in ELI18 mode. */
const ELI18_FALLBACK =
  "That's a great question! I don't have a specific answer for that yet. Try asking about voter registration, EVMs, voting day, vote counting, or the Model Code of Conduct. You can also explore the Election Journey page for a complete overview.";

/**
 * Searches the civic knowledge base using a keyword-scoring algorithm.
 *
 * Each entry in the knowledge base is scored by the number of its keywords
 * that appear in the normalised query string. The entry with the highest
 * score is returned. If no entry scores above zero, a friendly fallback
 * message is returned instead.
 *
 * @param query - The raw user question string.
 * @param eli18Mode - When `true`, returns simplified language answers.
 * @returns The best-matching answer string, or a fallback message.
 */
export function searchKnowledgeBase(query: string, eli18Mode: boolean): string {
  const normalizedQuery = query.toLowerCase().trim();

  let bestMatch: KnowledgeEntry | null = null;
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

  return eli18Mode ? ELI18_FALLBACK : STANDARD_FALLBACK;
}
