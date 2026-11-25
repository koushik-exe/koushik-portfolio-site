/**
 * Phase 10: canonical site URL resolution for metadata, sitemap and robots.
 *
 * Precedence:
 * 1. NEXT_PUBLIC_SITE_URL (explicit production/custom domain)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (Vercel's stable production hostname)
 * 3. http://localhost:3000 (local development)
 *
 * Vercel exposes the hostname without a protocol, so https is assumed for
 * values that do not include one. Only http(s) URLs are accepted.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): URL | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    url.search = "";
    if (url.pathname !== "/") {
      url.pathname = url.pathname.replace(/\/+$/, "");
    }
    return url;
  } catch {
    return null;
  }
}

export type SiteUrlEnv = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

/** Resolve the canonical site URL from an environment object. */
export function resolveSiteUrl(
  env: SiteUrlEnv = process.env as SiteUrlEnv,
): URL {
  const candidates = [
    env.NEXT_PUBLIC_SITE_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
  ];

  for (const candidate of candidates) {
    const resolved = normalizeSiteUrl(candidate);
    if (resolved) return resolved;
  }

  return new URL(FALLBACK_SITE_URL);
}

/** The canonical site URL for the current deployment. */
export function getSiteUrl(): URL {
  return resolveSiteUrl();
}

/** Turn a root-relative path into an absolute URL on the canonical origin. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, getSiteUrl().origin).toString();
}
