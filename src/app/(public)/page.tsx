import { BentoBoard } from "@/components/home/bento-board";
import { ClosingCta } from "@/components/home/closing-cta";
import { ExperienceSnapshot } from "@/components/home/experience-snapshot";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { IdentityCard } from "@/components/home/identity-card";
import { TerminalCard } from "@/components/home/terminal-card";
import { SkillsOverview } from "@/components/home/skills-overview";
import { createPageMetadata, createPersonJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = createPageMetadata({
  // The layout title template does not apply to the page in the same segment,
  // so the home title includes the brand suffix explicitly.
  title: "Data Analyst | SQL, Excel & Python | Koushik C",
  description:
    "Junior Analyst at ObjectWays with an MBA in Business Analytics. I use SQL, Python and Excel to turn raw data into clear business insight.",
  path: "/",
});

const personJsonLd = JSON.stringify(
  createPersonJsonLd(getSiteUrl()),
).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
      <BentoBoard>
        <IdentityCard />
        <TerminalCard />
      </BentoBoard>
      <FeaturedProjects />
      <SkillsOverview />
      <ExperienceSnapshot />
      <ClosingCta />
    </>
  );
}
