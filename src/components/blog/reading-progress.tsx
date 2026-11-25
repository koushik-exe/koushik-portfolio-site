"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { progressSpring } from "@/lib/motion";

/**
 * DESIGN 6.5: a 2px reading progress bar on article pages, in `--link`.
 * Reduced motion removes the spring and lets the bar follow the scroll
 * position directly, so nothing eases or trails behind the pointer.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, progressSpring);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-link"
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
