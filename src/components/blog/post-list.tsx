import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { PostModel } from "@/generated/prisma/models";
import { formatPostDate } from "@/lib/blog/format";
import { readingTimeLabel } from "@/lib/blog/reading-time";

function PostRow({ post, index }: { post: PostModel; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${post.title}. Read the post.`}
      className="grid gap-x-8 gap-y-4 border-t border-border py-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:grid-cols-12"
    >
      <div className="lg:col-span-3">
        <span className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
        {post.publishedAt ? (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="mt-2 block font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase"
          >
            {formatPostDate(post.publishedAt)}
          </time>
        ) : null}
        <span className="mt-1 block font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
          {readingTimeLabel(post.source)}
        </span>
        {post.tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="lg:col-span-8 lg:col-start-5">
        <h2 className="font-heading text-2xl leading-[1.3] font-semibold text-foreground sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
          {post.description}
        </p>
      </div>

      <div className="lg:col-span-1 lg:col-start-11 lg:flex lg:items-center">
        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-link" />
      </div>
    </Link>
  );
}

/** DESIGN 15.1 ruled rows, reused for the blog index. */
export function PostList({ posts }: { posts: readonly PostModel[] }) {
  if (posts.length === 0) {
    return (
      <div className="mt-12 border-t border-border pt-6">
        <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
          No posts published yet. The first write-up will appear here.
        </p>
      </div>
    );
  }

  return (
    <ol className="mt-12 border-b border-border">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <PostRow post={post} index={index + 1} />
        </li>
      ))}
    </ol>
  );
}
