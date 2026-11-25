import type { Metadata } from "next";
import Link from "next/link";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions/admin";
import { getAdminProjects } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Projects | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="mx-auto w-full max-w-content">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Published projects appear on the public site.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          No projects yet. Create the first one to fill the public projects
          page.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border-t border-border">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <caption className="sr-only">All projects</caption>
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Project
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Visibility
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Order
                </th>
                <th scope="col" className="py-2 text-right font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border align-top">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-foreground">{project.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      /projects/{project.slug}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge on={project.published} />
                      {project.featured ? (
                        <StatusBadge on onLabel="Featured" />
                      ) : null}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {project.sortOrder}
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <DeleteDialog
                        id={project.id}
                        itemLabel="project"
                        itemName={project.title}
                        action={deleteProject}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
