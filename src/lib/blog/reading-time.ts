const WORDS_PER_MINUTE = 200;

/**
 * Approximate prose word count for reading time. Code blocks, JSX component
 * tags (and their props), image URLs and Markdown syntax are removed so chart
 * and table data do not inflate the estimate.
 */
export function countProseWords(source: string): number {
  const stripped = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[A-Za-z][^>]*\/>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[#>*_`|~]/g, " ")
    .trim();

  if (!stripped) return 0;
  return stripped.split(/\s+/).filter(Boolean).length;
}

/** Rounded up, never less than one minute. */
export function readingTimeMinutes(source: string): number {
  return Math.max(1, Math.ceil(countProseWords(source) / WORDS_PER_MINUTE));
}

export function readingTimeLabel(source: string): string {
  return `${readingTimeMinutes(source)} min read`;
}
