"use client";

import { useEffect, useRef, type ReactNode } from "react";

import {
  maxConcurrentReveals,
  revealDistance,
  revealDuration,
  revealStagger,
} from "@/lib/motion";

type SelectedWorkMotionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * GSAP ScrollTrigger is used only here: the two Selected work rows enter
 * independently as the visitor scrolls, which ScrollTrigger handles without
 * a second observer per row. The import stays dynamic so no other page pays
 * for it. `matchMedia` is the reduced-motion path; without it, and before
 * JavaScript runs, the rows are ordinary visible list items.
 */
export function SelectedWorkMotion({
  children,
  className,
}: SelectedWorkMotionProps) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (cancelled) return;
        const rows = Array.from(list.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement
        );
        const belowFold = rows
          .slice(0, maxConcurrentReveals * 2)
          .filter((row) => row.getBoundingClientRect().top >= window.innerHeight);

        if (belowFold.length === 0) return;

        gsap.set(belowFold, {
          opacity: 0,
          y: revealDistance,
          willChange: "opacity, transform",
        });

        belowFold.forEach((row, index) => {
          gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: revealDuration,
            delay: Math.min(index, 5) * revealStagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
            onComplete: () => {
              gsap.set(row, { clearProps: "opacity,transform,willChange" });
            },
          });
        });

        return () => {
          gsap.set(rows, { clearProps: "opacity,transform,willChange" });
        };
      });

      revert = () => media.revert();
      if (cancelled) return;
      ScrollTrigger.refresh();
    };

    void setup();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <ol ref={listRef} className={className}>
      {children}
    </ol>
  );
}
