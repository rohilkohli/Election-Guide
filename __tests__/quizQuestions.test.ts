import { quizQuestions } from "../data/quizQuestions";

describe("quizQuestions data integrity", () => {
  it("should have exactly 10 questions", () => {
    expect(quizQuestions).toHaveLength(10);
  });

  it("each question should have a unique id", () => {
    const ids = quizQuestions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(quizQuestions.length);
  });

  it("each question should have exactly 4 options", () => {
    quizQuestions.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it("each correctIndex should be in range [0, 3]", () => {
    quizQuestions.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  });

  it("each question should have non-empty question text", () => {
    quizQuestions.forEach((q) => {
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  it("each question should have non-empty explanation and eli18Explanation", () => {
    quizQuestions.forEach((q) => {
      expect(q.explanation.trim().length).toBeGreaterThan(0);
      expect(q.eli18Explanation.trim().length).toBeGreaterThan(0);
    });
  });

  it("each option text should be non-empty", () => {
    quizQuestions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("categories should only be valid values", () => {
    const validCategories = new Set([
      "registration",
      "voting",
      "counting",
      "rules",
      "institutions",
    ]);
    quizQuestions.forEach((q) => {
      expect(validCategories.has(q.category)).toBe(true);
    });
  });
});
