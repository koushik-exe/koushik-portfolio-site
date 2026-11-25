import { describe, expect, it } from "vitest";

import { highlightCode, type Token } from "./highlight";

function tokenTypes(tokens: Token[]): string[] {
  return tokens.map((token) => `${token.type}:${token.value}`);
}

describe("highlightCode", () => {
  it("returns plain text for an unknown language", () => {
    expect(highlightCode("select 1", "rust")).toEqual([
      { type: "plain", value: "select 1" },
    ]);
  });

  it("highlights SQL keywords, comments and strings", () => {
    const source = "SELECT id FROM users -- note\nWHERE name = 'O''Brien'";
    expect(tokenTypes(highlightCode(source, "sql"))).toEqual([
      "keyword:SELECT",
      "plain: id ",
      "keyword:FROM",
      "plain: users ",
      "comment:-- note",
      "plain:\n",
      "keyword:WHERE",
      "plain: name = ",
      "string:'O''Brien'",
    ]);
  });

  it("prefers string and comment boundaries over keywords", () => {
    const tokens = highlightCode("SELECT 'select -- not a comment' /* from */", "sql");
    expect(tokenTypes(tokens)).toEqual([
      "keyword:SELECT",
      "plain: ",
      "string:'select -- not a comment'",
      "plain: ",
      "comment:/* from */",
    ]);
  });

  it("highlights Python keywords, comments and triple-quoted strings", () => {
    const source = 'def greet(name):\n    # say hi\n    return """Hello, name"""';
    expect(tokenTypes(highlightCode(source, "python"))).toEqual([
      "keyword:def",
      "plain: greet(name):\n    ",
      "comment:# say hi",
      "plain:\n    ",
      "keyword:return",
      "plain: ",
      'string:"""Hello, name"""',
    ]);
  });

  it("handles Python f-strings and escaped quotes", () => {
    const tokens = highlightCode('return f"Hello \\"you\\""', "python");
    expect(tokens).toEqual([
      { type: "keyword", value: "return" },
      { type: "plain", value: " f" },
      { type: "string", value: '"Hello \\"you\\""' },
    ]);
  });

  it("keeps SQL keywords case-insensitive but Python keywords case-sensitive", () => {
    expect(highlightCode("select", "sql")[0]).toEqual({ type: "keyword", value: "select" });
    expect(highlightCode("SELECT", "python")).toEqual([{ type: "plain", value: "SELECT" }]);
  });

  it("handles an unterminated string without losing text", () => {
    expect(highlightCode("select 'oops", "sql")).toEqual([
      { type: "keyword", value: "select" },
      { type: "plain", value: " " },
      { type: "string", value: "'oops" },
    ]);
  });
});
