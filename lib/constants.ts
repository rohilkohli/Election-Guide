/**
 * List of Indian languages supported by the translate endpoint.
 * Uses BCP-47 language tags as accepted by Google Cloud Translation API.
 */
export const SUPPORTED_LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));
export const MAX_TEXT_LENGTH = 1000;
