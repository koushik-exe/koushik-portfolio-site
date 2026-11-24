import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { experience, homeEducation } from "@/lib/profile";

export function ExperienceSnapshot() {
  return (
    <section
      aria-labelledby="experience-heading"
      id="experience"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="03"
          label="Experience"
          titleId="experience-heading"
          title="Experience"
          intro="I’m currently a Junior Analyst at ObjectWays in Karur. Before that, I spent six months in a customer-facing role at Altruist Technologies, supporting Airtel’s Airtel Black customers."
        />

        <ol className="mt-12 border-b border-border">
          {experience.map((role, index) => (
            <li
              key={`${role.title}-${role.dateRange}`}
              className="grid gap-x-8 gap-y-4 border-t border-border py-6 lg:grid-cols-12"
            >
              <p className="font-mono text-sm tabular-nums tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3 lg:pt-1.5">
                {role.dateRange}
              </p>

              <div className="lg:col-span-8 lg:col-start-5">
                <h3 className="font-heading text-2xl leading-[1.3] font-semibold text-foreground">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                  {role.organization}
                </p>

                {index === 0 ? (
                  <ul className="mt-6 max-w-[62ch] list-none space-y-3 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
                    {role.bullets.map((item) => (
                      <li
                        key={item}
                        className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-muted-foreground before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-x-8 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <Link
              href="/experience"
              className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground transition-colors duration-200 outline-none hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Full experience
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-3 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3">
            Education
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            {homeEducation.map((entry) => (
              <div
                key={entry.qualification}
                className="border-t border-border py-6 last:pb-0"
              >
                <p className="text-base leading-relaxed text-foreground">
                  {entry.qualification} &mdash; {entry.institution}
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                  {entry.dateRange} &middot; {entry.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
