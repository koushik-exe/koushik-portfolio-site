import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostArticle } from "@/components/blog/post-article";
import { Button } from "@/components/ui/button";
import { renderMdx } from "@/lib/blog/render-mdx";
import { getAdminPost } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Preview post | Admin",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function PreviewPostPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const post = await getAdminPost(id);
  if (!post) notFound();

  const body = await renderMdx(post.source, { animateCharts: false });

  return (
    <div>
      <div className="mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Draft preview
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This is how the post renders. Drafts are not public.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/posts/${post.id}/edit`}>Edit post</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/posts">Back to posts</Link>
          </Button>
        </div>
      </div>

      <PostArticle post={post}>{body}</PostArticle>
    </div>
  );
}
