import { cn } from "@/lib/utils";

export type DataTableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type DataTableProps = {
  caption: string;
  columns: DataTableColumn[];
  rows: Array<Record<string, string | number>>;
  source?: string;
  note?: string;
  compact?: boolean;
};

/**
 * DESIGN 13.1: a real table with a caption, mono right-aligned numbers,
 * hairline row rules, a muted header fill, and a focusable scroll wrapper.
 * `note` is the plain-words label for sample or synthetic data.
 */
export function DataTable({
  caption,
  columns,
  rows,
  source,
  note,
  compact = false,
}: DataTableProps) {
  const safeColumns = Array.isArray(columns)
    ? columns.filter(
        (column) =>
          column &&
          typeof column.key === "string" &&
          typeof column.label === "string",
      )
    : [];
  const safeRows = Array.isArray(rows) ? rows.filter(Boolean) : [];

  if (safeColumns.length === 0) {
    return (
      <p className="my-8 border-t border-border pt-4 text-sm text-muted-foreground">
        This table has no columns.
      </p>
    );
  }

  return (
    <figure className="my-8">
      {note ? (
        <p className="mb-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
          {note}
        </p>
      ) : null}
      <div
        tabIndex={0}
        role="region"
        aria-label={caption}
        className="overflow-x-auto border-y border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <table className="w-full border-collapse text-left text-sm">
          <caption className="px-4 pt-3 pb-3 text-left text-[0.8125rem] leading-normal font-normal text-muted-foreground">
            {caption}
          </caption>
          <thead className="bg-muted">
            <tr>
              {safeColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "border-b border-border px-4 py-3 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase",
                    column.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border first:border-t-0">
                {safeColumns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 text-foreground",
                      compact ? "py-2" : "py-3",
                      column.align === "right"
                        ? "text-right font-mono tabular-nums"
                        : "text-left",
                    )}
                  >
                    {row[column.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source ? (
        <figcaption className="mt-3 text-[0.8125rem] leading-normal text-muted-foreground">
          Source: {source}
        </figcaption>
      ) : null}
    </figure>
  );
}
