import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getResumeLink } from "@/lib/resume";
import { siteConfig } from "@/lib/site";

const contents = [
  { index: "01", label: "Selected work", href: "#work" },
  { index: "02", label: "Toolkit", href: "#skills" },
  { index: "03", label: "Experience", href: "#experience" },
  { index: "04", label: "Contact", href: "#contact" },
];

const facts = [
  { label: "Based in", value: "Karur, Tamil Nadu" },
  { label: "Open to relocate", value: "Chennai, Bengaluru, Coimbatore" },
  { label: "Languages", value: "English, Tamil" },
];

export function HomeHero() {
  const resume = getResumeLink();

  return (
    <section aria-labelledby="hero-heading">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-y-12 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-x-8 lg:pt-32">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              Junior Analyst at ObjectWays
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-heading text-5xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-6xl lg:text-7xl"
            >
              {siteConfig.name}
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-snug text-pretty text-foreground sm:text-2xl">
              Data analyst &middot; SQL, Excel and Python
            </p>

            <p className="mt-3 text-sm text-pretty text-muted-foreground">
              Karur, Tamil Nadu &middot; Open to relocate
            </p>

            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              I’m a Junior Analyst at ObjectWays in Karur, working with AI
              training data. I also have an MBA in Business Analytics and work
              in SQL, Python and Excel. In my own projects, I build small
              automations in Python and n8n.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="#work">
                  View projects
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-150 ease-out group-hover/button:translate-x-0.5"
                  />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="#contact">Contact</Link>
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
          </div>

          <nav
            aria-label="On this page"
            className="hidden lg:col-span-3 lg:col-start-10 lg:block lg:pt-3"
          >
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              On this page
            </p>
            <ul className="mt-4 grid grid-cols-1">
              {contents.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex min-h-11 items-center gap-3 rounded-md text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
                      {item.index}
                    </span>
                    <span className="underline-offset-4 group-hover:underline">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <dl className="mt-16 grid border-t border-border sm:mt-24 sm:grid-cols-3">
          {facts.map((fact, position) => (
            <div
              key={fact.label}
              className={
                position === 0
                  ? "py-6 sm:pr-8"
                  : "border-t border-border py-6 sm:border-t-0 sm:border-l sm:pr-8 sm:pl-8"
              }
            >
              <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
