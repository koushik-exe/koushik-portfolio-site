"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * Phase 10: keep `theme-color` in step with the applied theme.
 *
 * The `viewport` export renders the media-scoped meta tags for no-JS users.
 * Once JS runs, this helper reads the resolved `--background` token and writes
 * it to the existing theme-color tags so a manual theme change is reflected
 * immediately.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const background =
      getComputedStyle(root).getPropertyValue("--background").trim() ||
      getComputedStyle(document.body).backgroundColor;

    if (!background) return;

    const metas = document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

    for (const meta of metas) {
      meta.setAttribute("content", background);
    }
  }, [resolvedTheme]);

  return null;
}
