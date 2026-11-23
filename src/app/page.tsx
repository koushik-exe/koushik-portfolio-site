import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <h1 className="max-w-4xl font-heading text-5xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-6xl lg:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl">
        {siteConfig.title}
      </p>
    </section>
  );
}
