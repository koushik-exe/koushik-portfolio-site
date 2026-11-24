import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";

type ProjectRowProps = {
  project: Project;
  index: number;
};

/**
 * DESIGN 15.1 row: index number and tool tags in the margin, title and
 * summary in the content column, an arrow action at the far right.
 * The whole row is a link to the project detail page.
 */
export function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <a
      href={`/projects/${project.slug}`}
      aria-label={`${project.title}. View the project page.`}
      className="grid gap-x-8 gap-y-4 border-t border-border py-6 lg:grid-cols-12 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="lg:col-span-3">
        <span className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
          {String(index).padStart(2, "0")}
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
      <div className="lg:col-span-1 lg:col-start-11 lg:flex items-center">
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-link"
        />
      </div>
    </a>
  );
}
