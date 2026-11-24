import { SectionHeading } from "@/components/home/section-heading";
import { homeSkillGroups } from "@/lib/skills";

export function SkillsOverview() {
  return (
    <section
      aria-labelledby="skills-heading"
      id="skills"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="02"
          label="Toolkit"
          titleId="skills-heading"
          title="SQL, Excel and Python, and what I use them for"
          intro="A working list, not a proficiency chart."
        />

        <dl className="mt-12 grid gap-x-8 lg:grid-cols-12">
          <div className="border-t border-border lg:col-span-8 lg:col-start-5">
            {homeSkillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-2 border-b border-border py-6 sm:grid-cols-3 sm:gap-8"
              >
                <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase sm:pt-1">
                  {group.label}
                </dt>
                <dd className="text-base leading-relaxed text-foreground sm:col-span-2">
                  {group.items.map((item) => item.name).join(", ")}
                </dd>
              </div>
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}
