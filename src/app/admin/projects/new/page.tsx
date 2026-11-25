import type { Metadata } from "next";
import Link from "next/link";

import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = {
  title: "New project | Admin",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/admin/projects"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
      >
        &larr; Projects
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        New project
      </h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
