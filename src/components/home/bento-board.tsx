import type { ReactNode } from "react";

type BentoBoardProps = {
  children: ReactNode;
};

/**
 * Home board grid (DESIGN.md 25.3): one column below 768px, two from 768px,
 * twelve from 1280px. The page composes the cards as children.
 */
export function BentoBoard({ children }: BentoBoardProps) {
  return (
    <section
      aria-labelledby="identity-heading"
      className="mx-auto w-full max-w-content px-5 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pt-32"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-6">
        {children}
      </div>
    </section>
  );
}
