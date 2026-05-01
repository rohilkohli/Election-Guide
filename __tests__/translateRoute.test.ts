import { SUPPORTED_LANGUAGES } from "../lib/constants";

/**
 * Unit tests for the translate API route — validation logic and constants.
 *
 * Full HTTP integration tests for the route handlers are beyond the scope of
 * unit tests (they require a Next.js runtime). These tests cover the exported
 * constants and the business logic that can be tested in isolation.
 */
describe("translate route — SUPPORTED_LANGUAGES", () => {
  it("exports a non-empty array of supported languages", () => {
    expect(Array.isArray(SUPPORTED_LANGUAGES)).toBe(true);
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
  });

  it("includes at least 8 Indian languages", () => {
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThanOrEqual(8);
  });

  it("each language entry has a non-empty code and name", () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(typeof lang.code).toBe("string");
      expect(lang.code.trim().length).toBeGreaterThan(0);
      expect(typeof lang.name).toBe("string");
      expect(lang.name.trim().length).toBeGreaterThan(0);
    }
  });

  it("language codes are lowercase BCP-47 strings (2–3 chars)", () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.code).toMatch(/^[a-z]{2,3}$/);
    }
  });

  it("has no duplicate language codes", () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it("has no duplicate language names", () => {
    const names = SUPPORTED_LANGUAGES.map((l) => l.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("includes Hindi (hi) — the most widely spoken Indian language", () => {
    const hasHindi = SUPPORTED_LANGUAGES.some((l) => l.code === "hi");
    expect(hasHindi).toBe(true);
  });

  it("includes Tamil (ta)", () => {
    expect(SUPPORTED_LANGUAGES.some((l) => l.code === "ta")).toBe(true);
  });

  it("includes Bengali (bn)", () => {
    expect(SUPPORTED_LANGUAGES.some((l) => l.code === "bn")).toBe(true);
  });

  it("includes Telugu (te)", () => {
    expect(SUPPORTED_LANGUAGES.some((l) => l.code === "te")).toBe(true);
  });
});
