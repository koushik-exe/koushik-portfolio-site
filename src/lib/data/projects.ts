import { prisma } from "@/lib/db";
import type { ProjectModel } from "@/generated/prisma/models";

/**
 * Phase 6: server-only read functions over the `Project` table. Public pages
 * read published rows only.
 */
export async function getPublishedProjects(): Promise<ProjectModel[]> {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

/**
 * Phase 6: featured projects for the home page — published + featured rows,
 * `sortOrder` ascending (the home page shows featured rows in the same order).
 */
export async function getFeaturedProjects(): Promise<ProjectModel[]> {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { sortOrder: "asc" },
  });
}

/** Phase 6: one project by slug; public pages read published rows only. */
export async function getProjectBySlug(slug: string): Promise<ProjectModel | null> {
  return prisma.project.findFirst({ where: { slug, published: true } });
}
