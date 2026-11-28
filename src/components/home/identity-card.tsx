import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { BentoCard } from "@/components/home/bento-card";
import { Button } from "@/components/ui/button";
import {
  identityEyebrow,
  identityFacts,
  identitySummary,
  identityTarget,
} from "@/lib/identity";
import { getResumeLink } from "@/lib/resume";
import { siteConfig } from "@/lib/site";

/**
 * Identity card (DESIGN.md 25.4). Every string traces to PROFILE.md lines
 * 8-12 and 18-24; see `src/lib/identity.ts`.
 */
export function IdentityCard() {
  const resume = getResumeLink();

  return (
    <BentoCard className="md:col-span-2 xl:col-span-12">
      <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        {identityEyebrow}
      </p>

      <h1
        id="identity-heading"
        className="mt-6 font-heading text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.02em] text-balance text-foreground md:text-5xl xl:text-[3.5rem]"
      >
        {siteConfig.name}
      </h1>

      <p className="mt-4 max-w-3xl text-base leading-snug text-pretty text-foreground sm:text-lg">
        {siteConfig.title}
      </p>

      <p className="mt-2 text-sm font-medium text-foreground">
        {identityTarget}
      </p>

      <div className="mt-5 max-w-[62ch] space-y-3 text-base leading-relaxed text-pretty text-muted-foreground">
        {identitySummary.map((sentence) => (
          <p key={sentence}>{sentence}</p>
        ))}
      </div>

      <dl className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
        {identityFacts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link href="#work">
            View projects
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-150 ease-out group-hover/button:translate-x-0.5"
            />
          </Link>
        </Button>

        <Button
          asChild
          variant="secondary"
          className="border border-muted-foreground"
        >
          <Link href="/contact">Contact</Link>
        </Button>

        {resume ? (
          <>
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-border sm:block"
            />
            <a
              href={resume.href}
              {...(resume.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : { download: resume.download })}
              className="flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline"
            >
              {resume.external ? (
                <ArrowUpRight aria-hidden="true" className="size-4" />
              ) : (
                <Download aria-hidden="true" className="size-4" />
              )}
              {resume.label}
            </a>
          </>
        ) : null}
      </div>
    </BentoCard>
  );
}
