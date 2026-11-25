import { describe, expect, it } from "vitest";

import { countProseWords, readingTimeLabel, readingTimeMinutes } from "./reading-time";

describe("reading time", () => {
  it("never returns less than one minute", () => {
    expect(readingTimeMinutes("")).toBe(1);
    expect(readingTimeLabel("")).toBe("1 min read");
  });

  it("rounds up at the 200-word boundary", () => {
    expect(readingTimeMinutes("word ".repeat(200))).toBe(1);
    expect(readingTimeMinutes("word ".repeat(201))).toBe(2);
  });

  it("ignores fenced code, JSX props and URLs", () => {
    const source = [
      "# Heading",
      "",
      "A short paragraph with a [link](https://example.com/a/b).",
      "",
      "```sql",
      "select * from orders where total > 100",
      "```",
      "",
      '<BarChart title="Orders" data={[{ label: "Mon", value: 12 }]} />',
    ].join("\n");

    expect(countProseWords(source)).toBe(7);
  });

  it("counts plain Markdown words", () => {
    expect(countProseWords("one two **three** four")).toBe(4);
  });
});
