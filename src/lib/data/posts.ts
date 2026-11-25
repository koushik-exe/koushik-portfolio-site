import { prisma } from "@/lib/db";
import type { PostModel } from "@/generated/prisma/models";

/**
 * Phase 8: public blog reads. A post is public only when it is published and
 * has a publication date; drafts and undated rows never appear.
 */
export async function getPublishedPosts(): Promise<PostModel[]> {
  return prisma.post.findMany({
    where: { published: true, publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
  });
}

/** Slugs for `generateStaticParams`; same public filter as the index. */
export async function getPublishedPostSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { published: true, publishedAt: { not: null } },
    select: { slug: true },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map((post) => post.slug);
}

/** One public post by slug; drafts and undated rows return null. */
export async function getPostBySlug(slug: string): Promise<PostModel | null> {
  return prisma.post.findFirst({
    where: { slug, published: true, publishedAt: { not: null } },
  });
}
