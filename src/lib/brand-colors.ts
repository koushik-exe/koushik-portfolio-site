/**
 * Phase 10: literal light-theme token values.
 *
 * Satori (used by `ImageResponse`) cannot read CSS custom properties, so the
 * OG image and the no-JS theme-color fallback need the values as strings.
 * Keep these in sync with `:root` in `src/app/globals.css`.
 */
export const brandColors = {
  paper: "#fafaf7",
  paperMuted: "#f4f3ee",
  border: "#e2e0d8",
  ink: "#17191e",
  inkMuted: "#565a63",
  accent: "#1d4ed8",
  night: "#0d1016",
} as const;
