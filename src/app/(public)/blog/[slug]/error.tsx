"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      aria-labelledby="post-error-heading"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Blog
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="post-error-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              This post could not be loaded
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              The post may have moved, or its content could not be rendered.
              Try again, or return to the blog index.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={reset}>Try again</Button>
              <Button asChild variant="outline">
                <Link href="/blog">Back to blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
