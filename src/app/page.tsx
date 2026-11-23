import type { Metadata } from "next";

import { ClosingCta } from "@/components/home/closing-cta";
import { ExperienceSnapshot } from "@/components/home/experience-snapshot";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeHero } from "@/components/home/home-hero";
import { SkillsOverview } from "@/components/home/skills-overview";

export const metadata: Metadata = {
  title: "Data Analyst | SQL, Excel & Python",
  description:
    "Entry-level data analyst with an MBA in Business Analytics, using SQL, Python and Excel to turn raw data into business insight.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedProjects />
      <SkillsOverview />
      <ExperienceSnapshot />
      <ClosingCta />
    </>
  );
}
