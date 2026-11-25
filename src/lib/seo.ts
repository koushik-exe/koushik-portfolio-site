import type { Metadata } from "next";

import { siteConfig } from "./site";

/**
 * Phase 10: shared SEO metadata. Every public page defines its own
 * `openGraph`/`twitter` object because Next.js shallowly merges metadata and
 * a page-level `openGraph` replaces the layout object entirely. The
 * `opengraph-image.tsx` and `twitter-image.tsx` file conventions add the
 * social image tags with Next's hashed route URLs.
 */

const SOCIAL_IMAGE_ALT = `${siteConfig.name}, ${siteConfig.role}`;

/**
 * Stable social-image URLs. The route handlers at `/opengraph-image` and
 * `/twitter-image` are prerendered at build time.
 */
export const openGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SOCIAL_IMAGE_ALT,
  type: "image/png",
} as const;

export const twitterImage = {
  url: "/twitter-image",
  width: 1200,
  height: 630,
  alt: SOCIAL_IMAGE_ALT,
  type: "image/png",
} as const;

export function truncateMetaDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;

  const slice = normalized.slice(0, max - 1);
  const boundary = slice.lastIndexOf(" ");
  const cut = boundary > 0 ? slice.slice(0, boundary) : slice;

  return `${cut.replace(/[\s,;:.-]+$/, "")}\u2026`;
}

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Root-relative canonical path, for example "/projects". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
  noIndex,
}: PageMetadataInput): Metadata {
  const resolvedDescription = truncateMetaDescription(description);

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          title,
          description: resolvedDescription,
          url: path,
          siteName: siteConfig.name,
          locale: "en_IN",
          publishedTime,
          tags,
          images: [openGraphImage],
        }
      : {
          type: "website",
          title,
          description: resolvedDescription,
          url: path,
          siteName: siteConfig.name,
          locale: "en_IN",
          images: [openGraphImage],
        };

  return {
    title,
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: [twitterImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Phase 10: Person structured data for the home page. Facts come from
 * PROFILE.md only; no email, phone or private contact details are included.
 */
export function createPersonJsonLd(siteUrl: string | URL) {
  const url = typeof siteUrl === "string" ? siteUrl : siteUrl.toString();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Junior Analyst",
    description: siteConfig.description,
    url,
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "ObjectWays",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Rathinam Global University",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Valluvar College of Science and Management",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    knowsAbout: [
      "SQL",
      "PostgreSQL",
      "Python",
      "Microsoft Excel",
      "Google Sheets",
      "Business Analytics",
      "Data Analysis",
      "Workflow Automation",
      "n8n",
    ],
  };
}

