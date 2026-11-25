"use client";

import { animate } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { chartDuration, chartEase } from "@/lib/motion";

type DrawDirection = "up" | "right";

const hiddenClip: Record<DrawDirection, string> = {
  up: "inset(100% 0 0 0)",
  right: "inset(0 100% 0 0)",
};

const visibleClip = "inset(0 0 0 0)";

/**
 * DESIGN 13.2: draw the bars up and the lines across once, over 400ms. The
 * clip is applied only after mount and only when the chart starts below the
 * fold, so the server HTML, no-JS readers and reduced-motion readers always
 * see the complete chart. Clipping cannot move layout.
 */
function useDrawIn<T extends HTMLElement | SVGGElement>(
  direction: DrawDirection,
  enabled: boolean
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const from = hiddenClip[direction];
    element.style.clipPath = from;
    element.style.willChange = "clip-path";
    let controls: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        controls = animate(
          element,
          { clipPath: [from, visibleClip] },
          {
            duration: chartDuration,
            ease: chartEase,
            onComplete: () => {
              element.style.clipPath = "";
              element.style.willChange = "";
            },
          }
        );
      },
      { threshold: 0.01 }
    );

    observer.observe(element);

    const onReducedMotionChange = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      controls?.stop();
      element.style.clipPath = "";
      element.style.willChange = "";
    };

    reducedMotion.addEventListener("change", onReducedMotionChange);

    return () => {
      observer.disconnect();
      controls?.stop();
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      element.style.clipPath = "";
      element.style.willChange = "";
    };
  }, [direction, enabled]);

  return ref;
}

export function BarDrawIn({
  children,
  className,
  enabled = true,
}: {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const ref = useDrawIn<HTMLDivElement>("up", enabled);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function LineDrawIn({
  children,
  className,
  enabled = true,
}: {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const ref = useDrawIn<SVGGElement>("right", enabled);
  return (
    <g ref={ref} className={className}>
      {children}
    </g>
  );
}
