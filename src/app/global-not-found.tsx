import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import { inter, jetbrainsMono, sourceSerif } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page not found | Koushik C",
  description: "That page does not exist.",
};

/**
 * Unmatched URLs are served by this file because the app has multiple root
 * layouts: the public tree in `(public)` and the admin tree in `admin`.
 * It must render a complete HTML document and is excluded from indexing by
 * Next.js automatically (404 responses get `noindex`).
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <main
          id="main"
          className="flex min-h-dvh items-center justify-center"
        >
          <div className="mx-auto max-w-[62ch] px-5 text-center">
            <h1 className="font-heading text-5xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-6xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground">
              That page does not exist.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
              <Link
                href="/"
                className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase underline underline-offset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase underline underline-offset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Projects
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
