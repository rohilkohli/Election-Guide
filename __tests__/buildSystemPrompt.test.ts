import { buildSystemPrompt } from "../lib/systemPrompt";

/**
 * Unit tests for the buildSystemPrompt helper.
 *
 * These tests verify that the Gemini system instruction contains the critical
 * constraints required for safe, neutral, educational responses — specifically:
 *  - Political neutrality enforcement
 *  - Scope restriction to Indian elections
 *  - ELI18 simplification in the correct mode
 *  - No ELI18 simplification when mode is off
 */
describe("buildSystemPrompt", () => {
  describe("common constraints (both modes)", () => {
    it("returns a non-empty string in standard mode", () => {
      const prompt = buildSystemPrompt(false);
      expect(typeof prompt).toBe("string");
      expect(prompt.trim().length).toBeGreaterThan(0);
    });

    it("returns a non-empty string in ELI18 mode", () => {
      const prompt = buildSystemPrompt(true);
      expect(typeof prompt).toBe("string");
      expect(prompt.trim().length).toBeGreaterThan(0);
    });

    it("includes the assistant identity 'ElectionPath AI'", () => {
      expect(buildSystemPrompt(false)).toContain("ElectionPath AI");
      expect(buildSystemPrompt(true)).toContain("ElectionPath AI");
    });

    it("enforces political neutrality in both modes", () => {
      expect(buildSystemPrompt(false).toLowerCase()).toContain("neutral");
      expect(buildSystemPrompt(true).toLowerCase()).toContain("neutral");
    });

    it("restricts scope to Indian elections in both modes", () => {
      const standardPrompt = buildSystemPrompt(false).toLowerCase();
      const eli18Prompt = buildSystemPrompt(true).toLowerCase();
      expect(standardPrompt).toContain("india");
      expect(eli18Prompt).toContain("india");
    });

    it("prohibits opinions on political parties in both modes", () => {
      const standardPrompt = buildSystemPrompt(false).toLowerCase();
      const eli18Prompt = buildSystemPrompt(true).toLowerCase();
      expect(standardPrompt).toContain("parties");
      expect(eli18Prompt).toContain("parties");
    });

    it("is focused on education in both modes", () => {
      expect(buildSystemPrompt(false).toLowerCase()).toContain("educat");
      expect(buildSystemPrompt(true).toLowerCase()).toContain("educat");
    });
  });

  describe("ELI18 mode = false (standard)", () => {
    const prompt = buildSystemPrompt(false);

    it("does NOT include ELI18 simplification instruction", () => {
      expect(prompt.toLowerCase()).not.toContain("first-time voters aged 18");
      expect(prompt.toLowerCase()).not.toContain("avoid jargon");
    });

    it("includes language guidance appropriate for adults", () => {
      expect(prompt.toLowerCase()).toContain("adult");
    });
  });

  describe("ELI18 mode = true (simplified)", () => {
    const prompt = buildSystemPrompt(true);

    it("includes instruction to simplify language for first-time voters", () => {
      expect(prompt.toLowerCase()).toContain("first-time voters");
    });

    it("instructs the model to avoid jargon", () => {
      expect(prompt.toLowerCase()).toContain("jargon");
    });

    it("does NOT include adult-audience language guidance", () => {
      expect(prompt.toLowerCase()).not.toContain("adult");
    });
  });

  describe("prompt stability", () => {
    it("returns the same string for the same mode on repeated calls", () => {
      expect(buildSystemPrompt(false)).toBe(buildSystemPrompt(false));
      expect(buildSystemPrompt(true)).toBe(buildSystemPrompt(true));
    });

    it("returns different strings for different modes", () => {
      expect(buildSystemPrompt(false)).not.toBe(buildSystemPrompt(true));
    });
  });
});
