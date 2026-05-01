import { knowledgeBase } from "../data/knowledgeBase";

/**
 * Data integrity tests for the civic knowledge base.
 *
 * These tests ensure every entry in the hand-curated knowledge base is
 * structurally sound — not testing search logic (covered in knowledgeBase.test.ts)
 * but ensuring the data layer is reliable for both the search algorithm and the UI.
 */
describe("knowledgeBase data integrity", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(knowledgeBase)).toBe(true);
    expect(knowledgeBase.length).toBeGreaterThan(0);
  });

  it("contains at least 10 entries to cover core civic topics", () => {
    expect(knowledgeBase.length).toBeGreaterThanOrEqual(10);
  });

  describe.each(knowledgeBase.map((entry, i) => ({ entry, i })))(
    "entry[$i] — $entry.question",
    ({ entry }) => {
      it("has a non-empty question string", () => {
        expect(typeof entry.question).toBe("string");
        expect(entry.question.trim().length).toBeGreaterThan(0);
      });

      it("has a keywords array with at least one keyword", () => {
        expect(Array.isArray(entry.keywords)).toBe(true);
        expect(entry.keywords.length).toBeGreaterThan(0);
      });

      it("has no empty or whitespace-only keywords", () => {
        for (const kw of entry.keywords) {
          expect(typeof kw).toBe("string");
          expect(kw.trim().length).toBeGreaterThan(0);
        }
      });

      it("has a non-empty standard answer", () => {
        expect(typeof entry.answer).toBe("string");
        expect(entry.answer.trim().length).toBeGreaterThan(0);
      });

      it("has a non-empty ELI18 answer", () => {
        expect(typeof entry.eli18Answer).toBe("string");
        expect(entry.eli18Answer.trim().length).toBeGreaterThan(0);
      });

      it("standard answer is at least 20 characters", () => {
        expect(entry.answer.trim().length).toBeGreaterThanOrEqual(20);
      });

      it("ELI18 answer is at least 20 characters", () => {
        expect(entry.eli18Answer.trim().length).toBeGreaterThanOrEqual(20);
      });

      it("all keywords are lowercase (ensures case-insensitive matching works correctly)", () => {
        for (const kw of entry.keywords) {
          expect(kw).toBe(kw.toLowerCase());
        }
      });
    }
  );

  it("has no duplicate questions", () => {
    const questions = knowledgeBase.map((e) => e.question.toLowerCase().trim());
    const uniqueQuestions = new Set(questions);
    expect(uniqueQuestions.size).toBe(questions.length);
  });

  it("covers voter registration topic", () => {
    const hasRegistration = knowledgeBase.some((e) =>
      e.keywords.some((kw) => kw.includes("register"))
    );
    expect(hasRegistration).toBe(true);
  });

  it("covers EVM topic", () => {
    const hasEvm = knowledgeBase.some((e) =>
      e.keywords.some((kw) => kw.includes("evm"))
    );
    expect(hasEvm).toBe(true);
  });

  it("covers NOTA topic", () => {
    const hasNota = knowledgeBase.some((e) =>
      e.keywords.some((kw) => kw.includes("nota"))
    );
    expect(hasNota).toBe(true);
  });

  it("covers election commission topic", () => {
    const hasEci = knowledgeBase.some((e) =>
      e.keywords.some((kw) => kw.includes("election commission") || kw === "eci")
    );
    expect(hasEci).toBe(true);
  });

  it("covers government formation topic", () => {
    const hasFormation = knowledgeBase.some((e) =>
      e.keywords.some((kw) => kw.includes("government") || kw.includes("prime minister"))
    );
    expect(hasFormation).toBe(true);
  });
});
