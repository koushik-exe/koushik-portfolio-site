"use client";

import { animate } from "motion/react";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  maxConcurrentReveals,
  revealDistance,
  revealDuration,
  revealEase,
  revealStagger,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

type RevealGroupProps = RevealProps & {
  as?: "div" | "ol" | "ul" | "dl";
};

type RevealControls = ReturnType<typeof animate>;

/**
 * Shared across every group on the page so the DESIGN 6.7 budget of three
 * simultaneous animations holds even when two groups enter together.
 */
const scheduledReveals: number[] = [];

function nextRevealSlot() {
  const now = performance.now() / 1000;
  for (let index = scheduledReveals.length - 1; index >= 0; index -= 1) {
    if (scheduledReveals[index] + revealDuration <= now) {
      scheduledReveals.splice(index, 1);
    }
  }

  let start = now;
  if (scheduledReveals.length > 0) {
    start = Math.max(start, Math.max(...scheduledReveals) + revealStagger);
  }
  if (scheduledReveals.length >= maxConcurrentReveals) {
    start = Math.max(start, Math.min(...scheduledReveals) + revealDuration);
  }

  scheduledReveals.push(start);
  return { start, now };
}

function clearRevealStyles(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
  element.style.willChange = "";
}

/**
 * Arms only elements that are fully below the viewport after mount, then
 * reveals each once when it scrolls in. Content already on screen, content
 * when reduced motion is set, and every element before JavaScript runs keeps
 * its server-rendered visible state. DESIGN 6.3, 6.5 and 6.7.
 */
function armReveals(elements: HTMLElement[]) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return () => {};

  const armed = new Set<HTMLElement>();
  for (const element of elements) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.style.opacity = "0";
    element.style.transform = `translateY(${revealDistance}px)`;
    element.style.willChange = "opacity, transform";
    armed.add(element);
  }

  if (armed.size === 0) return () => {};

  const controls = new Map<HTMLElement, RevealControls>();

  const finish = (element: HTMLElement) => {
    controls.delete(element);
    armed.delete(element);
    clearRevealStyles(element);
  };

  const reveal = (element: HTMLElement) => {
    if (!armed.has(element)) return;
    observer.unobserve(element);

    const { start, now } = nextRevealSlot();
    controls.set(
      element,
      animate(
        element,
        { opacity: [0, 1], y: [revealDistance, 0] },
        {
          duration: revealDuration,
          delay: start - now,
          ease: revealEase,
          onComplete: () => finish(element),
        }
      )
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
  );

  for (const element of armed) observer.observe(element);

  const onFocusIn = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    for (const element of armed) {
      if (element.contains(target)) reveal(element);
    }
  };

  const onReducedMotionChange = () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    for (const control of controls.values()) control.stop();
    controls.clear();
    for (const element of armed) clearRevealStyles(element);
    armed.clear();
  };

  document.addEventListener("focusin", onFocusIn);
  reducedMotion.addEventListener("change", onReducedMotionChange);

  return () => {
    observer.disconnect();
    document.removeEventListener("focusin", onFocusIn);
    reducedMotion.removeEventListener("change", onReducedMotionChange);
    for (const control of controls.values()) control.stop();
    controls.clear();
    for (const element of elements) clearRevealStyles(element);
  };
}

/** One block that reveals itself once, only when it starts below the fold. */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return armReveals([element]);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * A list or group whose direct children stagger in DOM order. Use it for
 * ruled rows so the container keeps its semantic tag.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: RevealGroupProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const items = Array.from(element.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement)
      .slice(0, maxConcurrentReveals * 2);
    return armReveals(items);
  }, [element]);

  return createElement(as, { ref: setElement, className }, children);
}
