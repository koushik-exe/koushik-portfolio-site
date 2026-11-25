import { highlightCode, type TokenType } from "@/lib/blog/highlight";

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Bash",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  py: "Python",
  python: "Python",
  sh: "Shell",
  sql: "SQL",
  text: "Text",
  ts: "TypeScript",
  tsx: "TSX",
};

const TOKEN_CLASSES: Record<TokenType, string> = {
  comment: "text-muted-foreground",
  keyword: "text-link",
  plain: "text-foreground",
  string: "text-chart-3",
};

function languageLabel(language?: string): string | null {
  if (!language) return null;
  return LANGUAGE_LABELS[language.toLowerCase()] ?? language.toUpperCase();
}

/**
 * DESIGN 13.4: mono 14px (13px mobile), 1.6 line height, muted fill, 1px border,
 * 6px radius, 16px padding, horizontal scroll, language label top right.
 * No copy button in Phase 8.
 */
export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const label = languageLabel(language);
  const tokens = highlightCode(code, language);

  return (
    <div className="my-8 overflow-hidden rounded-md border border-border bg-muted">
      {label ? (
        <div className="flex justify-end border-b border-border px-4 py-2">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
            {label}
          </span>
        </div>
      ) : null}
      <div
        tabIndex={0}
        role="region"
        aria-label={label ? `${label} code` : "Code"}
        className="overflow-x-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <pre className="p-4 font-mono text-[0.8125rem] leading-[1.6] whitespace-pre text-foreground sm:text-sm">
          <code>
            {tokens.map((token, index) => (
              <span key={index} className={TOKEN_CLASSES[token.type]}>
                {token.value}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
