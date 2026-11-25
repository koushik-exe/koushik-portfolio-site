import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostArticle } from "@/components/blog/post-article";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { renderMdx } from "@/lib/blog/render-mdx";
import { getPostBySlug, getPublishedPostSlugs } from "@/lib/data/posts";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PageProps) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const body = await renderMdx(post.source);

  return (
    <>
      <ReadingProgress />
      <PostArticle post={post}>{body}</PostArticle>
    </>
  );
}
