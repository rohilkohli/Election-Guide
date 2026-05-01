/**
 * Input validation utilities for the ElectionPath chat API.
 *
 * Centralising validation logic in this module allows it to be independently
 * unit-tested, reused across multiple API routes, and updated without touching
 * route handlers.
 */

/** Maximum permitted character length for a user message. */
export const MAX_MESSAGE_LENGTH = 500;

/** Minimum non-whitespace characters required in a message. */
export const MIN_MESSAGE_LENGTH = 1;

/**
 * Result returned by {@link validateMessage}.
 * Discriminated union — check `valid` before accessing `error`.
 */
export type ValidationResult =
  | { valid: true; sanitized: string }
  | { valid: false; error: string; status: 400 };

/**
 * Validates and sanitises an incoming chat message string.
 *
 * Checks performed (in order):
 * 1. Value must be a non-null string.
 * 2. After trimming, must contain at least {@link MIN_MESSAGE_LENGTH} character.
 * 3. Length must not exceed {@link MAX_MESSAGE_LENGTH} characters.
 *
 * The returned `sanitized` value is the original string with leading/trailing
 * whitespace removed — no further escaping is required because the message is
 * sent to Gemini (which handles it safely) or matched against a local keyword
 * index (no HTML rendering occurs server-side).
 *
 * @param raw - The raw value received from the request body.
 * @returns A {@link ValidationResult} discriminated union.
 *
 * @example
 * const result = validateMessage(req.body.message);
 * if (!result.valid) {
 *   return NextResponse.json({ error: result.error }, { status: result.status });
 * }
 * // result.sanitized is now safe to use
 */
export function validateMessage(raw: unknown): ValidationResult {
  if (typeof raw !== "string") {
    return {
      valid: false,
      error: "Invalid message: must be a non-empty string.",
      status: 400,
    };
  }

  const sanitized = raw.trim();

  if (sanitized.length < MIN_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: "Invalid message: message cannot be empty.",
      status: 400,
    };
  }

  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
      status: 400,
    };
  }

  return { valid: true, sanitized };
}
