import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

import { guardMdx } from "./guard-mdx";
import { rehypeHeadingIds } from "./rehype-heading-ids";

/**
 * Admin save check: compile the MDX with the same guard, GFM and heading-id
 * plugins the public renderer uses. Syntax errors, imports, raw HTML, h1 and
 * unknown components all reject before the row is written.
 */
export async function validateMdx(source: string): Promise<void> {
  await compile(source, {
    remarkPlugins: [guardMdx, remarkGfm],
    rehypePlugins: [rehypeHeadingIds],
  });
}
