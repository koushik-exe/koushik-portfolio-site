import { describe, expect, it } from "vitest";

import { safeHref } from "./safe-href";

describe("safeHref", () => {
  it("allows root-relative and hash links", () => {
    expect(safeHref("/projects")).toBe("/projects");
    expect(safeHref("#summary")).toBe("#summary");
  });

  it("allows http and https links", () => {
    expect(safeHref("https://example.com")).toBe("https://example.com");
    expect(safeHref("http://example.com")).toBe("http://example.com");
  });

  it("rejects mailto, tel and other protocols", () => {
    expect(safeHref("mailto:someone@example.com")).toBeNull();
    expect(safeHref("tel:+10000000000")).toBeNull();
    expect(safeHref("javascript:alert(1)")).toBeNull();
  });

  it("rejects empty and missing values", () => {
    expect(safeHref()).toBeNull();
    expect(safeHref("   ")).toBeNull();
  });
});
