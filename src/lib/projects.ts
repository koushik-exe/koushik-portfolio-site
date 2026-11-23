export type FeaturedProject = {
  slug: string;
  title: string;
  tools: readonly string[];
  summary: string;
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: "fileflow",
    title: "FileFlow",
    tools: ["Python", "file automation"],
    summary:
      "A Python tool that organizes files by type and date, flags duplicates with SHA-256 hashing and reads EXIF data from images. It runs a two-phase organize-and-verify pass with error handling, then writes its own log and report.",
  },
  {
    slug: "n8n-ai-career-platform",
    title: "n8n AI Career Platform v2",
    tools: ["n8n", "Ollama", "Google Sheets"],
    summary:
      "End-to-end job search automation: it scrapes LinkedIn listings, extracts resume data and scores each listing’s fit with a model running locally. Five stages — search parameters, job parsing, deduplication, AI match scoring, Google Sheets logging.",
  },
  {
    slug: "developer-portfolio-website",
    title: "Developer Portfolio Website",
    tools: ["HTML", "Tailwind CSS"],
    summary:
      "The earlier version of this site, built in HTML and Tailwind CSS with an interactive grid, animated background and scroll-based reveals, then fixed across browsers.",
  },
];
