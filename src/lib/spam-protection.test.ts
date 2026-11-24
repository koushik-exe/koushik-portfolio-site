import { describe, expect, it } from "vitest";

import { rateLimitErrorFailsClosed, spamProtectionStatus } from "./spam-protection";

describe("spamProtectionStatus", () => {
  it("returns mode upstash when both Upstash variables are set", () => {
    const { mode, missing } = spamProtectionStatus({
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_URL: "https://rest.example",
      UPSTASH_REDIS_REST_TOKEN: "token",
    });
    expect(mode).toBe("upstash");
    expect(missing).toEqual([]);
  });

  it("fails closed in production when UPSTASH_REDIS_REST_URL is missing", () => {
    const { mode, missing } = spamProtectionStatus({
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_TOKEN: "token",
    });
    expect(mode).toBe("fail-closed");
    expect(missing).toEqual(["UPSTASH_REDIS_REST_URL"]);
  });

  it("fails closed in production when UPSTASH_REDIS_REST_TOKEN is missing", () => {
    const { mode, missing } = spamProtectionStatus({
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_URL: "https://rest.example",
    });
    expect(mode).toBe("fail-closed");
    expect(missing).toEqual(["UPSTASH_REDIS_REST_TOKEN"]);
  });

  it("fails closed in production when both Upstash variables are missing", () => {
    const { mode, missing } = spamProtectionStatus({ NODE_ENV: "production" });
    expect(mode).toBe("fail-closed");
    expect(missing).toEqual(["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"]);
  });

  it("falls back to the in-memory limiter in development without Upstash", () => {
    const { mode } = spamProtectionStatus({ NODE_ENV: "development" });
    expect(mode).toBe("memory");
  });
});

describe("rateLimitErrorFailsClosed", () => {
  it("fails closed in production when the Upstash limiter throws (production-limiter-error case)", () => {
    expect(rateLimitErrorFailsClosed(true)).toBe(true);
  });

  it("does not fail closed in development when the Upstash limiter throws", () => {
    expect(rateLimitErrorFailsClosed(false)).toBe(false);
  });
});
