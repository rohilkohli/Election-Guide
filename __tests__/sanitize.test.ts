import { sanitizeMessage, MAX_MESSAGE_LENGTH } from "../lib/sanitize";

describe("sanitizeMessage", () => {
  it("returns a clean string unchanged", () => {
    expect(sanitizeMessage("How do I register to vote?")).toBe(
      "How do I register to vote?"
    );
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeMessage("  What is an EVM?  ")).toBe("What is an EVM?");
  });

  it("collapses multiple spaces to a single space", () => {
    expect(sanitizeMessage("What   is   NOTA?")).toBe("What is NOTA?");
  });

  it("collapses newlines into spaces", () => {
    expect(sanitizeMessage("line one\nline two")).toBe("line one line two");
  });

  it("removes ASCII control characters", () => {
    // Insert a null byte and a bell character
    expect(sanitizeMessage("hello\x00world\x07")).toBe("helloworld");
  });

  it("removes zero-width characters", () => {
    expect(sanitizeMessage("hello\u200Bworld")).toBe("helloworld");
  });

  it("truncates strings longer than MAX_MESSAGE_LENGTH", () => {
    const long = "a".repeat(MAX_MESSAGE_LENGTH + 100);
    expect(sanitizeMessage(long).length).toBe(MAX_MESSAGE_LENGTH);
  });

  it("returns empty string for whitespace-only input", () => {
    expect(sanitizeMessage("   ")).toBe("");
  });

  it("preserves unicode letters (Hindi characters)", () => {
    expect(sanitizeMessage("मतदाता पंजीकरण")).toBe("मतदाता पंजीकरण");
  });
});
