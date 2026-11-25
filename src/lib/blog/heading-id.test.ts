import { describe, expect, it } from "vitest";

import { createHeadingSlugger, slugifyHeading } from "./heading-id";

describe("slugifyHeading", () => {
  it("lowercases words and joins them with hyphens", () => {
    expect(slugifyHeading("Why I use SQL")).toBe("why-i-use-sql");
  });

  it("drops punctuation and folds accents", () => {
    expect(slugifyHeading("Caf\u00e9 r\u00e9sum\u00e9, 2026!")).toBe("cafe-resume-2026");
  });

  it("collapses repeated spaces and hyphens", () => {
    expect(slugifyHeading("  A   --  B  ")).toBe("a-b");
  });

  it("falls back to section for an empty heading", () => {
    expect(slugifyHeading("???")).toBe("section");
  });
});

describe("createHeadingSlugger", () => {
  it("suffixes duplicate headings in order", () => {
    const slug = createHeadingSlugger();
    expect(slug("Summary")).toBe("summary");
    expect(slug("Summary")).toBe("summary-1");
    expect(slug("Summary")).toBe("summary-2");
    expect(slug("Other")).toBe("other");
  });
});
