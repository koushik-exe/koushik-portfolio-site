import Link from "next/link";

import type { PostModel } from "@/generated/prisma/models";
import { formatPostDate } from "@/lib/blog/format";
import { readingTimeLabel } from "@/lib/blog/reading-time";

type PostArticleProps = {
  post: PostModel;
  children: React.ReactNode;
};

/**
 * DESIGN 16.1: title, date and reading time in the page header, then the body
 * in a single 62ch column on the spine's content column. The MDX component map
 * supplies the body typography.
 */
export function PostArticle({ post, children }: PostArticleProps) {
  const titleId = `post-title-${post.slug}`;

  return (
    <section
      aria-labelledby={titleId}
      id={`post-${post.slug}`}
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <article>
          <header className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
              <Link
                href="/blog"
                className="hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Blog
              </Link>
            </p>

            <div className="lg:col-span-8 lg:col-start-5">
              <h1
                id={titleId}
                className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
              >
                {post.title}
              </h1>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                {post.publishedAt ? (
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatPostDate(post.publishedAt)}
                  </time>
                ) : null}
                {post.publishedAt ? (
                  <span aria-hidden="true" className="h-3 w-px bg-border" />
                ) : null}
                <span>{readingTimeLabel(post.source)}</span>
              </div>

              {post.tags.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </header>

          <div className="mt-16 grid gap-x-8 lg:grid-cols-12">
            <div className="max-w-[62ch] lg:col-span-8 lg:col-start-5">
              {children}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
