export type ExperienceEntry = {
  /** Date range shown in the margin, e.g. "Aug 2026 – Present" (en dash). */
  dateRange: string;
  /** Role title. */
  title: string;
  /** Organization line under the title. */
  organization: string;
  /** What the role involved, one short sentence per bullet. */
  bullets: readonly string[];
};

export type EducationEntry = {
  qualification: string;
  institution: string;
  dateRange: string;
  /** Score or subject note, e.g. "CGPA 7.64". */
  note: string;
  /** Whether the entry is shown in the home page education block. */
  home?: boolean;
};

/**
 * Shared profile facts for the home page, About and Experience so the three
 * pages cannot drift. Source: PROFILE.md.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    dateRange: "Aug 2026 – Present",
    title: "Junior Analyst",
    organization: "ObjectWays · Karur (on-site)",
    bullets: [
      "Annotate and review egocentric image and video data and NLP text data for AI training projects, following detailed project guidelines and annotation standards.",
      "Run quality checks, identify inconsistencies and keep accuracy and consistency high across assigned tasks.",
      "Work to daily quality and productivity targets, coordinating with the team to meet project deadlines.",
    ],
  },
  {
    dateRange: "Aug 2025 – Jan 2026",
    title: "Business Associate",
    organization:
      "Altruist Technologies Pvt. Ltd. · Client: Airtel, Bengaluru (on-site)",
    bullets: [
      "Handled 30 to 100+ inbound calls a day, depending on call flow.",
      "Resolved queries and complaints across four service lines: postpaid, prepaid, DTH, and Wi-Fi/broadband.",
      "Trained on the email support process before moving to voice. The role strengthened communication, active listening and problem solving under pressure.",
    ],
  },
];

export const education: readonly EducationEntry[] = [
  {
    qualification: "MBA, Business Analytics",
    institution: "Rathinam Global University, Coimbatore",
    dateRange: "2023–2025",
    note: "CGPA 7.64",
    home: true,
  },
  {
    qualification: "BBA",
    institution: "Valluvar College of Science and Management, Karur",
    dateRange: "2020–2023",
    note: "69.6%",
  },
  {
    qualification: "Honor Diploma in Computer Application (HDCA)",
    institution: "Computer Software College",
    dateRange: "2021",
    note: "Advanced Excel, SQL and MS Office",
    home: true,
  },
];

/** Education entries shown on the home page. */
export const homeEducation = education.filter((entry) => entry.home);
