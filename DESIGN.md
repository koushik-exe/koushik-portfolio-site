# Design System — Koushik C Portfolio

Source of truth for every later phase. Change a value here and in `src/app/globals.css`
together; never introduce a one-off color, font, radius or spacing value in a component.

## 1. Direction

**Quiet editorial / Swiss-minimal.** Warm paper, near-black ink, deep navy, one signal
blue, hairline rules, generous whitespace and a serif/sans/mono type system. It should
read like a well-made business report or a good annual review — credible to a recruiter,
clearly not a template, never flashy.

Audience: recruiters and hiring managers for entry-level Data Analyst, Business Analyst
and MIS Analyst roles. Success is "this person is careful, credible and technically
literate", not "this person is a designer".

**Anti-goals:** gradients, glassmorphism, neon, 3D, giant decorative type, colored
section backgrounds, card grids with drop shadows, emoji as icons, autoplaying motion,
dashboards-as-decoration. No dark patterns, no invented metrics.

## 2. Color tokens

All raw values live in `src/app/globals.css` as primitives (`--paper-*`, `--ink-*`,
`--navy-*`, `--blue-*`, `--night-*`, `--slate-*`, `--red-*`, `--teal-*`, `--ochre-*`,
`--violet-*`, `--gray-*`). Components only consume the semantic tokens below through
Tailwind utilities (`bg-background`, `text-muted-foreground`, `border-border`,
`text-link`, `ring-ring`, …).

### Light theme (`:root`)

| Token | Hex | Used for |
|---|---|---|
| `--background` | `#FAFAF7` | page paper |
| `--foreground` | `#17191E` | primary text |
| `--card` | `#FFFFFF` | raised surfaces |
| `--card-foreground` | `#17191E` | text on cards |
| `--popover` | `#FFFFFF` | menus, sheets |
| `--popover-foreground` | `#17191E` | text in overlays |
| `--primary` | `#13213C` | solid buttons, strong brand surfaces |
| `--primary-foreground` | `#FAFAF7` | text on primary |
| `--secondary` | `#EDECE6` | secondary buttons, quiet fills |
| `--secondary-foreground` | `#17191E` | text on secondary |
| `--muted` | `#F0EFE9` | hover fills, quiet blocks |
| `--muted-foreground` | `#565A63` | secondary text (6.2:1 on paper) |
| `--accent` | `#E7EBF3` | selected/hover accent fill |
| `--accent-foreground` | `#13213C` | text on accent |
| `--destructive` | `#B42318` | errors only |
| `--border` | `#E2E0D8` | hairlines |
| `--input` | `#8F8A7E` | input borders (3.3:1 on paper) |
| `--ring` | `#1D4ED8` | focus ring |
| `--link` | `#1D4ED8` | inline links (6.4:1 on paper) |
| `--link-hover` | `#163FA8` | link hover |
| `--overlay` | `rgb(13 16 22 / 0.35)` | sheet/dialog scrim |
| `--chart-1…5` | `#13213C`, `#1D4ED8`, `#0E7490`, `#A16207`, `#6B7280` | data viz order |

### Dark theme (`.dark`)

| Token | Hex | Used for |
|---|---|---|
| `--background` | `#0D1016` | page night surface |
| `--foreground` | `#ECEDEF` | primary text |
| `--card` | `#12161E` | raised surfaces |
| `--card-foreground` | `#ECEDEF` | text on cards |
| `--popover` | `#12161E` | menus, sheets |
| `--popover-foreground` | `#ECEDEF` | text in overlays |
| `--primary` | `#ECEDEF` | solid buttons, strong brand surfaces |
| `--primary-foreground` | `#0D1016` | text on primary |
| `--secondary` | `#1A1F29` | secondary buttons, quiet fills |
| `--secondary-foreground` | `#ECEDEF` | text on secondary |
| `--muted` | `#171C25` | hover fills, quiet blocks |
| `--muted-foreground` | `#A3A9B5` | secondary text (8.1:1 on night) |
| `--accent` | `#1B2230` | selected/hover accent fill |
| `--accent-foreground` | `#ECEDEF` | text on accent |
| `--destructive` | `#F97066` | errors only |
| `--border` | `#242A35` | hairlines |
| `--input` | `#5F6B7C` | input borders (3.5:1 on night) |
| `--ring` | `#9DBBFF` | focus ring |
| `--link` | `#9DBBFF` | inline links |
| `--link-hover` | `#C2D4FF` | link hover |
| `--overlay` | `rgb(0 0 0 / 0.6)` | sheet/dialog scrim |
| `--chart-1…5` | `#9DBBFF`, `#5EEAD4`, `#F5C97B`, `#C4B5FD`, `#94A3B8` | data viz order |

