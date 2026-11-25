const postDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `publishedAt` is stored at UTC midnight; format it in UTC to avoid a day shift. */
export function formatPostDate(date: Date): string {
  return postDateFormatter.format(date);
}
