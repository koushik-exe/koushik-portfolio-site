import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";

const highlights = [
  "Handled 30 to 100+ inbound calls a day, depending on call flow.",
  "Resolved queries and complaints across four service lines: postpaid, prepaid, DTH, and Wi-Fi/broadband.",
  "Trained on the email support process before moving to voice — the part that sharpened communication, active listening and problem solving under pressure.",
];

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
          title="Customer-facing experience"
          intro="From August 2025 to January 2026 I was a Business Associate at Altruist Technologies, on-site in Bengaluru, supporting Airtel’s premium Airtel Black segment."
        />

        <div className="mt-12 grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-sm tabular-nums tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3 lg:pt-1.5">
            Aug 2025 &ndash; Jan 2026
          </p>

          <div className="lg:col-span-8 lg:col-start-5">
            <h3 className="font-heading text-2xl leading-tight font-semibold text-foreground">
              Business Associate
            </h3>
            <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
              Altruist Technologies Pvt. Ltd. &middot; Client: Airtel, Bengaluru
              (on-site)
            </p>

            <ul className="mt-6 max-w-[62ch] list-none space-y-3 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-muted-foreground before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/experience"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground transition-colors duration-200 outline-none hover:text-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Full experience
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-3 border-t border-border pt-8 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3">
            Education
          </p>
          <p className="text-base leading-relaxed text-foreground lg:col-span-8 lg:col-start-5">
            MBA, Business Analytics &mdash; Rathinam Global University,
            Coimbatore, 2023&ndash;2025.
          </p>
        </div>
      </div>
    </section>
  );
}
