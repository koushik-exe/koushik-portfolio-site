import type { Metadata } from "next";
import Link from "next/link";

import { PostForm } from "@/components/admin/post-form";

export const metadata: Metadata = {
  title: "New post | Admin",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/admin/posts"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
      >
        &larr; Posts
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        New post
      </h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
