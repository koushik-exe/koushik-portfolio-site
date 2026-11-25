import { describe, expect, it } from "vitest";

import { formatPostDate } from "./format";

describe("formatPostDate", () => {
  it("formats a UTC date without a day shift", () => {
    expect(formatPostDate(new Date("2026-11-25T00:00:00.000Z"))).toBe("25 Nov 2026");
  });

  it("uses the UTC calendar day for a late timestamp", () => {
    expect(formatPostDate(new Date("2026-11-25T23:30:00.000Z"))).toBe("25 Nov 2026");
  });
});
