import { describe, expect, it } from "vitest";

import { buildSitemapEntries } from "./sitemap";

const siteUrl = "https://koushik.example";
const updatedAt = new Date("2026-11-20T10:00:00.000Z");

describe("buildSitemapEntries", () => {
  it("includes the static public routes as absolute URLs", () => {
    const entries = buildSitemapEntries({
      siteUrl,
      projects: [],
      posts: [],
    });

    const urls = entries.map((entry) => entry.url);
    expect(urls).toEqual([
      "https://koushik.example/",
      "https://koushik.example/about",
      "https://koushik.example/projects",
      "https://koushik.example/blog",
      "https://koushik.example/experience",
      "https://koushik.example/contact",
    ]);
    expect(urls.some((url) => url.includes("/admin"))).toBe(false);
    expect(urls.some((url) => url.includes("/api"))).toBe(false);
  });

  it("adds published projects and posts with lastModified", () => {
    const entries = buildSitemapEntries({
      siteUrl,
      projects: [{ slug: "fileflow", updatedAt }],
      posts: [{ slug: "sql-notes", updatedAt }],
    });

    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://koushik.example/projects/fileflow",
        lastModified: updatedAt,
      }),
    );
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://koushik.example/blog/sql-notes",
        lastModified: updatedAt,
      }),
    );
  });

  it("excludes testimonials while none are published", () => {
    const entries = buildSitemapEntries({
      siteUrl,
      projects: [],
      posts: [],
      includeTestimonials: false,
    });

    expect(entries.some((entry) => entry.url.endsWith("/testimonials"))).toBe(
      false,
    );
  });

  it("includes testimonials once published testimonials exist", () => {
    const entries = buildSitemapEntries({
      siteUrl,
      projects: [],
      posts: [],
      includeTestimonials: true,
    });

    expect(entries).toContainEqual(
      expect.objectContaining({
        url: "https://koushik.example/testimonials",
      }),
    );
  });

  it("accepts a URL object and a trailing slash without doubling it", () => {
    const entries = buildSitemapEntries({
      siteUrl: new URL("https://koushik.example/"),
      projects: [],
      posts: [],
    });

    expect(entries[0]?.url).toBe("https://koushik.example/");
    expect(entries[1]?.url).toBe("https://koushik.example/about");
  });
});
