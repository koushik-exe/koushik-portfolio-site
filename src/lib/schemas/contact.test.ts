import { describe, expect, it } from "vitest";

import { contactSchema, isHoneypotFilled } from "./contact";

const valid = {
  name: "Koushik C",
  email: "koushik@example.com",
  message: "Hello, I would like to get in touch.",
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Koushik C");
      expect(result.data.email).toBe("koushik@example.com");
    }
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...valid, message: "Short." });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 2000 characters", () => {
    const result = contactSchema.safeParse({ ...valid, message: "x".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects newline characters in name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "Koushik\nC" });
    expect(result.success).toBe(false);
  });

  it("rejects newline characters in email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "a@b.co\n" });
    expect(result.success).toBe(false);
  });

  it("rejects newline characters in subject", () => {
    const result = contactSchema.safeParse({ ...valid, subject: "Hi\nthere" });
    expect(result.success).toBe(false);
  });

  it("allows line breaks in message", () => {
    const result = contactSchema.safeParse({
      ...valid,
      message: "First line.\nSecond line.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts an empty subject", () => {
    const result = contactSchema.safeParse({ ...valid, subject: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a filled honeypot", () => {
    const result = contactSchema.safeParse({ ...valid, honeypot: "bot" });
    expect(result.success).toBe(false);
  });

  it("accepts an empty honeypot", () => {
    const result = contactSchema.safeParse({ ...valid, honeypot: "" });
    expect(result.success).toBe(true);
  });
});

describe("isHoneypotFilled", () => {
  it("is true for a filled honeypot and false for empty or missing", () => {
    expect(isHoneypotFilled("bot")).toBe(true);
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
  });
});
