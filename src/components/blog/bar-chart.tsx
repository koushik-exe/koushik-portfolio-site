import { axisTicks, niceMax } from "@/lib/blog/chart-scale";

import { BarDrawIn } from "./chart-draw-in";
import { ChartFrame, chartDomId } from "./chart-frame";

export type BarChartDatum = { label: string; value: number };

export type BarChartProps = {
  title: string;
  summary: string;
  data: BarChartDatum[];
  unit?: string;
  xLabel?: string;
  yLabel?: string;
  source?: string;
  period?: string;
  animate?: boolean;
};

/**
 * DESIGN 13.2: static, server-rendered bars. Bars start at zero, gridlines are
 * horizontal and use --border, and the accessible data lives in a hidden table
 * so the chart never relies on color alone.
 */
export function BarChart({
  title,
  summary,
  data,
  unit,
  xLabel,
  yLabel,
  source,
  period,
  animate = true,
}: BarChartProps) {
  const id = chartDomId(title, summary);
  const safeData: BarChartDatum[] = Array.isArray(data)
    ? data.filter(
        (datum): datum is BarChartDatum =>
          Boolean(datum) &&
          typeof datum.label === "string" &&
          typeof datum.value === "number" &&
          Number.isFinite(datum.value),
      )
    : [];
  const hasNegative = safeData.some((datum) => datum.value < 0);

  if (safeData.length === 0 || hasNegative) {
    return (
      <ChartFrame
        id={id}
        title={title}
        summary={summary}
        source={source}
        period={period}
      >
        <p className="border-y border-border py-6 text-sm text-muted-foreground">
          {hasNegative
            ? "This bar chart needs non-negative values."
            : "This chart has no data yet."}
        </p>
      </ChartFrame>
    );
  }

  const max = niceMax(Math.max(...safeData.map((datum) => datum.value), 0));
  const ticks = axisTicks(max);
  const valueHeader = `${yLabel ?? "Value"}${unit ? ` (${unit})` : ""}`;

  return (
    <ChartFrame
      id={id}
      title={title}
      summary={summary}
      source={source}
      period={period}
    >
      <div className="rounded-md border border-border p-4 sm:p-6">
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
          {valueHeader}
        </p>

        <div aria-hidden="true" className="mt-4">
          <div className="grid grid-cols-[3rem_1fr] gap-x-3">
            <div className="relative h-56">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-0 -translate-y-1/2 font-mono text-[0.6875rem] tabular-nums text-muted-foreground"
                  style={{ top: `${(1 - tick / max) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>

            <div className="relative h-56 border-b border-l border-border">
              {ticks.map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-x-0 border-t border-border"
                  style={{ bottom: `${(tick / max) * 100}%` }}
                />
              ))}
              <BarDrawIn
                enabled={animate}
                className="absolute inset-0 flex items-end gap-2 px-2"
              >
                {safeData.map((datum, index) => (
                  <div
                    key={`${datum.label}-${index}`}
                    className="relative h-full min-w-0 flex-1"
                  >
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-t-sm bg-chart-1"
                      style={{ height: `${(datum.value / max) * 100}%` }}
                    />
                  </div>
                ))}
              </BarDrawIn>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-[3rem_1fr] gap-x-3">
            <span />
            <div className="flex gap-2 px-2">
              {safeData.map((datum, index) => (
                <span
                  key={`${datum.label}-${index}`}
                  className="min-w-0 flex-1 text-center font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {datum.label}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            {xLabel ?? "Category"}
          </p>
        </div>

        <table className="sr-only">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">{xLabel ?? "Category"}</th>
              <th scope="col">{valueHeader}</th>
            </tr>
          </thead>
          <tbody>
            {safeData.map((datum, index) => (
              <tr key={`${datum.label}-${index}`}>
                <th scope="row">{datum.label}</th>
                <td>{datum.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
