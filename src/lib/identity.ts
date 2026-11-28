import { siteConfig } from "@/lib/site";

/**
 * Home identity copy. Source: PROFILE.md lines 8-12 and 18-24.
 *
 * Name, title, location and availability come from siteConfig so the home
 * page cannot drift from the header, metadata or JSON-LD. The eyebrow and the
 * target line are the only derived strings; the summary sentences are verbatim.
 */

/** Derived from PROFILE.md line 10 (dates and location dropped). */
export const identityEyebrow = "Junior Analyst at ObjectWays";

/** Derived from PROFILE.md line 12. Sentence case on purpose. */
export const identityTarget = "entry-level Data / Business / MIS Analyst";

/** Verbatim from PROFILE.md lines 19-22. */
export const identitySummary = [
  "Junior Analyst at ObjectWays, Karur, working on AI data annotation and quality for egocentric (first-person image and video) and NLP text projects.",
  "MBA graduate specializing in Business Analytics, skilled in SQL, Python and Microsoft Excel for turning raw data into business insights.",
] as const;

/** PROFILE.md line 11. Languages belong to the toolkit card (E6). */
export const identityFacts = [
  { label: "Based in", value: siteConfig.location },
  {
    label: siteConfig.availability,
    value: "Chennai, Bengaluru, Coimbatore",
  },
] as const;
