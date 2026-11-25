"use server";

import { revalidatePath } from "next/cache";
import type { ZodError } from "zod";

import { requireAdmin } from "@/lib/admin";
import { validateMdx } from "@/lib/blog/validate-mdx";
import { prisma } from "@/lib/db";
import {
  dateOrNull,
  emptyToUndefined,
  parseCommaList,
  postSchema,
  projectSchema,
  testimonialSchema,
} from "@/lib/schemas/admin";

/**
 * Phase 7 admin mutations. Every action re-checks the session with
 * `requireAdmin()` before touching data (proxy is only an optimistic gate),
 * validates with the shared Zod schema, and revalidates the affected public
 * pages.
 */

export type AdminActionResult =
  | { status: "saved"; message: string }
  | { status: "deleted"; message: string }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "error"; message: string };

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function check(formData: FormData, key: string): boolean {
  return formData.get(key) === "true";
}

function idFrom(formData: FormData): number | null {
  const raw = text(formData, "id");
  if (raw === "") return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function fieldErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key !== "" && errors[key] === undefined) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

/* Projects ---------------------------------------------------------------- */

function projectData(formData: FormData) {
  return {
    title: text(formData, "title"),
    slug: text(formData, "slug").toLowerCase(),
    type: text(formData, "type"),
    status: text(formData, "status"),
    tools: text(formData, "tools"),
    summary: text(formData, "summary"),
    problem: text(formData, "problem"),
    approach: text(formData, "approach"),
    result: text(formData, "result"),
    learned: text(formData, "learned"),
    repository: text(formData, "repository"),
    live: text(formData, "live"),
    sortOrder: Number(text(formData, "sortOrder") || "0"),
    published: check(formData, "published"),
    featured: check(formData, "featured"),
  };
}

function validateProject(formData: FormData) {
  return projectSchema.safeParse(projectData(formData));
}

export async function saveProject(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = validateProject(formData);
  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error) };
  }
  const values = parsed.data;
  const id = idFrom(formData);

  const record = {
    title: values.title,
    slug: values.slug,
    type: emptyToUndefined(values.type) ?? null,
    status: values.status,
    tools: parseCommaList(values.tools),
    summary: values.summary,
    problem: emptyToUndefined(values.problem) ?? null,
    approach: emptyToUndefined(values.approach) ?? null,
    result: values.result,
    learned: emptyToUndefined(values.learned) ?? null,
    repository: emptyToUndefined(values.repository) ?? null,
    live: emptyToUndefined(values.live) ?? null,
    sortOrder: values.sortOrder,
    published: values.published,
    featured: values.featured,
  };

  try {
    if (id === null) {
      await prisma.project.create({ data: record });
    } else {
      const previous = await prisma.project.findUnique({ where: { id } });
      await prisma.project.update({ where: { id }, data: record });
      if (previous && previous.slug !== record.slug) {
        revalidatePath(`/projects/${previous.slug}`);
      }
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: "invalid",
        errors: { slug: "That slug is already used by another project." },
      };
    }
    return { status: "error", message: GENERIC_ERROR };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${record.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/projects");
  return { status: "saved", message: "Project saved." };
}

export async function deleteProject(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = idFrom(formData);
  if (id === null) {
    return { status: "error", message: "Project not found." };
  }
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return { status: "error", message: "Project not found." };
    }
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/projects");
    return { status: "deleted", message: "Project deleted." };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}

/* Posts ------------------------------------------------------------------- */

function postData(formData: FormData) {
  return {
    title: text(formData, "title"),
    slug: text(formData, "slug").toLowerCase(),
    description: text(formData, "description"),
    publishedAt: text(formData, "publishedAt"),
    tags: text(formData, "tags"),
    source: text(formData, "source"),
    published: check(formData, "published"),
  };
}

function validatePost(formData: FormData) {
  return postSchema.safeParse(postData(formData));
}

export async function savePost(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = validatePost(formData);
  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error) };
  }
  const values = parsed.data;

  try {
    await validateMdx(values.source);
  } catch (error) {
    const detail =
      error instanceof Error && error.message.trim() !== ""
        ? error.message.split("\n")[0].trim()
        : "The MDX could not be rendered.";
    return {
      status: "invalid",
      errors: {
        source:
          detail.length > 300 ? `${detail.slice(0, 297)}...` : detail,
      },
    };
  }

  const id = idFrom(formData);
  const publishedAt = dateOrNull(values.publishedAt);

  const record = {
    title: values.title,
    slug: values.slug,
    description: values.description,
    publishedAt: values.published ? (publishedAt ?? new Date()) : publishedAt,
    tags: parseCommaList(values.tags),
    source: values.source,
    published: values.published,
  };

  try {
    if (id === null) {
      await prisma.post.create({ data: record });
    } else {
      const previous = await prisma.post.findUnique({ where: { id } });
      await prisma.post.update({ where: { id }, data: record });
      if (previous && previous.slug !== record.slug) {
        revalidatePath(`/blog/${previous.slug}`);
      }
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: "invalid",
        errors: { slug: "That slug is already used by another post." },
      };
    }
    return { status: "error", message: GENERIC_ERROR };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${record.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
  return { status: "saved", message: "Post saved." };
}

export async function deletePost(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = idFrom(formData);
  if (id === null) {
    return { status: "error", message: "Post not found." };
  }
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return { status: "error", message: "Post not found." };
    }
    await prisma.post.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/posts");
    return { status: "deleted", message: "Post deleted." };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}

/* Testimonials ------------------------------------------------------------ */

function testimonialData(formData: FormData) {
  return {
    quote: text(formData, "quote"),
    name: text(formData, "name"),
    consent: check(formData, "consent"),
    published: check(formData, "published"),
  };
}

export async function saveTestimonial(
  formData: FormData,
): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = testimonialSchema.safeParse(testimonialData(formData));
  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error) };
  }
  const id = idFrom(formData);

  try {
    if (id === null) {
      await prisma.testimonial.create({ data: parsed.data });
    } else {
      await prisma.testimonial.update({ where: { id }, data: parsed.data });
    }
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }

  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/sitemap.xml");
  // The public layout checks whether the testimonials nav entry should show.
  revalidatePath("/", "layout");
  return { status: "saved", message: "Testimonial saved." };
}

export async function deleteTestimonial(
  formData: FormData,
): Promise<AdminActionResult> {
  await requireAdmin();
  const id = idFrom(formData);
  if (id === null) {
    return { status: "error", message: "Testimonial not found." };
  }
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");
    // The public layout checks whether the testimonials nav entry should show.
    revalidatePath("/", "layout");
    return { status: "deleted", message: "Testimonial deleted." };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}

/* Messages ---------------------------------------------------------------- */

export async function setMessageRead(
  formData: FormData,
): Promise<AdminActionResult> {
  await requireAdmin();
  const id = idFrom(formData);
  if (id === null) {
    return { status: "error", message: "Message not found." };
  }
  const read = check(formData, "read");
  try {
    await prisma.message.update({ where: { id }, data: { read } });
    revalidatePath("/admin/messages");
    return { status: "saved", message: read ? "Marked as read." : "Marked as unread." };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}

/** Form wrapper so the messages page can pass a void Server Action directly. */
export async function toggleMessageRead(formData: FormData): Promise<void> {
  await setMessageRead(formData);
}

export async function deleteMessage(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = idFrom(formData);
  if (id === null) {
    return { status: "error", message: "Message not found." };
  }
  try {
    await prisma.message.delete({ where: { id } });
    revalidatePath("/admin/messages");
    return { status: "deleted", message: "Message deleted." };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}
