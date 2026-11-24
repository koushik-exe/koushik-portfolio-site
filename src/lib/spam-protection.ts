/**
 * Pure spam-protection decisions for the contact form (Phase 5). Shared by
 * the Server Action and covered by Vitest tests.
 */

export type SpamProtectionMode = "upstash" | "memory" | "fail-closed";

/**
 * Pure decision: when the Upstash limiter call throws, production fails
 * closed and development falls back to the in-memory limiter.
 */
export function rateLimitErrorFailsClosed(isProduction: boolean): boolean {
  return isProduction;
}

/**
 * Pure decision about the spam-protection mode from the environment:
 * "upstash" when both Upstash variables are set, "memory" in development
 * without them, "fail-closed" in production without them.
 */
export function spamProtectionStatus(
  env: NodeJS.ProcessEnv,
): { mode: SpamProtectionMode; missing: string[] } {
  const missing = ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].filter(
    (name) => !env[name],
  );
  if (missing.length === 0) {
    return { mode: "upstash", missing };
  }
  return {
    mode: env.NODE_ENV === "production" ? "fail-closed" : "memory",
    missing,
  };
}
