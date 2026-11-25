export type TokenType = "plain" | "keyword" | "comment" | "string";

export type Token = { type: TokenType; value: string };

const SQL_KEYWORDS = new Set(
  [
    "add",
    "all",
    "alter",
    "and",
    "any",
    "as",
    "asc",
    "avg",
    "between",
    "by",
    "case",
    "cast",
    "coalesce",
    "count",
    "create",
    "cross",
    "current_date",
    "current_timestamp",
    "delete",
    "desc",
    "distinct",
    "drop",
    "else",
    "end",
    "except",
    "exists",
    "filter",
    "from",
    "full",
    "group",
    "having",
    "in",
    "inner",
    "insert",
    "intersect",
    "into",
    "is",
    "join",
    "left",
    "like",
    "limit",
    "max",
    "min",
    "not",
    "null",
    "nulls",
    "offset",
    "on",
    "or",
    "order",
    "outer",
    "over",
    "partition",
    "percent",
    "right",
    "round",
    "row_number",
    "select",
    "set",
    "sum",
    "table",
    "then",
    "top",
    "union",
    "update",
    "values",
    "view",
    "when",
    "where",
    "with",
  ].map((word) => word.toLowerCase()),
);

const PYTHON_KEYWORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
]);

function normalizeLanguage(language?: string): "sql" | "python" | null {
  const value = language?.trim().toLowerCase();
  if (!value) return null;
  if (value === "sql" || value === "postgres" || value === "postgresql") return "sql";
  if (value === "py" || value === "python" || value === "python3") return "python";
  return null;
}

function isIdentifierStart(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122) ||
    char === "_"
  );
}

function isIdentifierPart(char: string): boolean {
  const code = char.charCodeAt(0);
  return isIdentifierStart(char) || (code >= 48 && code <= 57);
}

function push(tokens: Token[], type: TokenType, value: string): void {
  if (!value) return;
  const last = tokens[tokens.length - 1];
  if (last?.type === type) {
    last.value += value;
  } else {
    tokens.push({ type, value });
  }
}

function scanQuoted(
  source: string,
  start: number,
  quote: string,
  allowBackslash: boolean,
  doubledQuote: boolean,
): number {
  let index = start + quote.length;
  while (index < source.length) {
    if (allowBackslash && source[index] === "\\") {
      index += 2;
      continue;
    }
    if (doubledQuote && source.startsWith(quote + quote, index)) {
      index += quote.length * 2;
      continue;
    }
    if (source.startsWith(quote, index)) {
      return index + quote.length;
    }
    index += 1;
  }
  return source.length;
}

/**
 * Small SQL/Python highlighter for the four token classes DESIGN 13.4 allows.
 * Unknown languages return one plain token, so code still renders correctly.
 */
export function highlightCode(code: string, language?: string): Token[] {
  const dialect = normalizeLanguage(language);
  if (!dialect || !code) {
    return code ? [{ type: "plain", value: code }] : [];
  }

  const tokens: Token[] = [];
  const keywords = dialect === "sql" ? SQL_KEYWORDS : PYTHON_KEYWORDS;
  let index = 0;

  while (index < code.length) {
    const char = code[index];

    if (dialect === "sql" && code.startsWith("--", index)) {
      const end = code.indexOf("\n", index);
      const stop = end === -1 ? code.length : end;
      push(tokens, "comment", code.slice(index, stop));
      index = stop;
      continue;
    }

    if (dialect === "sql" && code.startsWith("/*", index)) {
      const end = code.indexOf("*/", index + 2);
      const stop = end === -1 ? code.length : end + 2;
      push(tokens, "comment", code.slice(index, stop));
      index = stop;
      continue;
    }

    if (dialect === "python" && char === "#") {
      const end = code.indexOf("\n", index);
      const stop = end === -1 ? code.length : end;
      push(tokens, "comment", code.slice(index, stop));
      index = stop;
      continue;
    }

    if (dialect === "python" && (code.startsWith('"""', index) || code.startsWith("'''", index))) {
      const quote = code.slice(index, index + 3);
      const stop = scanQuoted(code, index, quote, true, false);
      push(tokens, "string", code.slice(index, stop));
      index = stop;
      continue;
    }

    if (char === "'" || (dialect === "python" && char === '"')) {
      const stop =
        dialect === "sql"
          ? scanQuoted(code, index, "'", false, true)
          : scanQuoted(code, index, char, true, false);
      push(tokens, "string", code.slice(index, stop));
      index = stop;
      continue;
    }

    if (isIdentifierStart(char)) {
      let end = index + 1;
      while (end < code.length && isIdentifierPart(code[end])) end += 1;
      const word = code.slice(index, end);
      const isKeyword =
        dialect === "sql" ? keywords.has(word.toLowerCase()) : keywords.has(word);
      push(tokens, isKeyword ? "keyword" : "plain", word);
      index = end;
      continue;
    }

    push(tokens, "plain", char);
    index += 1;
  }

  return tokens;
}
