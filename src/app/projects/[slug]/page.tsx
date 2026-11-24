import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findProject, projects } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const project = findProject(slug);
  if (!project) {
    return { title: "Page not found | Koushik C" };
  }
  return {
    title: `${project.title} | Koushik C`,
    description: project.summary,
  };
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-y-2 border-t border-border py-2 lg:grid-cols-3">
      <dt className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-base leading-relaxed text-foreground lg:col-start-2">
        {value}
      </dd>
    </div>
  );
}

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={className}>{children}</section>;
}

export default async function ProjectPage({ params }: PageProps) {
  const slug = (await params).slug;
  const project = findProject(slug);
  if (!project) {
    notFound();
  }

  const links = [project.links.repository, project.links.live].filter(
    (link): link is string => Boolean(link),
  );

  return (
    <section
      aria-labelledby={`project-title-${project.slug}`}
      id={`project-section-${project.slug}`}
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        {/* DESIGN 9.6 breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase"
        >
          <ol className="flex items-center gap-3">
            <li>
              <Link
                href="/projects"
                className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Projects
              </Link>
            </li>
            <li aria-current="page" className="text-foreground">
              {project.title}
            </li>
          </ol>
        </nav>

        <h1
          id={`project-title-${project.slug}`}
          className="mt-4 font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
        >
          {project.title}
        </h1>

        {/* DESIGN 15.2 meta row */}
        <dl className="mt-8">
          {project.type ? (
            <MetaRow label="Type" value={project.type} />
          ) : null}
          <MetaRow label="Status" value={project.status} />
          <MetaRow label="Tools" value={project.tools.join(", ")} />
          {links.length > 0 ? (
            <MetaRow
              label="Links"
              value={links
                .map((link) => {
                  const isLive = link === project.links.live;
                  const label = isLive ? "Live" : "Repository";
                  return `${label}: ${link}`;
                })
                .join(" ")}
            />
          ) : null}
        </dl>

        {/* DESIGN 15.2 body, in order: summary, problem, approach, tools, result, learned, links */}
        <Section className="mt-12 border-t border-border pt-6">
          <h2 id="summary" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
            Summary
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-foreground">
            {project.summary}
          </p>
        </Section>

        {project.problem ? (
          <Section className="mt-12 border-t border-border pt-6">
            <h2 id="problem" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
              Problem
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {project.problem}
            </p>
          </Section>
        ) : null}

        {project.approach ? (
          <Section className="mt-12 border-t border-border pt-6">
            <h2 id="approach" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
              Approach
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {project.approach}
            </p>
          </Section>
        ) : null}

        {project.tools.length > 0 ? (
          <Section className="mt-12 border-t border-border pt-6">
            <h2 id="tools" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
              Tools
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {project.tools.join(", ")}
            </p>
          </Section>
        ) : null}

        <Section className="mt-12 border-t border-border pt-6">
          <h2 id="result" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
            Result
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
            {project.result}
          </p>
        </Section>

        {project.learned ? (
          <Section className="mt-12 border-t border-border pt-6">
            <h2 id="learned" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
              What I learned
            </h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {project.learned}
            </p>
          </Section>
        ) : null}

        {links.length > 0 ? (
          <Section className="mt-12 border-t border-border pt-6">
            <h2 id="links" className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
              Links
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base text-muted-foreground">
              {project.links.repository ? (
                <li>
                  Repository:{" "}
                  <a
                    href={project.links.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link underline hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {project.links.repository}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ) : null}
              {project.links.live ? (
                <li>
                  Live:{" "}
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link underline hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {project.links.live}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ) : null}
            </ul>
          </Section>
        ) : null}
      </div>
    </section>
  );
}
