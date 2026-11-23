import { Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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
  return (
    <section aria-labelledby="hero-heading">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12">
        <div className="grid gap-y-12 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-x-8 lg:pt-32">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              Entry-level data analyst
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-heading text-5xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-6xl lg:text-7xl"
            >
              {siteConfig.name}
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-snug text-pretty text-foreground sm:text-2xl">
              {siteConfig.title}
            </p>

            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              I’m an MBA graduate in Business Analytics, working in SQL,
              Python and Excel to turn raw data into business insight. I’m
              looking for an entry-level analyst role where careful analysis
              &mdash; and the automation I build on my own time &mdash; can solve
              real business problems.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button asChild size="lg" className="h-11 px-5 text-sm">
                <Link href="/projects">View projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 border-input px-5 text-sm hover:border-foreground"
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            <a
              href="/Koushik_C_Resume.pdf"
              download
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download aria-hidden="true" className="size-4" />
              Download resume (PDF)
            </a>
          </div>

          <nav
            aria-label="On this page"
            className="border-t border-border pt-5 lg:col-span-3 lg:col-start-10 lg:border-t-0 lg:pt-3"
          >
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              On this page
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-4 lg:mt-4 lg:grid-cols-1">
              {contents.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex min-h-11 items-center gap-2.5 rounded-sm text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:gap-3"
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

        <dl className="mt-16 grid border-t border-border sm:mt-20 sm:grid-cols-3 lg:mt-24">
          {facts.map((fact, position) => (
            <div
              key={fact.label}
              className={
                position === 0
                  ? "py-5 sm:py-6 sm:pr-8"
                  : "border-t border-border py-5 sm:border-t-0 sm:border-l sm:py-6 sm:pr-8 sm:pl-8"
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
