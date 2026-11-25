/**
 * Phase 10: optional resume link.
 *
 * The PDF is intentionally not committed, so the CTA only appears when
 * RESUME_URL points at a current, reachable copy. A root-relative path keeps
 * the download behavior; an http(s) URL opens in a new tab.
 */

export type ResumeEnv = {
  RESUME_URL?: string;
};

export type ResumeLink = {
  href: string;
  external: boolean;
  download: boolean;
  label: "Download resume (PDF)" | "View resume (PDF)";
};

export function getResumeUrl(
  env: ResumeEnv = process.env as ResumeEnv,
): string | null {
  const raw = env.RESUME_URL?.trim();
  if (!raw) return null;

  if (raw.startsWith("/")) {
    return raw.startsWith("//") ? null : raw;
  }

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getResumeLink(
  env: ResumeEnv = process.env as ResumeEnv,
): ResumeLink | null {
  const href = getResumeUrl(env);
  if (!href) return null;

  const external = /^https?:\/\//i.test(href);

  return {
    href,
    external,
    download: !external,
    label: external ? "View resume (PDF)" : "Download resume (PDF)",
  };
}
