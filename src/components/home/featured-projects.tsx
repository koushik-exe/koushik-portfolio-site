import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { featuredProjects } from "@/lib/projects";

export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="projects-heading"
      id="work"
      className="mt-24 scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="01"
          label="Selected work"
          titleId="projects-heading"
          title="Projects I’ve built on my own"
          intro="These are personal projects, not client work. Each one has its own page with what it does, the tools I used and what I learned."
        />

        <ol className="mt-12 border-b border-border">
          {featuredProjects.map((project, index) => (
            <li key={project.slug} className="border-t border-border">
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View project: ${project.title}`}
                className="group grid gap-x-8 gap-y-4 rounded-sm py-8 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:grid-cols-12 lg:py-10"
              >
                <div className="lg:col-span-3">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase lg:flex-col lg:gap-y-1">
                    {project.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-6 lg:col-start-5">
                  <h3 className="font-heading text-2xl leading-tight font-semibold text-foreground decoration-1 underline-offset-4 group-hover:underline sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
                    {project.summary}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground lg:col-span-2 lg:col-start-11 lg:justify-self-end">
                  View project
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-x-8 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-foreground transition-colors duration-200 outline-none hover:text-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              All projects
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
