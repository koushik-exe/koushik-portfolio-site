/**
 * Shared motion values for the Motion and GSAP layers.
 * DESIGN 6.1 (entrance reveal), 6.5 (Phase 9 allowance) and 13.2 (chart draw-in).
 * Durations are in seconds because Motion's `animate` uses seconds.
 */
export const revealDistance = 12;
export const revealDuration = 0.3;
/** DESIGN 6.5 allows at most 60ms between siblings. */
export const revealStagger = 0.06;
/** DESIGN 6.7: no page runs more than three simultaneous animations. */
export const maxConcurrentReveals = 3;
export const revealEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const chartDuration = 0.4;
export const chartEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reading progress spring; skipped entirely under reduced motion. */
export const progressSpring = {
  stiffness: 140,
  damping: 26,
  mass: 0.4,
} as const;
