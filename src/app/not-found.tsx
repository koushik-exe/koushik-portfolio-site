import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh items-center justify-center">
      <div className="mx-auto max-w-[62ch] text-center">
        <h1 className="font-heading text-5xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground">
          That page does not exist.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
          <Link
            href="/"
            className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase underline underline-offset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase underline underline-offset-2 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
