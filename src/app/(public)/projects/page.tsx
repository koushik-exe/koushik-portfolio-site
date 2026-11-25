import { ProjectList } from "@/components/projects/project-list";
import { getPublishedProjects } from "@/lib/data/projects";
import { projectsIntro } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Personal projects by Koushik C: FileFlow file automation, an n8n AI career platform, and the earlier portfolio site, with tools and lessons for each.",
  path: "/projects",
});

export default async function Projects() {
  const projects = await getPublishedProjects();
  return (
    <section
      aria-labelledby="projects-heading"
      id="projects"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Projects
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="projects-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              Projects
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              {projectsIntro}
            </p>
          </div>
        </header>
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
