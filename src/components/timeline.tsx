import type { ExperienceEntry } from "@/lib/profile";

/**
 * Timeline rows for the About and Experience pages (DESIGN 7.2): one row per
 * entry, newest first, with the date range in the margin, the title as an h3,
 * the organization line below it and optional bullets.
 */
export function Timeline({ entries }: { entries: readonly ExperienceEntry[] }) {
  return (
    <>
      {entries.map((entry) => (
        <div
          key={entry.title}
          className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-4 lg:grid-cols-12"
        >
          <p className="font-mono text-sm tabular-nums tracking-[0.14em] text-muted-foreground uppercase lg:col-span-3 lg:pt-1.5">
            {entry.dateRange}
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h3 className="font-heading text-2xl leading-[1.3] font-semibold text-foreground">
              {entry.title}
            </h3>
            {entry.organization ? (
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                {entry.organization}
              </p>
            ) : null}
            {entry.bullets ? (
              <ul className="mt-6 max-w-[62ch] list-none space-y-3 border-t border-border pt-6 text-base leading-relaxed text-muted-foreground">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-muted-foreground before:content-['']"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
