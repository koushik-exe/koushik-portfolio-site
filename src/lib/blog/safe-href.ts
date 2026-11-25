/**
 * Phase 10: only same-page, root-relative and http(s) links are allowed in
 * MDX. `mailto:` and `tel:` are rejected so a post can never publish a
 * personal email or phone number.
 */
export function safeHref(href?: string): string | null {
  if (!href) return null;
  const value = href.trim();

  if (value.startsWith("/") || value.startsWith("#")) {
    return value;
  }

  return /^https?:\/\//i.test(value) ? value : null;
}
