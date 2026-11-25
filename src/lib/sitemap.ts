import type { MetadataRoute } from "next";

/**
 * Phase 10: pure sitemap construction, separated from the route handler so
 * the inclusion rules are covered by Vitest. Only public, indexable routes
 * belong here: no admin, API, drafts or empty testimonials.
 */

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}>;

export type SitemapSourceEntry = {
  slug: string;
  updatedAt: Date;
};

export type BuildSitemapInput = {
  siteUrl: string | URL;
  projects: SitemapSourceEntry[];
  posts: SitemapSourceEntry[];
  includeTestimonials?: boolean;
};

function originOf(siteUrl: string | URL): string {
  const url = typeof siteUrl === "string" ? new URL(siteUrl) : siteUrl;
  return url.origin;
}

function absolute(origin: string, path: string): string {
  return `${origin}${path}`;
}

export function buildSitemapEntries({
  siteUrl,
  projects,
  posts,
  includeTestimonials = false,
}: BuildSitemapInput): MetadataRoute.Sitemap {
  const origin = originOf(siteUrl);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absolute(origin, route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absolute(origin, `/projects/${project.slug}`),
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absolute(origin, `/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const testimonialEntries: MetadataRoute.Sitemap = includeTestimonials
    ? [
        {
          url: absolute(origin, "/testimonials"),
          changeFrequency: "monthly",
          priority: 0.5,
        },
      ]
    : [];

  return [
    ...staticEntries,
    ...projectEntries,
    ...postEntries,
    ...testimonialEntries,
  ];
}
