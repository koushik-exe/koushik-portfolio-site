export function StatusBadge({
  on,
  onLabel = "Published",
  offLabel = "Draft",
}: {
  on: boolean;
  onLabel?: string;
  offLabel?: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
        on
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {on ? onLabel : offLabel}
    </span>
  );
}
