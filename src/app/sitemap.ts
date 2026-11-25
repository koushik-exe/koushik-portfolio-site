import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/data/posts";
import { getPublishedProjects } from "@/lib/data/projects";
import { hasPublishedTestimonials } from "@/lib/data/testimonials";
import { buildSitemapEntries } from "@/lib/sitemap";
import { getSiteUrl } from "@/lib/site-url";

/** Phase 10: public sitemap; admin mutations also revalidate this route. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, includeTestimonials] = await Promise.all([
    getPublishedProjects(),
    getPublishedPosts(),
    hasPublishedTestimonials(),
  ]);

  return buildSitemapEntries({
    siteUrl: getSiteUrl(),
    projects,
    posts,
    includeTestimonials,
  });
}
