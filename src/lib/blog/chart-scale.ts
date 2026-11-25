/** Round a maximum up to a readable 1/2/2.5/5/10 step. */
export function niceMax(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 1;

  const exponent = Math.floor(Math.log10(value));
  const magnitude = 10 ** exponent;
  const normalized = value / magnitude;
  const step =
    normalized <= 1
      ? 1
      : normalized <= 2
        ? 2
        : normalized <= 2.5
          ? 2.5
          : normalized <= 5
            ? 5
            : 10;

  return step * magnitude;
}

/** `intervals + 1` evenly spaced ticks from 0 to max. */
export function axisTicks(max: number, intervals = 5): number[] {
  return Array.from({ length: intervals + 1 }, (_, index) => (max / intervals) * index);
}

/** Map a value to an SVG y coordinate where zero is at the bottom. */
export function scaleY(value: number, max: number, height: number): number {
  const ratio = max <= 0 ? 0 : Math.max(0, Math.min(1, value / max));
  return height - ratio * height;
}

export type Point = { x: number; y: number };

/** Polyline path for a series of values spread across `width`. */
export function linePath(values: number[], width: number, height: number, max: number): string {
  if (values.length === 0) return "";

  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = scaleY(value, max, height);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}
