export type FeaturedProject = {
  slug: string;
  title: string;
  tools: readonly string[];
  summary: string;
  /** Whether the project appears in the home page selected work list. */
  home: boolean;
};

export type ProjectLinks = {
  repository: string | null;
  live: string | null;
};

export type Project = {
  slug: string;
  title: string;
  /** Personal or client type; null when unknown. */
  type: string | null;
  status: string;
  tools: readonly string[];
  summary: string;
  problem: string | null;
  approach: string | null;
  result: string;
  learned: string | null;
  links: ProjectLinks;
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: "fileflow",
    title: "FileFlow",
    tools: ["Python"],
    summary:
      "A Python tool that organizes files by type and date, flags duplicates with SHA-256 hashing and reads EXIF data from images. It runs a two-phase organize-and-verify pass with error handling, then writes its own log and report.",
    home: true,
  },
  {
    slug: "n8n-ai-career-platform",
    title: "n8n AI Career Platform v2",
    tools: ["n8n", "Ollama", "Google Sheets"],
    summary:
      "End-to-end job search automation: it scrapes LinkedIn listings, extracts resume data and scores each listing’s fit with a model running locally. Five stages — search parameters, job parsing, deduplication, AI match scoring, Google Sheets logging.",
    home: true,
  },
  {
    slug: "developer-portfolio-website",
    title: "Developer Portfolio Website",
    tools: ["HTML", "Tailwind CSS"],
    summary:
      "The earlier version of this site, built in HTML and Tailwind CSS with an interactive grid, animated background and scroll-based reveals, then fixed across browsers.",
    home: false,
  },
];

export const projectsIntro =
  "These are personal projects, not client work. Each page covers what the project does and the tools I used.";

/** The projects shown on the `/projects` index; the detail route is `/projects/[slug]`. */
export const projects: readonly Project[] = [
  {
    slug: "fileflow",
    title: "FileFlow",
    type: null,
    status: "Personal project",
    tools: ["Python"],
    summary:
      "A Python tool that organizes files by type and date, flags duplicates with SHA-256 hashing and reads EXIF data from images. It runs a two-phase organize-and-verify pass with error handling, then writes its own log and report.",
    problem: null,
    approach: null,
    result: "No measured result yet.",
    learned: null,
    links: { repository: null, live: null },
  },
  {
    slug: "n8n-ai-career-platform",
    title: "n8n AI Career Platform v2",
    type: null,
    status: "Personal project",
    tools: ["n8n", "Ollama", "Google Sheets"],
    summary:
      "End-to-end job search automation: it scrapes LinkedIn listings, extracts resume data and scores each listing’s fit with a model running locally. Five stages — search parameters, job parsing, deduplication, AI match scoring, Google Sheets logging.",
    problem: null,
    approach: null,
    result: "No measured result yet.",
    learned: null,
    links: { repository: null, live: null },
  },
  {
    slug: "developer-portfolio-website",
    title: "Developer Portfolio Website",
    type: null,
    status: "Personal project",
    tools: ["HTML", "Tailwind CSS"],
    summary:
      "The earlier version of this site, built in HTML and Tailwind CSS with an interactive grid, animated background and scroll-based reveals, then fixed across browsers.",
    problem: null,
    approach:
      "Built in HTML and Tailwind CSS with a custom glassmorphism UI; interactive grid, animated background and scroll-based reveals; cross-browser fixes.",
    result: "No measured result yet.",
    learned: null,
    links: { repository: null, live: "https://koushik-exe.github.io/portfolio" },
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
