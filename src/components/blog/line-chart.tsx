import { axisTicks, linePath, niceMax, scaleY } from "@/lib/blog/chart-scale";

import { LineDrawIn } from "./chart-draw-in";
import { ChartFrame, chartDomId } from "./chart-frame";

export type LineChartSeries = { name: string; values: number[] };

export type LineChartProps = {
  title: string;
  summary: string;
  labels: string[];
  series: LineChartSeries[];
  unit?: string;
  xLabel?: string;
  yLabel?: string;
  source?: string;
  period?: string;
  animate?: boolean;
};

const WIDTH = 640;
const HEIGHT = 340;
const MARGIN = { top: 16, right: 16, bottom: 40, left: 48 };
const PLOT_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

const SERIES_CLASSES = ["text-chart-1", "text-chart-2", "text-chart-3"] as const;
const SERIES_DASHES = [undefined, "6 4", "2 3"] as const;

function Marker({
  shape,
  x,
  y,
}: {
  shape: number;
  x: number;
  y: number;
}) {
  if (shape === 1) {
    return <rect x={x - 4} y={y - 4} width={8} height={8} fill="currentColor" />;
  }
  if (shape === 2) {
    return (
      <polygon
        points={`${x},${y - 5} ${x - 5},${y + 4} ${x + 5},${y + 4}`}
        fill="currentColor"
      />
    );
  }
  return <circle cx={x} cy={y} r={4} fill="currentColor" />;
}

/**
 * DESIGN 13.2: static, server-rendered lines with one to three series. Each
 * series has a different line dash and marker shape, so the chart is readable
 * without color. The full data is repeated in a hidden table.
 */
export function LineChart({
  title,
  summary,
  labels,
  series,
  unit,
  xLabel,
  yLabel,
  source,
  period,
  animate = true,
}: LineChartProps) {
  const id = chartDomId(title, summary);
  const safeLabels = Array.isArray(labels)
    ? labels.filter((label): label is string => typeof label === "string")
    : [];
  const safeSeries: LineChartSeries[] = Array.isArray(series)
    ? series
        .filter(
          (entry): entry is LineChartSeries =>
            Boolean(entry) &&
            typeof entry.name === "string" &&
            Array.isArray(entry.values) &&
            entry.values.length === safeLabels.length &&
            entry.values.every(
              (value) => typeof value === "number" && Number.isFinite(value),
            ),
        )
        .slice(0, 3)
    : [];

  if (safeLabels.length === 0 || safeSeries.length === 0) {
    return (
      <ChartFrame
        id={id}
        title={title}
        summary={summary}
        source={source}
        period={period}
      >
        <p className="border-y border-border py-6 text-sm text-muted-foreground">
          This chart has no data yet.
        </p>
      </ChartFrame>
    );
  }

  const max = niceMax(
    Math.max(...safeSeries.flatMap((entry) => entry.values), 0),
  );
  const ticks = axisTicks(max);
  const valueHeader = `${yLabel ?? "Value"}${unit ? ` (${unit})` : ""}`;
  const labelStep = Math.max(1, Math.ceil(safeLabels.length / 8));
  const xFor = (index: number) =>
    safeLabels.length === 1
      ? PLOT_WIDTH / 2
      : (index / (safeLabels.length - 1)) * PLOT_WIDTH;

  return (
    <ChartFrame
      id={id}
      title={title}
      summary={summary}
      source={source}
      period={period}
    >
      <div className="rounded-md border border-border p-4 sm:p-6">
        <ul
          aria-hidden="true"
          className="mb-4 flex flex-wrap gap-x-6 gap-y-2"
        >
          {safeSeries.map((entry, index) => (
            <li
              key={entry.name}
              className={`flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase ${SERIES_CLASSES[index]}`}
            >
              <svg
                viewBox="0 0 20 10"
                className="h-2.5 w-5"
                aria-hidden="true"
                focusable="false"
              >
                <line
                  x1="0"
                  x2="20"
                  y1="5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={SERIES_DASHES[index]}
                />
                <Marker shape={index} x={10} y={5} />
              </svg>
              <span className="text-muted-foreground">{entry.name}</span>
            </li>
          ))}
        </ul>

        <div
          tabIndex={0}
          role="region"
          aria-label={`${title} chart`}
          className="overflow-x-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            aria-hidden="true"
            focusable="false"
            className="h-auto w-full min-w-[40rem]"
          >
            <g transform={`translate(${MARGIN.left} ${MARGIN.top})`}>
              {ticks.map((tick) => {
                const y = scaleY(tick, max, PLOT_HEIGHT);
                return (
                  <g key={tick}>
                    <line
                      x1={0}
                      x2={PLOT_WIDTH}
                      y1={y}
                      y2={y}
                      className="text-border"
                      stroke="currentColor"
                      strokeWidth={1}
                    />
                    <text
                      x={-8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-muted-foreground font-mono text-[12px] tabular-nums"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              <LineDrawIn enabled={animate}>
                {safeSeries.map((entry, seriesIndex) => (
                  <g
                    key={entry.name}
                    className={SERIES_CLASSES[seriesIndex]}
                  >
                    <path
                      d={linePath(
                        entry.values,
                        PLOT_WIDTH,
                        PLOT_HEIGHT,
                        max,
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeDasharray={SERIES_DASHES[seriesIndex]}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {entry.values.map((value, index) => (
                      <Marker
                        key={index}
                        shape={seriesIndex}
                        x={xFor(index)}
                        y={scaleY(value, max, PLOT_HEIGHT)}
                      />
                    ))}
                  </g>
                ))}
              </LineDrawIn>

              {safeLabels.map((label, index) => {
                if (index % labelStep !== 0 && index !== safeLabels.length - 1) {
                  return null;
                }
                return (
                  <text
                    key={`${label}-${index}`}
                    x={xFor(index)}
                    y={PLOT_HEIGHT + 20}
                    textAnchor="middle"
                    className="fill-muted-foreground font-mono text-[12px]"
                  >
                    {label}
                  </text>
                );
              })}
            </g>

            {xLabel ? (
              <text
                x={MARGIN.left + PLOT_WIDTH / 2}
                y={HEIGHT - 4}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase"
              >
                {xLabel}
              </text>
            ) : null}
            <text
              transform={`translate(12 ${MARGIN.top + PLOT_HEIGHT / 2}) rotate(-90)`}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              {valueHeader}
            </text>
          </svg>
        </div>

        <table className="sr-only">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">{xLabel ?? "Period"}</th>
              {safeSeries.map((entry) => (
                <th key={entry.name} scope="col">
                  {entry.name}
                  {unit ? ` (${unit})` : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeLabels.map((label, index) => (
              <tr key={`${label}-${index}`}>
                <th scope="row">{label}</th>
                {safeSeries.map((entry) => (
                  <td key={entry.name}>{entry.values[index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartFrame>
  );
}
