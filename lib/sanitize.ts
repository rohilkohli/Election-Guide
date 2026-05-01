/**
 * Sanitizes user-supplied chat messages to prevent prompt injection and
 * other abuse.  Keeps the string safe for inclusion in LLM prompts while
 * preserving normal punctuation and language characters.
 */

/** Maximum allowed message length (characters). */
export const MAX_MESSAGE_LENGTH = 600;

/**
 * Strip characters that have no legitimate place in a civic-education
 * question: ASCII control codes (except horizontal tab and newline),
 * and common zero-width / invisible Unicode codepoints.
 */
const CONTROL_CHAR_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF]/g;

/**
 * Normalise newlines to spaces first, then collapse runs of whitespace
 * (including the now-converted newlines) to a single space so a multi-line
 * "jailbreak" prompt collapses into a single line before it reaches the LLM.
 */
const NEWLINE_RE = /[\r\n]+/g;
const MULTI_WHITESPACE_RE = /[ \t]{2,}/g;

export function sanitizeMessage(raw: string): string {
  return raw
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(CONTROL_CHAR_RE, "")
    .replace(NEWLINE_RE, " ")
    .replace(MULTI_WHITESPACE_RE, " ")
    .trim();
}
