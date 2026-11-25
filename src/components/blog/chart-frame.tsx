import { slugifyHeading } from "@/lib/blog/heading-id";

/**
 * Stable, collision-resistant id for a chart's accessible name and summary.
 * A hash keeps two charts with the same finding title from sharing ids.
 */
export function chartDomId(title: string, summary: string): string {
  const value = `${title} ${summary}`;
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return `chart-${slugifyHeading(title)}-${Math.abs(hash).toString(36)}`;
}

type ChartFrameProps = {
  id: string;
  title: string;
  summary: string;
  source?: string;
  period?: string;
  children: React.ReactNode;
};

/**
 * DESIGN 13.2: the finding is the title, the one-sentence summary sits under
 * the chart, and the source and period use caption style.
 */
export function ChartFrame({
  id,
  title,
  summary,
  source,
  period,
  children,
}: ChartFrameProps) {
  const titleId = `${id}-title`;
  const summaryId = `${id}-summary`;
  const meta = [
    period ? `Period: ${period}` : null,
    source ? `Source: ${source}` : null,
  ].filter(Boolean);

  return (
    <figure
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      className="my-10"
    >
      <p
        id={titleId}
        className="font-heading text-xl leading-[1.3] font-semibold tracking-[-0.015em] text-balance text-foreground sm:text-2xl"
      >
        {title}
      </p>
      <div className="mt-4">{children}</div>
      <figcaption
        id={summaryId}
        className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground"
      >
        <p>{summary}</p>
        {meta.length > 0 ? (
          <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
            {meta.join(" · ")}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
