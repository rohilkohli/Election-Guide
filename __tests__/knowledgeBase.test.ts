import { searchKnowledgeBase } from "../lib/searchKnowledgeBase";

// Mock the knowledgeBase data to ensure predictable tests
jest.mock("../data/knowledgeBase", () => ({
  knowledgeBase: [
    {
      id: "evm",
      question: "What is an EVM?",
      keywords: ["evm", "electronic voting machine", "machine"],
      answer: "An EVM is an Electronic Voting Machine used for casting votes.",
      eli18Answer: "An EVM is the machine where you press a button to vote.",
    },
  ],
}));

describe("searchKnowledgeBase", () => {
  it("should return the standard answer when a keyword matches and eli18Mode is false", () => {
    const result = searchKnowledgeBase("Tell me about the EVM", false);
    expect(result).toBe("An EVM is an Electronic Voting Machine used for casting votes.");
  });

  it("should return the ELI18 answer when a keyword matches and eli18Mode is true", () => {
    const result = searchKnowledgeBase("Tell me about the EVM", true);
    expect(result).toBe("An EVM is the machine where you press a button to vote.");
  });

  it("should return standard fallback when no keywords match and eli18Mode is false", () => {
    const result = searchKnowledgeBase("Tell me about quantum physics", false);
    expect(result).toContain("I don't have a specific answer for that in my knowledge base right now.");
  });

  it("should return ELI18 fallback when no keywords match and eli18Mode is true", () => {
    const result = searchKnowledgeBase("Tell me about quantum physics", true);
    expect(result).toContain("That's a great question! I don't have a specific answer for that yet.");
  });
});
