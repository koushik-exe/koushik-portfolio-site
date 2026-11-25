import type { Metadata } from "next";
import Link from "next/link";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/admin";
import { getAdminPosts } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Posts | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <div className="mx-auto w-full max-w-content">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Published posts appear on the public blog.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">New post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          No posts yet. Create the first one when a write-up is ready.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border-t border-border">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <caption className="sr-only">All posts</caption>
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Post
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Visibility
                </th>
                <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Published date
                </th>
                <th scope="col" className="py-2 text-right font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border align-top">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-foreground">{post.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge on={post.published} />
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {post.publishedAt
                      ? post.publishedAt.toISOString().slice(0, 10)
                      : "Not set"}
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/posts/${post.id}/preview`}>
                          Preview
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteDialog
                        id={post.id}
                        itemLabel="post"
                        itemName={post.title}
                        action={deletePost}
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
