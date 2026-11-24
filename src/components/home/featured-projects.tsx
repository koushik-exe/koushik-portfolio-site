import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { featuredProjects } from "@/lib/projects";

const homeProjects = featuredProjects.filter((project) => project.home);

export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="projects-heading"
      id="work"
      className="mt-24 scroll-mt-24 border-t border-border sm:mt-32"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="01"
          label="Selected work"
          titleId="projects-heading"
          title="Projects I’ve built on my own"
          intro="Two personal projects, not client work: automation tools built on my own time."
        />

        <ol className="mt-12 border-b border-border">
          {homeProjects.map((project, index) => (
            <li
              key={project.slug}
              className="grid gap-x-8 gap-y-4 border-t border-border py-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase lg:flex-col">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <h3 className="font-heading text-2xl leading-[1.3] font-semibold text-foreground sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
                  {project.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-x-8 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <a
              href="https://github.com/koushik-exe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground transition-colors duration-200 outline-none hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              More on GitHub
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
