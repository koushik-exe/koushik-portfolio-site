import { describe, expect, it } from "vitest";

import { createPageMetadata, createPersonJsonLd, truncateMetaDescription } from "./seo";

describe("truncateMetaDescription", () => {
  it("normalizes whitespace and keeps short text unchanged", () => {
    expect(truncateMetaDescription("  Short\n description.  ")).toBe(
      "Short description.",
    );
  });

  it("truncates long text at a word boundary with an ellipsis", () => {
    const text = "word ".repeat(50);
    const result = truncateMetaDescription(text, 40);

    expect(result.length).toBeLessThanOrEqual(40);
    expect(result.endsWith("\u2026")).toBe(true);
    expect(result.at(-2)).not.toBe(" ");
  });

  it("uses the default limit of 160 characters", () => {
    const result = truncateMetaDescription("a".repeat(200));
    expect(result.length).toBeLessThanOrEqual(160);
  });
});

describe("createPageMetadata", () => {
  it("sets a canonical path, Open Graph and Twitter defaults", () => {
    const metadata = createPageMetadata({
      title: "About",
      description: "About Koushik C.",
      path: "/about",
    });

    expect(metadata.title).toBe("About");
    expect(metadata.alternates?.canonical).toBe("/about");
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      url: "/about",
      title: "About",
      images: [
        expect.objectContaining({
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          type: "image/png",
        }),
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [
        expect.objectContaining({
          url: "/twitter-image",
          width: 1200,
          height: 630,
          type: "image/png",
        }),
      ],
    });
  });

  it("adds article fields for blog posts", () => {
    const metadata = createPageMetadata({
      title: "A post",
      description: "A post about SQL.",
      path: "/blog/a-post",
      type: "article",
      publishedTime: "2026-01-02T00:00:00.000Z",
      tags: ["SQL"],
    });

    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-01-02T00:00:00.000Z",
      tags: ["SQL"],
    });
  });

  it("truncates long descriptions to 160 characters", () => {
    const metadata = createPageMetadata({
      title: "Projects",
      description: "project ".repeat(40),
      path: "/projects",
    });

    expect(metadata.description?.length).toBeLessThanOrEqual(160);
    expect(
      (metadata.openGraph as { description?: string }).description?.length,
    ).toBeLessThanOrEqual(160);
  });

  it("marks noindex pages", () => {
    const metadata = createPageMetadata({
      title: "Testimonials",
      description: "Testimonials.",
      path: "/testimonials",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

describe("createPersonJsonLd", () => {
  const jsonLd = createPersonJsonLd("https://koushik.example");

  it("describes the person with profile facts only", () => {
    expect(jsonLd).toMatchObject({
      "@type": "Person",
      name: "Koushik C",
      jobTitle: "Junior Analyst",
      url: "https://koushik.example",
      worksFor: { name: "ObjectWays" },
      address: {
        addressLocality: "Karur",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    });
    expect(jsonLd.sameAs).toEqual([
      "https://github.com/koushik-exe",
      "https://www.linkedin.com/in/koushik-c-data-analyst",
    ]);
  });

  it("contains no email, phone, mailto or tel", () => {
    const serialized = JSON.stringify(jsonLd);
    expect(serialized).not.toMatch(/mailto:|tel:/i);
    expect(serialized).not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(serialized).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });
});
