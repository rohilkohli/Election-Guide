import { validateMessage, MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH } from "../lib/validateMessage";

describe("validateMessage", () => {
  describe("valid inputs", () => {
    it("returns valid=true and the trimmed string for a normal message", () => {
      const result = validateMessage("How do I register to vote?");
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.sanitized).toBe("How do I register to vote?");
      }
    });

    it("trims leading and trailing whitespace from the message", () => {
      const result = validateMessage("  What is an EVM?  ");
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.sanitized).toBe("What is an EVM?");
      }
    });

    it("accepts a single character as valid", () => {
      const result = validateMessage("A");
      expect(result.valid).toBe(true);
    });

    it("accepts a message exactly at MAX_MESSAGE_LENGTH", () => {
      const msg = "a".repeat(MAX_MESSAGE_LENGTH);
      const result = validateMessage(msg);
      expect(result.valid).toBe(true);
    });

    it("accepts a message with special characters", () => {
      const result = validateMessage("What is NOTA? I'm a first-time voter!");
      expect(result.valid).toBe(true);
    });

    it("accepts a message with Unicode characters (Indian scripts)", () => {
      const result = validateMessage("मतदान कैसे करें?");
      expect(result.valid).toBe(true);
    });
  });

  describe("invalid inputs — wrong type", () => {
    it("returns valid=false for a number", () => {
      const result = validateMessage(42);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.status).toBe(400);
        expect(result.error).toBeTruthy();
      }
    });

    it("returns valid=false for null", () => {
      const result = validateMessage(null);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.status).toBe(400);
    });

    it("returns valid=false for undefined", () => {
      const result = validateMessage(undefined);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.status).toBe(400);
    });

    it("returns valid=false for an array", () => {
      const result = validateMessage(["hello"]);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.status).toBe(400);
    });

    it("returns valid=false for an object", () => {
      const result = validateMessage({ text: "hello" });
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.status).toBe(400);
    });

    it("returns valid=false for a boolean", () => {
      const result = validateMessage(true);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.status).toBe(400);
    });
  });

  describe("invalid inputs — empty / whitespace", () => {
    it("returns valid=false for an empty string", () => {
      const result = validateMessage("");
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.status).toBe(400);
        expect(result.error).toMatch(/empty/i);
      }
    });

    it("returns valid=false for a whitespace-only string", () => {
      const result = validateMessage("   ");
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.status).toBe(400);
      }
    });

    it("returns valid=false for a tab-only string", () => {
      const result = validateMessage("\t\t");
      expect(result.valid).toBe(false);
    });
  });

  describe("invalid inputs — too long", () => {
    it("returns valid=false for a message one character over MAX_MESSAGE_LENGTH", () => {
      const msg = "a".repeat(MAX_MESSAGE_LENGTH + 1);
      const result = validateMessage(msg);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.status).toBe(400);
        expect(result.error).toContain(String(MAX_MESSAGE_LENGTH));
      }
    });

    it("returns valid=false for a very long message (10000 chars)", () => {
      const msg = "x".repeat(10000);
      const result = validateMessage(msg);
      expect(result.valid).toBe(false);
    });
  });

  describe("exported constants", () => {
    it("MAX_MESSAGE_LENGTH is a positive integer", () => {
      expect(typeof MAX_MESSAGE_LENGTH).toBe("number");
      expect(MAX_MESSAGE_LENGTH).toBeGreaterThan(0);
      expect(Number.isInteger(MAX_MESSAGE_LENGTH)).toBe(true);
    });

    it("MIN_MESSAGE_LENGTH is 1", () => {
      expect(MIN_MESSAGE_LENGTH).toBe(1);
    });

    it("MAX_MESSAGE_LENGTH is greater than MIN_MESSAGE_LENGTH", () => {
      expect(MAX_MESSAGE_LENGTH).toBeGreaterThan(MIN_MESSAGE_LENGTH);
    });
  });
});
