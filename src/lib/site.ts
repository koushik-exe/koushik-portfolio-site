export const siteConfig = {
  name: "Koushik C",
  role: "Data Analyst",
  title: "Data Analyst | SQL, Excel & Python | MBA in Business Analytics",
  description:
    "Entry-level data analyst with an MBA in Business Analytics, using SQL, Python and Excel to turn raw data into business insight.",
  location: "Karur, Tamil Nadu, India",
  availability: "Open to relocate",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Experience", href: "/experience" },
  ],
  primaryAction: { label: "Contact", href: "/contact" },
  social: {
    github: "https://github.com/koushik-exe",
    linkedin: "https://www.linkedin.com/in/koushik-c-data-analyst",
  },
} as const;

export type NavItem = { label: string; href: string };
