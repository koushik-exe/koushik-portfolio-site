import { describe, expect, it } from "vitest";

import { axisTicks, linePath, niceMax, scaleY } from "./chart-scale";

describe("niceMax", () => {
  it("handles zero and negative values", () => {
    expect(niceMax(0)).toBe(1);
    expect(niceMax(-4)).toBe(1);
  });

  it("rounds up to a readable step", () => {
    expect(niceMax(1)).toBe(1);
    expect(niceMax(3)).toBe(5);
    expect(niceMax(12)).toBe(20);
    expect(niceMax(230)).toBe(250);
  });
});

describe("axisTicks", () => {
  it("returns evenly spaced ticks from zero", () => {
    expect(axisTicks(10)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(axisTicks(250)).toEqual([0, 50, 100, 150, 200, 250]);
  });
});

describe("scaleY", () => {
  it("puts zero at the bottom and max at the top", () => {
    expect(scaleY(0, 10, 200)).toBe(200);
    expect(scaleY(10, 10, 200)).toBe(0);
    expect(scaleY(5, 10, 200)).toBe(100);
  });

  it("clamps values outside the range", () => {
    expect(scaleY(20, 10, 200)).toBe(0);
    expect(scaleY(-5, 10, 200)).toBe(200);
  });
});

describe("linePath", () => {
  it("spreads points across the width", () => {
    expect(linePath([0, 10], 100, 50, 10)).toBe("M0.00 50.00 L100.00 0.00");
  });

  it("returns an empty path for no values", () => {
    expect(linePath([], 100, 50, 10)).toBe("");
  });
});
