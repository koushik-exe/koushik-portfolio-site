import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { renderOgImage, toArrayBuffer } from "./og";

/**
 * Phase 10: the 1200x630 social card is served from stable route handlers
 * (`/opengraph-image`, `/twitter-image`) rather than the file convention.
 * Page-level metadata replaces the parent `openGraph` object, so a hashed
 * file-convention image would be dropped on nested pages. The font is read
 * once and both routes are prerendered at build time.
 */
const serif = readFile(
  join(process.cwd(), "src/assets/og/SourceSerif4-SemiBold.ttf"),
)
  .then(toArrayBuffer)
  .catch((error: unknown) => {
    console.warn("OG font unavailable; falling back to the default sans.", error);
    return undefined;
  });

export async function renderSocialImage() {
  const data = await serif;

  return renderOgImage(
    data
      ? {
          name: "Source Serif 4",
          data,
          weight: 600,
          style: "normal",
        }
      : undefined,
  );
}
