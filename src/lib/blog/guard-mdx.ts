import type { Root } from "mdast";

export const MDX_COMPONENTS = ["DataTable", "BarChart", "LineChart"] as const;

const ALLOWED_COMPONENTS = new Set<string>(MDX_COMPONENTS);

type AnyNode = {
  type: string;
  name?: string | null;
  depth?: number;
  value?: string;
  children?: AnyNode[];
};

export class MdxAuthoringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MdxAuthoringError";
  }
}

function isCommentExpression(value?: string): boolean {
  return value !== undefined && /^\s*\/\*[\s\S]*\*\/\s*$/.test(value);
}

function visit(node: AnyNode): void {
  switch (node.type) {
    case "mdxjsEsm":
      throw new MdxAuthoringError("MDX cannot include imports or exports.");
    case "mdxFlowExpression":
    case "mdxTextExpression":
      if (!isCommentExpression(node.value)) {
        throw new MdxAuthoringError(
          "Do not use {...} expressions in the text. Put data in a supported component prop.",
        );
      }
      break;
    case "mdxJsxFlowElement":
    case "mdxJsxTextElement":
      if (!node.name || !ALLOWED_COMPONENTS.has(node.name)) {
        throw new MdxAuthoringError(
          "Only DataTable, BarChart and LineChart are allowed as custom components. Raw HTML is not allowed.",
        );
      }
      break;
    case "heading":
      if (node.depth === 1) {
        throw new MdxAuthoringError(
          "Do not start a post with a level-1 heading. The page title is already an h1; use ## or ###.",
        );
      }
      break;
    case "html":
      throw new MdxAuthoringError("Raw HTML is not allowed. Use Markdown instead.");
  }

  for (const child of node.children ?? []) {
    visit(child);
  }
}

/**
 * Authoring guard for the fixed MDX component set (DESIGN 16.3). It runs before
 * remark-gfm, so Markdown tables and footnotes are not mistaken for raw HTML.
 */
export function guardMdx() {
  return (tree: Root) => {
    visit(tree as unknown as AnyNode);
  };
}
