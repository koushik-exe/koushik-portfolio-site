import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/timeline";
import { experience } from "@/lib/profile";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Experience of Koushik C - Junior Analyst at ObjectWays, Aug 2026 - Present, and Business Associate at Altruist Technologies, Aug 2025 - Jan 2026.",
  path: "/experience",
});

export default function Experience() {
  return (
    <section
      aria-labelledby="experience-heading"
      id="experience"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Experience
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="experience-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              Experience
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              Two roles, newest first: AI data annotation and quality at
              ObjectWays, then customer support for Airtel at Altruist
              Technologies.
            </p>
          </div>
        </header>
        <Reveal>
          <Timeline entries={experience} />
        </Reveal>
      </div>
    </section>
  );
}
