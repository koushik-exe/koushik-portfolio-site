export type SkillItem = {
  /** Tool or capability name shown first, e.g. "SQL" or "Python". */
  name: string;
  /** Optional qualifier shown as a muted detail line, e.g. "advanced". */
  detail?: string;
};

export type SkillGroup = {
  label: string;
  items: readonly SkillItem[];
  /** Whether the group appears in the home page toolkit list. */
  home: boolean;
};

/**
 * Shared skill inventory for the home toolkit list and the About page skills
 * section, so the two cannot drift. Source: PROFILE.md.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Databases and querying",
    items: [{ name: "SQL" }, { name: "PostgreSQL" }],
    home: true,
  },
  {
    label: "Programming",
    items: [
      {
        name: "Python",
        detail: "scripting, automation, file handling",
      },
    ],
    home: true,
  },
  {
    label: "Data and spreadsheets",
    items: [
      { name: "Microsoft Excel", detail: "advanced" },
      { name: "Google Sheets" },
      { name: "Data cleaning" },
      { name: "Data analysis" },
    ],
    home: true,
  },
  {
    label: "Analytics and automation",
    items: [
      { name: "Business analytics" },
      { name: "n8n", detail: "workflow automation" },
      { name: "Ollama", detail: "local LLMs" },
    ],
    home: true,
  },
  {
    label: "Tools",
    items: [{ name: "MS Word" }, { name: "MS PowerPoint" }, { name: "Canva" }],
    home: false,
  },
  {
    label: "Soft skills",
    items: [
      { name: "Communication" },
      { name: "Problem solving" },
      { name: "Critical thinking" },
      { name: "Adaptability" },
      { name: "Time management" },
    ],
    home: false,
  },
  {
    label: "Languages",
    items: [
      { name: "English", detail: "professional working" },
      { name: "Tamil", detail: "native" },
    ],
    home: false,
  },
];

/** Skill groups shown on the home page, limited to the analytical core. */
export const homeSkillGroups = skillGroups.filter((group) => group.home);
