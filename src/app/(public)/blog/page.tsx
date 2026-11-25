import { PostList } from "@/components/blog/post-list";
import { Reveal } from "@/components/motion/reveal";
import { getPublishedPosts } from "@/lib/data/posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Notes by Koushik C on SQL, Excel, Python and data analysis, with practical lessons from personal automation projects and analyst work.",
  path: "/blog",
});

export const revalidate = 300;

export default async function Blog() {
  const posts = await getPublishedPosts();

  return (
    <section
      aria-labelledby="blog-heading"
      id="blog"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <header className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Blog
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="blog-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              Blog
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              Notes on SQL, Excel, Python and data analysis.
            </p>
          </div>
        </header>

        <Reveal>
          <PostList posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}
