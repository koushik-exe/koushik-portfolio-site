import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/post-form";
import { Button } from "@/components/ui/button";
import { getAdminPost } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Edit post | Admin",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const post = await getAdminPost(id);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/posts"
          className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
        >
          &larr; Posts
        </Link>
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/posts/${post.id}/preview`}>Preview</Link>
        </Button>
      </div>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        Edit post
      </h1>
      <div className="mt-8">
        <PostForm
          initial={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            description: post.description,
            publishedAt: post.publishedAt,
            tags: post.tags,
            source: post.source,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
