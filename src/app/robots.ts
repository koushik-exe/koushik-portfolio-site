import type { MetadataRoute } from "next";

import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

/**
 * Phase 10: allow the public site, keep admin and API out of the index, and
 * block preview deployments entirely. Testimonials are intentionally not
 * disallowed: the page itself is noindex while it has no consented quotes.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";
  const siteUrl = getSiteUrl();

  return {
    rules: isPreview
      ? [{ userAgent: "*", disallow: "/" }]
      : [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api"],
          },
        ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}
