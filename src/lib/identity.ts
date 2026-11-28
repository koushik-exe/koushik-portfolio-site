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

type TerminalOutput = {
  text: string;
  /** Quieter line under a stronger one. Never used to hide content. */
  muted?: boolean;
};

type TerminalLine = {
  command: string;
  output: readonly TerminalOutput[];
};

/**
 * Verbatim from PROFILE.md line 10, en dash included. Stored as one string
 * because the line is a single sentence there; recomposing it from
 * `profile.ts` would paraphrase it.
 */
export const terminalCurrent =
  "Junior Analyst, ObjectWays, Karur (Aug 2026 – Present, on-site)";

/** Verbatim from PROFILE.md line 12, list prefix dropped. */
export const terminalTarget =
  "entry-level Data Analyst, Business Analyst, MIS Analyst";

/** Derived: describes the figure's structure and claims nothing. */
export const terminalCaption =
  "Terminal showing the name and title, the current role and the target roles.";

/**
 * The only three commands allowed on the home page (DESIGN.md 25.6). The
 * command words are UI labels; every output line is PROFILE text.
 */
export const terminalLines: readonly TerminalLine[] = [
  {
    command: "whoami",
    output: [
      { text: siteConfig.name },
      { text: siteConfig.title, muted: true },
    ],
  },
  {
    command: "current",
    output: [{ text: terminalCurrent }],
  },
  {
    command: "target",
    output: [{ text: terminalTarget }],
  },
];
