import { NextRequest, NextResponse } from "next/server";
import { logInfo, logWarn, logError } from "@/lib/logger";

import { SUPPORTED_CODES, SUPPORTED_LANGUAGES, LanguageCode, MAX_TEXT_LENGTH } from "@/lib/constants";

/**
 * POST /api/translate
 *
 * Translates civic education content into Indian regional languages using the
 * Google Cloud Translation API (v2 — Basic tier).
 *
 * Request body:
 * ```json
 * { "text": "string to translate", "targetLanguage": "hi" }
 * ```
 *
 * Response (success):
 * ```json
 * { "translatedText": "...", "targetLanguage": "hi", "sourceLanguage": "en" }
 * ```
 *
 * Response (error):
 * ```json
 * { "error": "...", "fallback": "<original text>" }
 * ```
 *
 * If `GOOGLE_TRANSLATE_API_KEY` is not configured the endpoint returns the
 * original text as a fallback so the UI degrades gracefully.
 *
 * Security:
 *  - Input text is capped at {@link MAX_TEXT_LENGTH} characters.
 *  - Only languages in {@link SUPPORTED_LANGUAGES} are accepted.
 *  - API key is never exposed to the client.
 */
export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { text, targetLanguage } = body as Record<string, unknown>;

    // Validate text
    if (typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "text must be a non-empty string" },
        { status: 400 }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `text must be ${MAX_TEXT_LENGTH} characters or fewer` },
        { status: 400 }
      );
    }

    // Validate target language
    if (typeof targetLanguage !== "string" || !SUPPORTED_CODES.has(targetLanguage as LanguageCode)) {
      return NextResponse.json(
        {
          error: `Unsupported language. Supported codes: ${[...SUPPORTED_CODES].join(", ")}`,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      // Graceful fallback: return original text when API key is not configured.
      logWarn("Translate: GOOGLE_TRANSLATE_API_KEY not set — returning original text");
      return NextResponse.json({
        translatedText: text,
        targetLanguage,
        sourceLanguage: "en",
        fallback: true,
      });
    }

    // ── Google Cloud Translation API v2 ─────────────────────────────────
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const translationRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text.trim(),
        target: targetLanguage,
        source: "en",
        format: "text",
      }),
    });

    if (!translationRes.ok) {
      const errBody = await translationRes.text();
      logError("Translate: Google Translation API error", {
        status: translationRes.status,
        body: errBody,
      });
      return NextResponse.json(
        { error: "Translation service unavailable. Please try again.", fallback: text },
        { status: 502 }
      );
    }

    const translationData = (await translationRes.json()) as {
      data?: { translations?: Array<{ translatedText: string; detectedSourceLanguage?: string }> };
    };

    const translated = translationData.data?.translations?.[0];
    if (!translated) {
      logError("Translate: unexpected API response shape", { body: translationData });
      return NextResponse.json(
        { error: "Unexpected translation response.", fallback: text },
        { status: 502 }
      );
    }

    logInfo("Translate: success", {
      targetLanguage,
      inputLength: text.length,
      outputLength: translated.translatedText.length,
    });

    return NextResponse.json({
      translatedText: translated.translatedText,
      targetLanguage,
      sourceLanguage: translated.detectedSourceLanguage ?? "en",
    });
    // ── End Google Cloud Translation ────────────────────────────────────
  } catch (err) {
    logError("Translate: unexpected server error", { error: String(err) });
    return NextResponse.json(
      { error: "Failed to process translation request. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/translate
 *
 * Returns the list of supported languages for the translate endpoint.
 * Used by the UI to populate the language selector dropdown.
 */
export async function GET() {
  return NextResponse.json({ languages: SUPPORTED_LANGUAGES });
}
