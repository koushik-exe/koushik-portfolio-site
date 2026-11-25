import type { Element, Root, Text } from "hast";

import { createHeadingSlugger } from "./heading-id";

function textContent(node: Element | Root | Text): string {
  if (node.type === "text") return node.value;
  if (!("children" in node)) return "";
  return node.children.map((child) => textContent(child as Element | Text)).join("");
}

/**
 * Adds stable `id`s to h2-h4 so article sections can be linked. Existing ids
 * (for example the GFM footnote heading) are preserved.
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    const slug = createHeadingSlugger();

    const walk = (node: Root | Element) => {
      if (node.type === "element" && /^h[2-4]$/.test(node.tagName)) {
        const existing = node.properties?.id;
        if (existing === undefined || existing === null || existing === "") {
          node.properties = { ...node.properties, id: slug(textContent(node)) };
        }
      }

      if ("children" in node) {
        for (const child of node.children) {
          if (child.type === "element") {
            walk(child);
          }
        }
      }
    };

    walk(tree);
  };
}
