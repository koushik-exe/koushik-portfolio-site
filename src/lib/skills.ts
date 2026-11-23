export type SkillGroup = {
  label: string;
  items: string;
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Databases and querying",
    items: "SQL, PostgreSQL",
  },
  {
    label: "Programming",
    items: "Python (scripting, automation, file handling)",
  },
  {
    label: "Data and spreadsheets",
    items: "Microsoft Excel (advanced), Google Sheets, data cleaning, data analysis",
  },
  {
    label: "Analytics and automation",
    items: "business analytics, workflow automation with n8n, local LLMs with Ollama",
  },
  {
    label: "Tools",
    items: "MS Word, MS PowerPoint, Canva",
  },
  {
    label: "Soft skills",
    items:
      "communication, problem solving, critical thinking, adaptability, time management",
  },
  {
    label: "Languages",
    items: "English (professional working), Tamil (native)",
  },
];
