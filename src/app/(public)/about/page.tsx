import { SkillsInventory } from "@/components/about/skills-inventory";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/timeline";
import { education, experience } from "@/lib/profile";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Entry-level data analyst in Karur, Tamil Nadu, with an MBA in Business Analytics and hands-on SQL, Excel and Python project work.",
  path: "/about",
});

export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      id="about"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            About
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="about-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              About Koushik C
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              Junior Analyst at ObjectWays in Karur, working on AI data
              annotation and quality for egocentric image and video and NLP text
              projects. MBA graduate specializing in Business Analytics,
              skilled in SQL, Python and Microsoft Excel. Self-driven in
              building Python automation projects, with strong stakeholder
              communication built in a customer-facing corporate role.
            </p>
          </div>
        </header>

        <section
          aria-labelledby="about-experience-heading"
          className="mt-24 sm:mt-32"
        >
          <Reveal>
            <h2
              id="about-experience-heading"
              className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance"
            >
              Experience
            </h2>
            <Timeline entries={experience} />
          </Reveal>
        </section>

        <section
          aria-labelledby="about-education-heading"
          className="mt-24 sm:mt-32"
        >
          <Reveal>
            <h2
              id="about-education-heading"
              className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance"
            >
              Education
            </h2>
            <div className="mt-8 border-t border-border">
              {education.map((entry) => (
                <div
                  key={entry.qualification}
                  className="grid gap-x-8 gap-y-3 border-b border-border py-6 lg:grid-cols-12"
                >
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3">
                    {entry.qualification}
                  </p>
                  <p className="text-base leading-relaxed text-foreground lg:col-span-8 lg:col-start-5">
                    {entry.institution}, {entry.dateRange}. {entry.note}.
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section
          aria-labelledby="about-skills-heading"
          className="mt-24 sm:mt-32"
        >
          <Reveal>
            <h2
              id="about-skills-heading"
              className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance"
            >
              Skills
            </h2>
            <SkillsInventory />
          </Reveal>
        </section>
      </div>
    </section>
  );
}
