type SectionHeadingProps = {
  index: string;
  label: string;
  titleId: string;
  title: string;
  intro?: string;
};

/**
 * Shared section opener: a numbered margin note on the left third of the
 * grid, the heading and optional intro starting on column five.
 */
export function SectionHeading({
  index,
  label,
  titleId,
  title,
  intro,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
      <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
        <span className="tabular-nums text-foreground">{index}</span>
        <span aria-hidden="true" className="px-1.5 text-border">
          /
        </span>
        {label}
      </p>

      <div className="lg:col-span-8 lg:col-start-5">
        <h2
          id={titleId}
          className="font-heading text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance text-foreground sm:text-4xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
            {intro}
          </p>
        ) : null}
      </div>
    </div>
  );
}
