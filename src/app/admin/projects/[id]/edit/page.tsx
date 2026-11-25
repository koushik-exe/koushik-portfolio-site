import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProject } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Edit project | Admin",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/admin/projects"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
      >
        &larr; Projects
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        Edit project
      </h1>
      <div className="mt-8">
        <ProjectForm
          initial={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            type: project.type,
            status: project.status,
            tools: project.tools,
            summary: project.summary,
            problem: project.problem,
            approach: project.approach,
            result: project.result,
            learned: project.learned,
            repository: project.repository,
            live: project.live,
            sortOrder: project.sortOrder,
            published: project.published,
            featured: project.featured,
          }}
        />
      </div>
    </div>
  );
}
