"use client";

import { useState } from "react";

import type { ProjectModel } from "@/generated/prisma/models";
import { ProjectFilterBar } from "@/components/projects/filter-bar";
import { ProjectRow } from "@/components/projects/project-row";

export function ProjectList({ projects }: { projects: readonly ProjectModel[] }) {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [...new Set(projects.flatMap((project) => project.tools))];
  const isHidden = (project: ProjectModel) =>
    activeTool !== null && !project.tools.includes(activeTool);

  return (
    <>
      <ProjectFilterBar
        tools={tools}
        projectsCount={projects.length}
        activeTool={activeTool}
        visibleCount={projects.filter((p) => !isHidden(p)).length}
        onChange={setActiveTool}
      />
      <ol className="mt-12 border-b border-border">
        {projects.map((project, index) => (
          <li key={project.slug} hidden={isHidden(project)}>
            <ProjectRow project={project} index={index + 1} />
          </li>
        ))}
      </ol>
    </>
  );
}
