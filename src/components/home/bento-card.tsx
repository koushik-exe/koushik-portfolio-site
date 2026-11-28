import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BentoCardProps = {
  children: ReactNode;
  /** Grid span or layout classes only. Never a visual override. */
  className?: string;
  /** Semantic element for the card shell. Defaults to a plain div. */
  as?: "div" | "article";
};

/**
 * Home-only card primitive (DESIGN.md 25.2).
 *
 * Hairline border and `--card` fill only: no shadow, ring, gradient or
 * hard-coded colour. One level of nesting; never a card inside a card.
 */
export function BentoCard({
  children,
  className,
  as: Tag = "div",
}: BentoCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-card p-5 md:p-6 xl:p-7",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
