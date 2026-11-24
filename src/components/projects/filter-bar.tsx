import { cn } from "@/lib/utils";

type ProjectFilterBarProps = {
  /** Distinct tool names across all projects, in first-seen order. */
  tools: readonly string[];
  /** How many projects exist in the index. */
  projectsCount: number;
  /** The tool that is active, or null for all projects. */
  activeTool: string | null;
  /** How many rows are visible under the active filter. */
  visibleCount: number;
  onChange: (tool: string | null) => void;
};

/**
 * DESIGN 7.8 filter bar for the Projects index: one row of text buttons
 * above the list, active item underlined, `aria-pressed` announces it.
 * Rendered only when the index has 6 or more projects.
 */
export function ProjectFilterBar({
  tools,
  projectsCount,
  activeTool,
  visibleCount,
  onChange,
}: ProjectFilterBarProps) {
  if (tools.length === 0 || projectsCount < 6) {
    return null;
  }

  const buttonClasses = (active: boolean) =>
    cn(
      "min-h-11 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase",
      active
        ? "text-foreground underline underline-offset-2"
        : "hover:text-foreground",
    );

  return (
    <div
      className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
      role="group"
      aria-label="Filter projects"
    >
      <button
        type="button"
        aria-pressed={activeTool === null}
        className={buttonClasses(activeTool === null)}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {tools.map((tool) => (
        <button
          key={tool}
          type="button"
          aria-pressed={activeTool === tool}
          className={buttonClasses(activeTool === tool)}
          onClick={() => onChange(tool)}
        >
          {tool}
        </button>
      ))}
      <span className="font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
        {visibleCount} projects
      </span>
    </div>
  );
}
