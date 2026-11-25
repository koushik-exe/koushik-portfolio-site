import type {
  MessageModel,
  PostModel,
  ProjectModel,
  TestimonialModel,
} from "@/generated/prisma/models";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

/**
 * Phase 7: server-only admin reads. Every function calls `requireAdmin()`
 * itself — proxy route protection is never the only gate.
 */

export async function getAdminProjects(): Promise<ProjectModel[]> {
  await requireAdmin();
  return prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAdminProject(id: number): Promise<ProjectModel | null> {
  await requireAdmin();
  return prisma.project.findUnique({ where: { id } });
}

export async function getAdminPosts(): Promise<PostModel[]> {
  await requireAdmin();
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminPost(id: number): Promise<PostModel | null> {
  await requireAdmin();
  return prisma.post.findUnique({ where: { id } });
}

export async function getAdminTestimonials(): Promise<TestimonialModel[]> {
  await requireAdmin();
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAdminTestimonial(
  id: number,
): Promise<TestimonialModel | null> {
  await requireAdmin();
  return prisma.testimonial.findUnique({ where: { id } });
}

export async function getAdminMessages(): Promise<MessageModel[]> {
  await requireAdmin();
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

/** Count of unread messages for the admin navigation badge. */
export async function getUnreadMessageCount(): Promise<number> {
  await requireAdmin();
  return prisma.message.count({ where: { read: false } });
}
