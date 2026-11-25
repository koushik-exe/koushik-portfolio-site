import { afterEach, describe, expect, it, vi } from "vitest";

import { absoluteUrl, resolveSiteUrl } from "./site-url";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveSiteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL first", () => {
    const url = resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://koushik.example",
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
    });
    expect(url.toString()).toBe("https://koushik.example/");
  });

  it("strips a trailing slash from an explicit URL", () => {
    const url = resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://koushik.example/",
    });
    expect(url.toString()).toBe("https://koushik.example/");
  });

  it("adds https to Vercel's hostname-only production URL", () => {
    const url = resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
    });
    expect(url.toString()).toBe("https://portfolio.vercel.app/");
  });

  it("falls through an invalid NEXT_PUBLIC_SITE_URL to Vercel", () => {
    const url = resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "not a url",
      VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app",
    });
    expect(url.toString()).toBe("https://portfolio.vercel.app/");
  });

  it("rejects non-http protocols", () => {
    const url = resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "ftp://koushik.example",
    });
    expect(url.toString()).toBe("http://localhost:3000/");
  });

  it("falls back to localhost when nothing is configured", () => {
    expect(resolveSiteUrl({}).toString()).toBe("http://localhost:3000/");
  });

  it("ignores blank values", () => {
    const url = resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "   ",
      VERCEL_PROJECT_PRODUCTION_URL: "",
    });
    expect(url.toString()).toBe("http://localhost:3000/");
  });
});

describe("absoluteUrl", () => {
  it("builds an absolute URL from a root-relative path", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://koushik.example");
    expect(absoluteUrl("/projects")).toBe("https://koushik.example/projects");
  });

  it("adds a leading slash when missing", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://koushik.example");
    expect(absoluteUrl("blog")).toBe("https://koushik.example/blog");
  });
});