Rules: no hex in components; no `text-white`/`bg-black` (use `foreground`/`background`
or the `overlay` token); no opacity hacks on text to fake a muted color; test both themes
before shipping a section.

## 3. Typography

Loaded with `next/font/google` and self-hosted by Next. Variables are set on `<html>`.

| Role | Family | Token | Usage |
|---|---|---|---|
| Headings & wordmark | Source Serif 4 | `font-heading` | h1–h3, site name, editorial pull quotes |
| Body & UI | Inter | `font-sans` | paragraphs, nav, buttons, forms |
| Labels & numerals | JetBrains Mono | `font-mono` | eyebrows, dates, tags, metrics, table headers |

Scale (desktop → mobile):

- **Display / h1:** 72 → 48px, weight 600, line-height 1.05, tracking −0.02em.
- **h2:** 40 → 32px, weight 600, line-height 1.15, tracking −0.015em.
- **h3:** 24 → 20px, weight 600, line-height 1.3.
- **Body:** 18 → 16px, weight 400, line-height 1.65. Measure 60–70 characters.
- **UI:** 14px, weight 500. Nav, buttons, footer.
- **Label:** 11px mono, uppercase, tracking 0.16em. Never use it for a full sentence.
- **Numbers:** mono with `tabular-nums` in tables and metrics.

Never use more than three families. Do not fake bold, italic or small caps. Do not center
body copy. Serif is for headings, not for long body text.

## 4. Layout, spacing, radius

- **Base unit:** 4px. Use the Tailwind 4/8/12/16/24/32/48/64/96 scale; no arbitrary
  spacing unless a layout truly needs it.
- **Container:** 1200px (`max-w-content`), centered. Gutters: 20px mobile, 32px ≥640px,
  48px ≥1024px.
- **Header:** 64px mobile, 72px desktop; sticky with an 80% background and backdrop blur;
  1px bottom border.
- **Sections:** 96px vertical padding mobile, 128px ≥640px, 160px ≥1024px. Home hero may
  use the large end; inner pages use the middle.
- **Grid:** 12 columns from `md`; content blocks should start and end on column lines.
- **Radius:** 6px (`--radius`). Small controls 4–6px, cards 6px, overlays 6px. No pills
  except tags/badges, and no fully-round buttons.
- **Borders:** 1px hairline. Separation comes from space and rules, not shadows.
- **Shadows:** only for overlays (sheet, menu). Never on cards, buttons or the header.
- **Images:** full-bleed inside their column, 1px border, no rounded corners larger than
  6px, no decorative frames.

## 5. Motion

- **Durations:** 150ms hover/press, 200ms color/border, 250–300ms entrance.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; ease-out for color changes.
- **Lenis:** `autoRaf`, smooth wheel, anchors handled natively. Do not instantiate it at
  all when `prefers-reduced-motion: reduce` is set; start/stop if the OS setting changes.
- **Reduced motion:** every transition and animation must collapse; GSAP/Motion timelines
  must render their final state without animating.
- **Allowed now:** hover/focus color changes, 1px underline, sheet slide/fade.
- **Later:** small opacity/8–16px rise reveals, 300–400ms, once per viewport entry, never
  on content needed for SEO. No parallax, pinning, scroll-jacking, looping backgrounds or
  custom cursors unless a later phase explicitly asks.

## 6. Component conventions

- **Nav link:** 14px/500 Inter, muted by default, foreground on hover and when current;
  current item gets a 1px foreground underline inset from the text. 44px hit height.
- **Focus:** visible 2px ring in `--ring` with 2px offset on every link, button, input and
  summary. Never remove a focus indicator; never animate the ring.
- **Theme toggle:** icon-only ghost button, 44px through tablet / 36px desktop, accessible
  label describes the action ("Switch to dark theme").
- **Mobile menu:** shadcn Sheet from the right, 85% width (max 320px), serif title,
  hairline-separated 48px rows, focus trapped, Escape closes.
- **Footer:** 1px top border, 14px muted text, plain text links with a small external
  arrow, 44px hit height. No email or phone.
- **Icons:** lucide-react only, 16px beside text, always `aria-hidden` when decorative.
  No brand logos drawn by hand and no emoji.
- **Copy:** sentence case, no exclamation marks, no superlatives, no invented numbers.
  Say "entry-level" honestly.
