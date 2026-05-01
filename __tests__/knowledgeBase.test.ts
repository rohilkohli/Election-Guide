import { searchKnowledgeBase } from "../lib/searchKnowledgeBase";

// Mock the knowledgeBase data to ensure predictable, isolated tests
jest.mock("../data/knowledgeBase", () => ({
  knowledgeBase: [
    {
      id: "evm",
      question: "What is an EVM?",
      keywords: ["evm", "electronic voting machine", "machine", "voting machine"],
      answer: "An EVM is an Electronic Voting Machine used for casting votes in India.",
      eli18Answer: "An EVM is the machine where you press a button to vote.",
    },
    {
      id: "registration",
      question: "How do I register to vote?",
      keywords: ["register", "registration", "voter list", "sign up", "enroll"],
      answer: "To register, visit voters.eci.gov.in and fill out Form 6.",
      eli18Answer: "Go to voters.eci.gov.in and fill out a simple form to get your Voter ID.",
    },
    {
      id: "nota",
      question: "What is NOTA?",
      keywords: ["nota", "none of the above", "reject"],
      answer: "NOTA (None Of The Above) is a ballot option to reject all candidates.",
      eli18Answer: "NOTA means you don't like any candidate — press it to still make your voice heard.",
    },
  ],
}));

describe("searchKnowledgeBase — keyword matching", () => {
  it("returns standard answer when a keyword exactly matches (eli18Mode: false)", () => {
    const result = searchKnowledgeBase("Tell me about the EVM", false);
    expect(result).toBe("An EVM is an Electronic Voting Machine used for casting votes in India.");
  });

  it("returns ELI18 answer when a keyword exactly matches (eli18Mode: true)", () => {
    const result = searchKnowledgeBase("Tell me about the EVM", true);
    expect(result).toBe("An EVM is the machine where you press a button to vote.");
  });

  it("returns standard answer when a multi-word keyword phrase matches", () => {
    const result = searchKnowledgeBase("explain electronic voting machine", false);
    expect(result).toBe("An EVM is an Electronic Voting Machine used for casting votes in India.");
  });

  it("matches keywords case-insensitively", () => {
    const result = searchKnowledgeBase("What is EVM?", false);
    expect(result).toBe("An EVM is an Electronic Voting Machine used for casting votes in India.");
  });

  it("matches keywords when query has extra whitespace around it", () => {
    const result = searchKnowledgeBase("  register  to vote  ", false);
    expect(result).toBe("To register, visit voters.eci.gov.in and fill out Form 6.");
  });

  it("returns the entry with the highest keyword score when multiple entries partially match", () => {
    // "register" matches registration entry (score 1); "evm" matches EVM entry (score 1)
    // but "registration evm" — both score 1, first match wins; test that a clear winner is returned
    const result = searchKnowledgeBase("how do I register and use the evm voting machine", false);
    // "evm" + "voting machine" + "machine" all match EVM entry → score 3
    // "register" matches registration entry → score 1
    // EVM entry wins
    expect(result).toBe("An EVM is an Electronic Voting Machine used for casting votes in India.");
  });

  it("returns NOTA entry when query contains 'nota'", () => {
    const result = searchKnowledgeBase("What is NOTA?", false);
    expect(result).toBe("NOTA (None Of The Above) is a ballot option to reject all candidates.");
  });

  it("returns NOTA ELI18 answer when query contains 'none of the above' and eli18Mode is true", () => {
    const result = searchKnowledgeBase("tell me about none of the above", true);
    expect(result).toBe("NOTA means you don't like any candidate — press it to still make your voice heard.");
  });
});

describe("searchKnowledgeBase — fallback behaviour", () => {
  it("returns standard fallback when no keywords match (eli18Mode: false)", () => {
    const result = searchKnowledgeBase("Tell me about quantum physics", false);
    expect(result).toContain("I don't have a specific answer for that in my knowledge base right now.");
  });

  it("returns ELI18 fallback when no keywords match (eli18Mode: true)", () => {
    const result = searchKnowledgeBase("Tell me about quantum physics", true);
    expect(result).toContain("That's a great question! I don't have a specific answer for that yet.");
  });

  it("returns standard fallback for an empty-string query", () => {
    const result = searchKnowledgeBase("", false);
    expect(result).toContain("I don't have a specific answer for that in my knowledge base right now.");
  });

  it("returns ELI18 fallback for a whitespace-only query", () => {
    const result = searchKnowledgeBase("   ", true);
    expect(result).toContain("That's a great question! I don't have a specific answer for that yet.");
  });

  it("returns standard fallback when query is a number string", () => {
    const result = searchKnowledgeBase("12345", false);
    expect(result).toContain("I don't have a specific answer for that in my knowledge base right now.");
  });

  it("returns standard fallback for a very long unmatched query", () => {
    const longQuery = "a".repeat(500);
    const result = searchKnowledgeBase(longQuery, false);
    expect(result).toContain("I don't have a specific answer for that in my knowledge base right now.");
  });
});

describe("searchKnowledgeBase — return type guarantees", () => {
  it("always returns a string regardless of mode", () => {
    expect(typeof searchKnowledgeBase("evm", false)).toBe("string");
    expect(typeof searchKnowledgeBase("evm", true)).toBe("string");
    expect(typeof searchKnowledgeBase("unmatched", false)).toBe("string");
    expect(typeof searchKnowledgeBase("unmatched", true)).toBe("string");
  });

  it("never returns an empty string", () => {
    expect(searchKnowledgeBase("evm", false).length).toBeGreaterThan(0);
    expect(searchKnowledgeBase("unknown topic", false).length).toBeGreaterThan(0);
  });
});
