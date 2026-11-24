# Design System: Koushik C Portfolio

Source of truth for every phase of the build. If this file and the code disagree, stop and
ask which one is right before changing either. Change a value here and in
`src/app/globals.css` together. Never introduce a one-off color, font, radius, spacing or
motion value inside a component.

Version: 2.3
Status: Phase 1 and Phase 2 built. Phases 3 to 10 follow these rules.
Owner: Koushik C. Edit this file by hand in VS Code and save it as UTF-8.

---

## 0. How to use this file

### 0.1 For the developer (Koushik)

- Read section 1 and section 2 before judging any design the agent produces.
- When a design looks wrong, find the rule here that it breaks, then quote that rule back to
  the agent. Quoting a rule works better than describing a feeling.
- When you want a visual change, change this file first, then ask the agent to bring the code
  in line. Never let the code drift ahead of this file.
- Commit this file together with the code that implements it.

### 0.2 For the coding agent

- Read this whole file at the start of every phase, together with `AGENTS.md` and
  `PROFILE.md`.
- Use only the tokens, sizes, patterns and components defined here.
- When a design skill (ui-ux-pro-max, ui-styling, web-design-guidelines and others) suggests
  something that conflicts with this file, this file wins. Say which suggestion you rejected
  and why.
- When something is not defined here, do not invent it silently. Propose a rule, show it in
  words, and wait for approval. Then add it to this file.
- The developer cannot see screenshots. After building anything visual, describe the result
  in plain words at 375px and 1280px so it can be compared with the browser.

### 0.3 File map

| File | Role |
|---|---|
| `AGENTS.md` | Project rules, stack, workflow, phases |
| `PROFILE.md` | Facts and content. The only source for copy |
| `DESIGN.md` | This file. Visual and interaction rules |
| `src/app/globals.css` | Raw color values and semantic tokens |
| `src/lib/site.ts` | Site name, role, navigation, social links |
| `src/lib/fonts.ts` | Font definitions |
| `src/components/ui/` | shadcn components, aligned to these tokens |

### 0.4 Order of authority

1. Safety and honesty rules in `AGENTS.md` and `PROFILE.md`
2. This file
3. Design skills and their suggestions
4. Library defaults (shadcn, Tailwind)

---

## 1. Direction

**Quiet editorial, Swiss-minimal.** Warm paper, near-black ink, deep navy, one signal blue,
hairline rules, generous whitespace and a serif, sans and mono type system. It should read
like a well-made business report or a good annual review: credible to a recruiter, clearly
not a template, never flashy.

### 1.1 Audience

- Recruiters and hiring managers for entry-level Data Analyst, Business Analyst and MIS
  Analyst roles.
- They skim. They often read on a laptop in a bright office or on a phone between calls.
- They look for four things in the first ten seconds: who this is, what role they want,
  where they are based, and whether there is proof of skill.
- Success is "this person is careful, credible and technically literate". It is not "this
  person is a designer".

### 1.2 Personality

| Is | Is not |
|---|---|
| Calm | Loud |
| Precise | Decorative |
| Plain-spoken | Marketing-speak |
| Structured | Cluttered |
| Honest about being entry-level | Overselling |
| Technical in substance | Technical in costume |

### 1.3 Anti-goals

Do not use any of the following anywhere on the site:

- Gradients of any kind, including gradient text and gradient borders
- Glassmorphism, frosted panels, translucent cards
- Neon colors, glow effects, colored shadows
- 3D scenes, tilt effects, parallax, floating objects
- Giant decorative type or outline type
- Colored section backgrounds that fight the paper surface
- Card grids with drop shadows
- Emoji used as icons or bullets
- Autoplaying or looping motion
- Dashboards used as decoration, such as fake charts with no data behind them
- Dark patterns, fake urgency, fake scarcity
- Invented metrics, invented testimonials, invented clients

The single exception to the glassmorphism ban is the sticky header, defined in section 12.1.

### 1.4 Design principles

1. **Content first.** The page exists to carry facts from `PROFILE.md`. Design serves those
   facts and never competes with them.
2. **Structure over decoration.** Rules, spacing and alignment create hierarchy. Boxes,
   shadows and color fills do not.
3. **One spine.** Every long page shares one grid so the eye can travel down a single
   margin. See section 5.4.
4. **Restraint is the signal.** One accent color, three type families, one radius, one rule
   weight. Every extra choice has to earn its place.
5. **Readable before beautiful.** Contrast, size and line length are checked before style.
6. **Honest by default.** Copy states what is true. Placeholders are marked as placeholders.
7. **Works without motion.** Every page is complete with animation off.
8. **Both themes are first-class.** Light is designed first, and dark is tuned to the same
   standard before a section ships.

### 1.5 Reference feel (in words)

Think of a printed annual report: a quiet cover, numbered sections, ruled tables, a serif for
headings and a plain sans for reading. Think of a data tool's documentation: small mono
labels, tabular numbers, exact alignment. Do not think of an agency landing page.

---

## 2. Color

All raw values live in `src/app/globals.css` as primitives (`--paper-*`, `--ink-*`,
`--navy-*`, `--blue-*`, `--night-*`, `--slate-*`, `--red-*`, `--teal-*`, `--ochre-*`,
`--violet-*`, `--gray-*`). Components consume only the semantic tokens below, through
Tailwind utilities such as `bg-background`, `text-muted-foreground`, `border-border`,
`text-link` and `ring-ring`.

### 2.1 Light theme (`:root`)

| Token | Hex | Used for |
|---|---|---|
| `--background` | `#FAFAF7` | page paper |
| `--foreground` | `#17191E` | primary text |
| `--card` | `#FFFFFF` | raised surfaces |
| `--card-foreground` | `#17191E` | text on cards |
| `--popover` | `#FFFFFF` | menus, sheets |
| `--popover-foreground` | `#17191E` | text in overlays |
| `--primary` | `#13213C` | solid buttons, strong brand surfaces |
| `--primary-hover` | `#1B2E52` | solid button hover |
| `--primary-foreground` | `#FAFAF7` | text on primary |
| `--secondary` | `#EDECE6` | secondary buttons, quiet fills |
| `--secondary-foreground` | `#17191E` | text on secondary |
| `--muted` | `#F0EFE9` | hover fills, quiet blocks |
| `--muted-foreground` | `#565A63` | secondary text |
| `--accent` | `#E7EBF3` | selected and hover accent fill |
| `--accent-foreground` | `#13213C` | text on accent |
| `--destructive` | `#B42318` | errors only |
| `--border` | `#E2E0D8` | hairlines |
| `--input` | `#8F8A7E` | input borders |
| `--ring` | `#1D4ED8` | focus ring |
| `--link` | `#1D4ED8` | inline links |
| `--link-hover` | `#163FA8` | link hover |
| `--overlay` | `rgb(13 16 22 / 0.35)` | sheet and dialog scrim |
| `--chart-1` | `#13213C` | data series 1 |
| `--chart-2` | `#1D4ED8` | data series 2 |
| `--chart-3` | `#0E7490` | data series 3 |
| `--chart-4` | `#A16207` | data series 4 |
| `--chart-5` | `#6B7280` | data series 5 |

### 2.2 Dark theme (`.dark`)

| Token | Hex | Used for |
|---|---|---|
| `--background` | `#0D1016` | page night surface |
| `--foreground` | `#ECEDEF` | primary text |
| `--card` | `#12161E` | raised surfaces |
| `--card-foreground` | `#ECEDEF` | text on cards |
| `--popover` | `#12161E` | menus, sheets |
| `--popover-foreground` | `#ECEDEF` | text in overlays |
| `--primary` | `#ECEDEF` | solid buttons, strong brand surfaces |
| `--primary-hover` | `#D8DBE0` | solid button hover |
| `--primary-foreground` | `#0D1016` | text on primary |
| `--secondary` | `#1A1F29` | secondary buttons, quiet fills |
| `--secondary-foreground` | `#ECEDEF` | text on secondary |
| `--muted` | `#171C25` | hover fills, quiet blocks |
| `--muted-foreground` | `#A3A9B5` | secondary text |
| `--accent` | `#1B2230` | selected and hover accent fill |
| `--accent-foreground` | `#ECEDEF` | text on accent |
| `--destructive` | `#F97066` | errors only |
| `--border` | `#242A35` | hairlines |
| `--input` | `#5F6B7C` | input borders |
| `--ring` | `#9DBBFF` | focus ring |
| `--link` | `#9DBBFF` | inline links |
| `--link-hover` | `#C2D4FF` | link hover |
| `--overlay` | `rgb(0 0 0 / 0.6)` | sheet and dialog scrim |
| `--chart-1` | `#9DBBFF` | data series 1 |
| `--chart-2` | `#5EEAD4` | data series 2 |
| `--chart-3` | `#F5C97B` | data series 3 |
| `--chart-4` | `#C4B5FD` | data series 4 |
| `--chart-5` | `#94A3B8` | data series 5 |

### 2.3 Proposed status tokens (not yet in `globals.css`)

Forms in Phase 5 and the admin area in Phase 7 need success and warning colors. Add these as
primitives and semantic tokens at the start of Phase 5, then remove the word "proposed" here.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--success` | `#0E7490` | `#5EEAD4` | confirmation text and icons |
| `--warning` | `#A16207` | `#F5C97B` | caution text and icons |

These reuse the existing teal and ochre values. Success is teal and not green on purpose, so
it stays inside the palette.

### 2.4 Contrast measurements

Ratios were calculated with the WCAG relative luminance formula. Targets: body text 4.5:1 or
higher, large text 3:1 or higher, interface boundaries 3:1 or higher.

| Pair | Light | Dark | Target | Result |
|---|---|---|---|---|
| foreground on background | 16.82 | 16.26 | 4.5 | pass |
| muted-foreground on background | 6.61 | 8.07 | 4.5 | pass |
| muted-foreground on card | 6.91 | 7.68 | 4.5 | pass |
| link on background | 6.41 | 9.96 | 4.5 | pass |
| link-hover on background | 8.69 | not measured | 4.5 | pass in light |
| primary-foreground on primary | 15.32 | 16.26 | 4.5 | pass |
| primary-foreground on primary-hover | 12.88 | 13.72 | 4.5 | pass |
| foreground on secondary | 14.86 | not measured | 4.5 | pass in light |
| accent-foreground on accent | 13.41 | not measured | 4.5 | pass in light |
| destructive on background | 6.29 | 6.83 | 4.5 | pass |
| input border on background | 3.29 | 3.52 | 3.0 | pass |
| ring on background | 6.41 | 9.96 | 3.0 | pass |
| success on background (proposed) | 5.12 | 12.87 | 4.5 | pass |
| warning on background (proposed) | 4.71 | 12.26 | 4.5 | pass |
| border on background | 1.26 | 1.32 | decorative | not for essential boundaries |

Notes:

- The earlier version of this file said muted text on paper was 6.2:1. The measured value is
  6.61:1. Use the table above.
- The hairline `--border` is decorative only. It separates sections but must never be the only
  thing that marks an input, a button or a focusable area. Inputs use `--input`.
- Re-measure after any hex change. Do not trust a ratio that is not in this table.

### 2.5 Color rules

1. No hex, `rgb()`, `hsl()` or named colors in components. Use semantic tokens only.
2. No `text-white`, `bg-black` or similar. Use `foreground`, `background` or `overlay`.
3. No opacity tricks on text to fake a muted color. Use `text-muted-foreground`.
4. Accent blue is for links, focus rings and very small emphasis. It is not a fill color for
   large areas.
5. Navy `--primary` is for solid buttons and strong brand surfaces only.
6. Color never carries meaning alone. Pair it with text, an icon or a pattern.
7. Check both themes before a section ships. A section is not done until both pass.
8. `--destructive` is for errors and destructive actions only. Never use it for emphasis.
9. Chart colors are used in order, `--chart-1` first. Do not skip or reorder them.
10. Do not introduce a new color to solve a problem. First check whether spacing, weight or
    a rule would solve it.

### 2.6 Surfaces and elevation

| Level | Light | Dark | Use |
|---|---|---|---|
| Page | `--background` | `--background` | default canvas |
| Raised | `--card` | `--card` | menus, sheets, rare callouts |
| Quiet fill | `--muted` | `--muted` | hover rows, table header fill |
| Selected | `--accent` | `--accent` | selected item, current filter |
| Overlay | `--popover` with `--overlay` scrim | same | sheet, dialog |

Most of the site sits on the page level. Separation comes from rules and space, not from
raised surfaces.

### 2.7 Theme behavior

- Default is the system setting. A visitor can override it with the toggle.
- The choice persists through `next-themes`.
- No flash of the wrong theme on load. The provider sets the class before paint.
- Both themes use the same layout, spacing and type. Only color tokens change.
- `color-scheme` is set so native controls, scrollbars and form fields follow the theme.
- The browser `theme-color` meta tag is added in Phase 10 through a tokenised approach.
  Do not hard-code a hex for it in a component.

### 2.8 Color rationale (evidence and limits)

Why this palette: a bright, low-saturation paper background, near-black ink, deep navy and a
single saturated blue used only in small areas. This follows research findings that brightness
and saturation affect emotion more than hue, that dark-on-light text reads better, that blue
schemes are rated most trustworthy on commercial sites, and that visitors judge visual appeal
within about 50 ms and credibility partly by looks.

Limits: the trust studies tested commercial sites, effects are modest, and meanings vary by
context and culture. Content and case studies matter more than color. Do not claim a color
"makes" visitors trust the site.

Rules from this research:

1. Accent blue stays on links, focus rings and small emphasis. No large saturated areas.
2. Navy is for buttons and brand surfaces, not full-width backgrounds.
3. Light is the primary theme. Never use pure black (`#000000`) as a background.
4. No saffron, bright red or green as brand or accent colors. Red is for errors only.
5. Never rely on red versus green. Every status uses an icon and text as well as color.
6. Chart colors must stay distinguishable under protan, deutan and tritan simulation. Check
   with a simulator after any change. Known issue: dark `--chart-1` and `--chart-4` are too
   close under protan and deutan vision, so replace `--chart-4` before charts ship.
7. Re-measure contrast after every color change. The current values are in section 2.4.

Chart check method, so later measurements are comparable: simulate with the Machado 2009
matrices at severity 1.0 in linear RGB, then compare pairs with ΔE76. Measured
2026-11-23: dark `--chart-1` versus `--chart-4` is ΔE 0.5 under protanopia and 5.3 under
deuteranopia, which confirms the known issue. The closest light pair is `--chart-3` versus
`--chart-5` at 11.1 under protanopia. See section 21 for the pending replacement.

Sources: Valdez and Mehrabian 1994; Elliot 2015; Lindgaard et al. 2006; Fogg et al. 2002; Cyr,
Head and Larios 2010; Nielsen Norman Group review of polarity research; Birch 2012.

---

## 3. Typography

Loaded with `next/font/google` and self-hosted by Next. Variables are set on `<html>`.

### 3.1 Families

| Role | Family | Token | Usage |
|---|---|---|---|
| Headings and wordmark | Source Serif 4 | `font-heading` | h1 to h3, site name, editorial pull quotes |
| Body and UI | Inter | `font-sans` | paragraphs, nav, buttons, forms |
| Labels and numerals | JetBrains Mono | `font-mono` | eyebrows, dates, tags, metrics, table headers, code |

Never use more than three families. Do not add a fourth for one special case.

### 3.2 Type scale

| Style | Desktop | Mobile | Weight | Line height | Tracking | Family |
|---|---|---|---|---|---|---|
| Display (home h1) | 72px | 48px | 600 | 1.05 | -0.02em | serif |
| Page title (inner pages) | 48px | 36px | 600 | 1.1 | -0.02em | serif |
| h2 | 36px | 30px | 600 | 1.15 | -0.015em | serif |
| h3 | 30px | 24px | 600 | 1.3 | 0 | serif |
| Hero role line (home) | 24px | 20px | 400 | 1.375 | 0 | sans |
| Lead paragraph (inner pages) | 20px | 18px | 400 | 1.6 | 0 | sans |
| Body | 18px | 16px | 400 | 1.65 | 0 | sans |
| Body small | 16px | 16px | 400 | 1.6 | 0 | sans |
| UI | 14px | 14px | 500 | 1.4 | 0 | sans |
| Label | 11px | 11px | 500 | 1.3 | 0.14em | mono, uppercase |
| Caption | 13px | 13px | 400 | 1.5 | 0 | sans |
| Code inline | 0.9em | 0.9em | 400 | inherit | 0 | mono |
| Code block | 14px | 13px | 400 | 1.6 | 0 | mono |

Home page steps: h1 is 48px, then 60px at `sm`, then 72px at `lg`; h2 is 30px then 36px
at `sm`; h3 is 24px then 30px at `sm`, except the experience snapshot h3 which stays 24px.
The hero role line is 20px then 24px at `sm`. Body small is used for section intros,
project summaries, skill values and experience body copy; the hero summary uses Body.
Section openers, the header role label and the hero eyebrow use 0.16em tracking; other
labels use 0.14em. Where the home page and this table disagree, the home page code is the
current truth and the difference belongs in section 21.

### 3.3 Typography rules

1. Serif is for headings, not for long body text.
2. Body copy is never centered. Short single-line items such as a 404 title may be centered
   only if the layout section for that page says so.
3. Measure (line length) is 60 to 70 characters for body copy. Use `max-w-[62ch]` or the
   equivalent token. Leads may run slightly narrower.
4. Do not fake bold, italic or small caps. Use real font weights and styles that were loaded.
5. Use `text-balance` on headings and `text-pretty` on paragraphs.
6. Labels are mono, uppercase and 11px, with 0.14em tracking unless they are section
   openers, the header role label or the hero eyebrow, which use 0.16em. Never set a full
   sentence as a label.
7. Numbers in tables, metrics and dates use mono with `tabular-nums`.
8. Do not use more than three weights on one page: 400, 500, 600.
9. Do not use letter-spacing on body text. Tracking is only for display, headings and labels.
10. Use curly quotes and apostrophes in all copy (I’m, Airtel’s). Straight quotes only in code.
11. Use an en dash for ranges (2023–2025) and a real minus sign for negative numbers.
12. Do not use all caps for anything except labels.
13. Never underline text that is not a link.
14. Never use a text size under 11px. Avoid 11px outside mono labels.

### 3.4 Hierarchy on a page

Every page has exactly one `h1`. Headings go in order: h1, then h2, then h3. Do not skip a
level to get a size. If a size is wrong, fix it with a class, not with a different heading.

### 3.5 Writing numbers and dates

| Item | Format | Example |
|---|---|---|
| Date range | Month Year – Month Year, en dash | Aug 2025 – Jan 2026 |
| Year range | Year–Year | 2023–2025 |
| Percentage | number and % sign, no space | 69.6% |
| Score | label then number | CGPA 7.64 |
| Counts | digits for 10 and up, words below 10 in prose | 30 to 100+ calls |
| Large numbers | thousands separator | 12,400 rows |

---

## 4. Spacing

### 4.1 Base unit

4px. Use the Tailwind scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. No arbitrary values unless
a layout genuinely needs one, and then record it in section 21.

### 4.2 Spacing scale in use

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | icon to text gap, tight inline gaps |
| `space-1.5` | 6 | optical half-step: mono label to value, slash spacing |
| `space-2` | 8 | label to value, small stacks |
| `space-3` | 12 | list item gap, compact rows |
| `space-4` | 16 | paragraph gap, form field gap |
| `space-6` | 24 | block gap inside a section |
| `space-8` | 32 | gutters at tablet, group gaps |
| `space-12` | 48 | gutters at desktop, large group gaps |
| `space-16` | 64 | header-to-content on inner pages |
| `space-24` | 96 | section padding on mobile |
| `space-32` | 128 | section padding on desktop |

### 4.3 Section padding

| Viewport | Vertical padding |
|---|---|
| under 640px | 96px |
| 640px and up | 128px |

The home hero may use up to 144px above the copy. Inner pages use the table above. Every
section opens with a full-width hairline. Record any later difference in section 21.

### 4.4 Vertical rhythm inside a section

| Between | Gap |
|---|---|
| Section opener and heading | 16px |
| Heading and intro | 16px |
| Intro and first block | 48px |
| Paragraph and paragraph | 16px |
| List item and list item | 12px |
| Row and row (ruled) | 24px padding top and bottom |
| Block and block | 48px |

### 4.5 Breakpoints

| Name | Min width | Meaning |
|---|---|---|
| default | 0 | phone, single column |
| `sm` | 640px | large phone, wider gutters |
| `md` | 768px | tablet, wider gutters |
| `lg` | 1024px | laptop, desktop nav appears, 12-column grid starts, larger gutters and section padding |
| `xl` | 1280px | desktop, container reaches 1200px |

Test every page at 375px, 768px and 1280px. Also check 320px for overflow and 1920px for
runaway stretching.

---

## 5. Layout

### 5.1 Container

- Maximum width 1200px (`max-w-content`), centered.
- Gutters: 20px under 640px, 32px from 640px, 48px from 1024px.
- Nothing may overflow the container horizontally on any page. Wide tables scroll inside
  their own wrapper. See section 13.

### 5.2 Grid

- 12 columns from `lg`. Content blocks start and end on column lines.
- Column gap 32px at `lg` and above.
- Below `lg`, everything is a single column in reading order.

### 5.3 Radius, borders, shadows

| Property | Rule |
|---|---|
| Radius | 6px (`--radius`). Small controls 4 to 6px, cards 6px, overlays 6px |
| Pills | Not allowed, except nothing on this site currently needs one |
| Fully round buttons | Not allowed |
| Borders | 1px hairline, `--border` |
| Input borders | 1px, `--input` |
| Shadows | Overlays only (sheet, menu). Never on cards, buttons or the header |
| Rule weight | 1px everywhere. No 2px dividers |

### 5.4 Margin spine

The page composition for long pages:

- A 12-column grid with a 3-column margin for metadata (section numbers, dates, row labels).
- 8 columns of content starting at column 5. Column 4 is breathing room.
- Every section on a long page uses the same spine, so headings, copy and lists line up
  down the page.
- Below `lg`, the margin content stacks above the content it describes.

### 5.5 Section opener

- Format: `01 / Selected work` in the margin, set as a mono label.
- Heading and intro sit in the content column.
- A full-container-width rule runs above the opener.
- A table or list inside the content column starts its own inset rule.
- Every anchor target carries `scroll-mt-24` so the sticky header never hides it.
- Numbering is used on the home page only. Inner pages use a plain mono label such as
  `About`, without a number.

### 5.6 Cover band (home only)

- The home hero closes with a three-cell ledger: Based in, Open to relocate, Languages.
- Cells are divided by hairlines and share equal width from `sm`.
- Below `sm`, the cells stack, each a mono label over a value.

### 5.7 Contents index (home only)

- Numbered anchor links to the home sections, in the hero's right margin on desktop.
- Hidden below `lg`. The copy and actions lead straight to the first section on phones and
  tablets, with no index block between them.
- One column in the hero's right margin from `lg`.
- It is one component. If it feels like clutter on review, remove it. Do not add it to any
  other page.

### 5.8 Alignment rules

1. Left-align all text. Right-align only numbers in tables and a single action at the end
   of a row.
2. Align every block edge to the spine or to a column line.
3. Do not nudge elements by a few pixels to make them look aligned. Fix the layout.
4. Repeat the same structure for the same kind of content on every page.

### 5.9 Page templates

| Template | Pages | Structure |
|---|---|---|
| Home | `/` | cover band, three numbered content sections (01 Selected work, 02 Toolkit, 03 Experience), and a numbered closing contact section (04 Contact) |
| Inner | `/about`, `/experience` | page header, sections on the spine |
| Index | `/projects`, `/blog` | page header, filter bar, ruled list |
| Detail | `/projects/[slug]`, `/blog/[slug]` | page header, meta row, article body, related |
| Form | `/contact` | page header, form column, alternative contact column |
| Admin | `/admin/*` | separate shell, see section 17 |
| Status | `404`, loading, error | centered single block, see section 18 |

---

## 6. Motion

### 6.1 Durations and easing

| Use | Duration | Easing |
|---|---|---|
| Hover and press | 150ms | ease-out |
| Color and border change | 200ms | ease-out |
| Entrance reveal | 250 to 300ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Sheet slide | 250ms | `cubic-bezier(0.22, 1, 0.36, 1)` |

### 6.2 Lenis

- Use `autoRaf`, smooth wheel and native anchor handling.
- Do not instantiate Lenis at all when `prefers-reduced-motion: reduce` is set.
- Start and stop Lenis if the operating system setting changes while the page is open.
- Sticky headers and `scroll-mt` values must keep working with Lenis on and off.

### 6.3 Reduced motion

Every transition and animation must collapse when reduced motion is set. GSAP and Motion
timelines must render their final state immediately without animating. Test with the system
setting turned on before any animation phase is accepted.

### 6.4 Allowed now (Phases 1 to 8)

- Hover and focus color changes
- A 1px underline on links
- A 1px nudge on arrow icons
- Sheet slide and fade
- Smooth scroll through Lenis

### 6.5 Allowed in Phase 9 (animation phase)

- Reveal on scroll: opacity from 0 to 1 and a rise of 8 to 16px, 300 to 400ms, once per
  viewport entry.
- Stagger of at most 60ms between siblings, at most six siblings.
- A reading progress bar on article pages, 2px high, using `--link`.
- A number count-up for metrics, only if the number is real and shown in full without
  animation when reduced motion is set.
- Content needed for search engines or for understanding must be present in the HTML and
  readable before any script runs. Never hide it until an animation fires.

### 6.6 Never allowed

- Parallax, scroll pinning with JavaScript, scroll jacking
- Looping or autoplaying backgrounds
- Custom cursors
- Page transition animations that block navigation
- Animation on text that the visitor is trying to read
- Motion that depends on mouse position
- Animation of layout properties that causes layout shift

### 6.7 Motion budget

- No page may run more than three simultaneous animations.
- No animation may delay interaction. Buttons and links work immediately.
- Cumulative layout shift stays under 0.1 with all animations enabled.

### 6.8 Pinned exception

CSS `position: sticky` is allowed for the Skills heading on the home page at desktop widths,
and for similar section headings if a later page needs the same pattern. This is not
JavaScript pinning, and it must not be combined with GSAP ScrollTrigger pinning.

---

## 7. Patterns for inner pages

### 7.1 Page header

- Label in the margin, set as mono 11px uppercase (for example `About`). No section number.
- Page title in column 5: serif 600, 48px desktop and 36px mobile, line height 1.1, tracking
  -0.02em, `text-balance`.
- One intro paragraph below at lead size, maximum 62 characters wide.
- A full-width hairline above the header block and 96px of space before the first section.
- No ledger, no contents index, no decorative element.

### 7.2 Timeline

- One row per entry, newest first, on the margin spine.
- Date range in the margin: mono 14px, tabular numbers.
- Title as an h3, organization line below in muted text, optional bullets below that.
- Hairline between rows and 24px padding above and below each row.
- No vertical line, no dots, no icons, no cards.
- Overlapping periods are shown as they are, in date order of the start. Do not hide overlap.
- Below `md`, the date range sits above the title.

### 7.3 Key-value rows

- Label in mono 11px uppercase using one third of the content width, value in body text using
  two thirds.
- Hairline between rows.
- Used for skills, personal facts and education details.
- Below `sm`, the label stacks above the value.
- Values that are lists use a comma-separated line, not bullets, unless there are more than six.

### 7.4 Tags

- Plain mono 11px uppercase text, separated by 12px in either direction. Tags may stack
  in the margin on desktop.
- No filled chips, no pills, no borders.
- Tags are never the only way to identify a tool. The project summary also names it.
- On the Projects index, filter controls are a separate component, see section 7.8.

### 7.5 Lists

- Bullets are a short 8px rule or a small filled square in `--muted-foreground`. Never an
  emoji and never a default browser disc inside designed sections.
- List item gap 12px. Nested lists indent 24px.
- Numbered lists use mono numerals with tabular figures.

### 7.6 Pull statement

- At most one per page. Serif 600, 24px to 32px, in the content column, with a 1px rule above.
- Only used for a sentence taken from `PROFILE.md`. Never for a slogan.

### 7.7 Callout (rare)

- 1px `--border` box on the page surface with 24px padding and 6px radius. No fill.
- A mono label at the top (for example `Note` or `Limitation`).
- Used in case studies for limitations and assumptions. Not used on the home page.

### 7.8 Filter bar (Projects index)

- A single row of text buttons above the list, with the active item underlined by 1px.
- Each control is at least 44px high. The row scrolls horizontally on small screens with no
  visible scrollbar clipping the focus ring.
- The active filter is announced to assistive technology with `aria-pressed` or `aria-current`.
- Filtering does not animate rows in or out. The list simply updates.
- The count of visible items is shown as a mono label, for example `3 projects`.
- Filtering is by tool or topic. Do not invent categories that no project uses.

### 7.9 Empty and missing content

- A page with no real content yet shows a short honest line, for example "No posts yet."
- Never fill a gap with placeholder testimonials, fake logos or lorem ipsum.
- The Testimonials page stays hidden, and out of navigation, until real ones exist.

### 7.10 Skills inventory

Used on the Skills section of the About page. There is no separate toolkit section elsewhere; Home shows the names only (`homeSkillGroups` in `src/lib/skills.ts`).

Structure, following the spine of section 5.4:

- Each category is one row of the 12-column grid: the category label is an h3 in the 3-column margin (serif, 24–30px, weight 600); the item rows live in the 8-column content column.
- Each item is a ruled row of a `dl`: the item name uses the Education section's margin-label style — Inter Mono 11px, uppercase, 0.14em tracking, `text-muted-foreground` — matching a line like "MBA, Business Analytics"; it sits in the left column. When the item has a qualifier, the qualifier sits on the right (2/3) of the row, in the style of the Education institution line: Inter 16px, `leading-relaxed`, `text-foreground`, for example "Rathinam Global University, Coimbatore, 2023–2025. CGPA 7.64." and "scripting, automation, file handling".
- Rows are separated by a 1px `--border` hairline; rows carry 24px vertical padding (section 4.4).
- Category order: Databases and querying, Programming, Data and spreadsheets, Analytics and automation (the analyst stack first), then Tools, Soft skills, Languages.
- Below `lg` the h3s stack above their rows.
- Never used here: stars, percentages, bars, grouped tags, or a flat comma list (the thing this section replaces).

---

## 8. Buttons and links

### 8.1 Button hierarchy

| Level | Style | Use |
|---|---|---|
| Primary | solid `--primary`, `--primary-foreground` text | one per section: the main action |
| Secondary | outline, `border-input`, foreground text | the second action |
| Tertiary | text link with an icon | quiet actions such as resume download |
| Destructive | solid `--destructive` | admin delete only, after confirmation |

### 8.2 Button specification

- Height 44px minimum. Horizontal padding 20px. Radius 6px. UI text 14px, weight 500.
- Label is a verb or verb phrase in sentence case: "View projects", "Send message".
- Icon, if any, is 16px lucide, placed after the label for forward actions, before for
  download. Icon is `aria-hidden`.
- Hover: background shifts to `--primary-hover` (light `#1B2E52`, dark `#D8DBE0`). 150ms.
- Focus: 2px ring in `--ring` with 2px offset. Never removed.
- Disabled: reduced contrast is allowed, but the label stays readable at 3:1 or better, and the
  reason is stated near the control when it is not obvious.
- Pressed: no scale or bounce; a 1px settle, `translate-y-px`, 150ms.
- Loading: label changes to a verb ending in "ing" and the button is disabled. No spinner on
  its own without text.
- Buttons that navigate are links styled as buttons, using the `a` element. Buttons that act
  use the `button` element.

### 8.3 Links

- Inline links in prose are always underlined, in `--link`, with the same focus ring.
- Hover changes to `--link-hover`. The underline thickness does not change.
- External links show a small `ArrowUpRight` icon and open in a new tab with
  `rel="noopener noreferrer"`. The icon is `aria-hidden`, and the link text makes sense alone.
- Links never use the words "click here". Use the destination or the action.
- A whole row can be one link (project rows). It carries a concise `aria-label` and a clear
  focus ring around the whole row.
- Download links carry the `download` attribute and name the file type: "Download resume (PDF)".

### 8.4 Link text rules

- Link text stands alone out of context. "View project" is acceptable when the row title is
  inside the same link or the `aria-label` names the project.
- Do not link entire sentences in running text.
- Do not use a bare URL as link text unless the URL itself is the content.

### 8.5 Action group (home hero CTAs)

The home hero carries its actions as one aligned action group rather than separate controls.

- One wrapped row, everything vertically centered on the 44px baseline of section 8.2. Gap 12px.
- Forward actions carry a 16px trailing icon (`ArrowRight`), `aria-hidden`, nudging 2px right
  in 150ms on hover.
- A quiet tertiary action (resume download) sits in the same row after a 1px × 24px `--border`
  hairline at `sm` and up. Below `sm` the divider is hidden and the action wraps onto its own
  line, left aligned.
- Hover on the tertiary: muted → foreground and a 1px underline.
- No full-width slabs and no stacked groups; every target stays at 44px height.
- The single 2px `--ring` focus ring comes from the global `:focus-visible` rule in
  `src/app/globals.css`; it appears once on every button, link and action.

---

## 9. Navigation pieces

### 9.1 Nav link

- 14px, weight 500, Inter. Muted by default, foreground on hover and when current.
- The current item has a 1px foreground underline inset from the text edges and carries
  `aria-current="page"`.
- Hover and keyboard focus show the same underline at 40% opacity, so the link confirms it is
  interactive before it is clicked.
- 44px hit height.

### 9.2 Navigation items

Home, About, Projects, Blog, Experience. Contact is not a row: it is the header's single
primary action (a solid button) and the mobile sheet's full-width button, so the same
destination never appears twice. Testimonials and Admin are not in the nav. Admin is
reachable by direct address only. Items for pages not yet built may 404 during development,
but no site is deployed publicly until every nav target exists.

### 9.3 Theme toggle

- Icon-only ghost button: 44px through tablet, 36px at desktop width.
- Accessible label describes the action: "Switch to dark theme" or "Switch to light theme".
- Moon and sun icons are swapped with CSS classes so there is no icon flash on load.
- The toggle follows the availability line and precedes the primary action on desktop. It is
  the first control in the mobile bar.

### 9.4 Mobile menu

- shadcn Sheet from the right, 85% width, maximum 320px. The row list scrolls; the footer stays
  at the bottom edge.
- Header: serif site name, mono role label below it, and a hairline. The close button is 44px
  and is the first focus stop, matching its position at the top right.
- Five rows, 56px high, separated by hairlines. Each row carries a decorative mono index
  (`01` to `05`), the label, and a 16px arrow that nudges 1px on hover.
- Footer: availability line, location and relocation line, a full-width Contact button, and
  GitHub and LinkedIn text links with 44px hit height.
- Focus is trapped inside while open. Escape closes. Focus returns to the menu button after
  closing. Choosing a row or the Contact button closes the sheet.
- The current page is underlined, as on desktop.
- The overlay uses the `--overlay` token. This is the only place a shadow is allowed besides
  popovers.
- The menu button has an accessible label ("Open menu") and `aria-expanded`.

### 9.5 Skip link

- First focusable element on every page. Hidden until focused, then visible at the top left
  with a clear background and the standard focus ring.
- Targets `main` with `id="main"`.

### 9.6 Breadcrumbs

- Used on detail pages only: `Projects / FileFlow`. Mono 11px uppercase, muted, with the last
  item as plain text and `aria-current="page"`.
- Not used on top-level pages.

### 9.7 Pagination

- Used only if the blog or project list grows beyond twelve items.
- Previous and next as text links with arrows, plus the current page number in mono. No page
  number strip longer than five items.

---

## 10. Icons and imagery

### 10.1 Icons

- lucide-react only. 16px beside text and 20px when standing alone.
- Stroke width stays at the library default. Do not mix stroke widths.
- Decorative icons are `aria-hidden="true"`. Icons that carry meaning on their own have an
  accessible label.
- No brand logos drawn by hand and no emoji. The installed lucide version does not include
  GitHub or LinkedIn brand icons, so social links are text with an arrow.
- Icon color follows the text color of the element it sits in.

### 10.2 Images

- Use `next/image` with explicit width and height, or `fill` inside a sized container, so no
  layout shift occurs.
- Every meaningful image has useful alt text. Decorative images have empty alt text.
- 1px `--border` outline, radius up to 6px, no frames, no drop shadows, no tilt.
- Screenshots are cropped to the relevant area and show real data only. No device mockups.
- Provide a caption in the caption style (13px, muted) when an image needs explaining.
- Compress to modern formats. Hero or header images are never required on this site.

### 10.3 Portrait photo (optional)

- If a photo is added, it appears on the About page only, in the margin or content column at a
  size no wider than 320px, with a 1px border and 6px radius.
- Never on the home hero. No filters, no overlays.

### 10.4 Favicon and social image

- Favicon: simple monogram "K" or "KC" in serif on the paper color, created as a static file.
- Social share image: plain paper background, name in serif, title line in sans, no
  decoration. Generated with the Next.js metadata image route in Phase 10.

---

## 11. Accessibility

Target: WCAG 2.2 level AA on every page, in both themes.

### 11.1 Structure

- One `h1` per page. Headings in order.
- Landmarks: `header`, `nav`, `main`, `footer`. One `main` per page with `id="main"`.
- Sections carry `aria-labelledby` pointing at their heading.
- Lists are real lists. Tables are real tables with header cells.

### 11.2 Keyboard

- Everything reachable and operable with the keyboard, in a logical order.
- Tab order on every page: skip link, wordmark, navigation, theme toggle, menu button,
  content, footer.
- No keyboard traps except inside open dialogs and sheets, where focus is contained on
  purpose and released on close.
- Interactive elements respond to Enter, and buttons also to Space.

### 11.3 Focus

- Visible 2px ring in `--ring` with a 2px offset on every link, button, input and summary.
- Never remove a focus indicator. Never animate the ring.
- Focus ring contrast is at least 3:1 against the surrounding color in both themes.
- After a route change, move focus to the page `h1` or to `main`.

### 11.4 Targets and text

- Touch and click targets are at least 44px by 44px. Dense admin tables may use 36px with
  24px of spacing between targets.
- Body text 16px minimum on mobile. Allow zoom to 200% without loss of content or function.
- Do not disable pinch zoom.
- Reflow to a single column at 320px width without horizontal scrolling, except for data
  tables and code blocks, which scroll inside their own container.

### 11.5 Color and contrast

- Use the measured values in section 2.4. Text 4.5:1, large text 3:1, interface boundaries 3:1.
- Do not communicate state with color alone. Errors have an icon and text. Active filters have
  an underline.

### 11.6 Motion

- Respect `prefers-reduced-motion` everywhere. See section 6.3.
- No content flashes more than three times per second. No autoplay media.

### 11.7 Forms

- Every field has a visible, persistent label above it. Placeholders are examples, never labels.
- Errors are announced to assistive technology and linked to their field. See section 14.

### 11.8 Text alternatives

- Images, charts and diagrams have text alternatives. A chart also has a short written
  summary of its finding and, where practical, a data table.
- Icon-only buttons have an accessible name.

### 11.9 Language and metadata

- `<html lang="en">`. Every page has a unique, descriptive title.
- Page changes are announced to assistive technology through normal navigation and focus.

### 11.10 Testing routine for each phase

1. Tab through the whole page with the keyboard only.
2. Turn on the operating system reduced motion setting and reload.
3. Zoom to 200% and to 400% width reflow.
4. Check both themes for contrast on every new component.
5. Run `eslint` with the `jsx-a11y` rules and fix every warning.
6. Describe the result in words at 375px and 1280px.

---

## 12. Header and footer

### 12.1 Header

- Height 64px on mobile and 72px at desktop width. Sticky at the top. 1px bottom border.
- Background: the page paper at about 80% opacity with a light backdrop blur, so content
  scrolls under it without a hard edge. This is the single sanctioned exception to the
  glassmorphism ban. It has no tint, no gradient and no shadow.
- Contents, left to right: the wordmark (serif, about 20px) with a 1px vertical divider and the
  mono role label at `md`; the navigation pushed to the right; a 1px vertical divider; a mono
  availability line marked by a 4px `--link` square at `xl`; the theme toggle; and the Contact
  primary action at `lg`.
- The availability line is text as well as a square. Colour never carries the meaning alone.
- The Contact action is a link styled as a button (44px, section 8.2), not a sixth navigation
  row. It carries `aria-current="page"` on `/contact` and keeps its normal fill; the page
  heading supplies the visual location.
- Density ladder: under `md` the bar shows the wordmark, theme toggle and menu button only.
  The role label appears at `md`; navigation, the divider and the Contact action at `lg`; and
  the availability line at `xl`. At 768px the sheet carries navigation and Contact, because
  five links plus the action do not fit without crowding. Nothing may overflow at 1024px; if
  it does, hide the role label before hiding the action.
- If the blur ever causes legibility or performance problems, replace it with a solid
  `--background` fill. Do not make the header more transparent.

### 12.2 Footer

- 1px top border. 14px muted text. Copyright on the left, links on the right on one baseline.
- Links are plain text with a small external arrow and 44px hit height: GitHub, LinkedIn.
- No email address and no phone number. The contact route and the validated form are the only
  contact path shown.
- Below `md`, the copyright sits above the links.

### 12.3 Shell behavior

- The header and footer render on every public page. The admin area uses its own shell.
- The `main` area fills the remaining height so the footer sits at the bottom on short pages.

---

## 13. Data presentation

This is an analyst portfolio, so tables, charts and code are first-class content.

### 13.1 Tables

- Real `table` elements with `thead`, `th scope` and `caption` or a nearby heading.
- Numbers in mono with `tabular-nums`, right-aligned. Text left-aligned. Header labels in mono
  11px uppercase.
- 1px hairline between rows. No zebra stripes, no vertical rules, no cell borders.
- Header row has a `--muted` fill and a 1px rule below it.
- Row padding 12px vertical and 16px horizontal. Compact tables use 8px vertical.
- Wide tables scroll inside a wrapper with `overflow-x: auto`, a visible focus ring, and
  `tabindex="0"` plus a label so keyboard users can scroll it.
- State the unit in the header (for example `Revenue (INR)`), not in every cell.
- Show a source line under the table: `Source: ...` in caption style.
- Sample or synthetic data is labeled as such, in plain words, next to the table.

### 13.2 Charts

- Chart colors come from `--chart-1` to `--chart-5`, in order. Do not skip or reorder them.
- Title states the finding, not the topic: "Orders peak on Fridays", not "Orders by weekday".
- Axes have labels with units. Gridlines are 1px `--border`, horizontal only.
- No 3D, no gradients, no shadows, no pie charts for more than three categories, no dual axes.
- Do not rely on color alone. Use direct labels at line ends or distinct marker shapes, and
  vary line style when series cross.
- Bars start at zero. Line charts may start above zero only if the axis break is obvious.
- Include a one-sentence written summary of the finding under every chart, and a link to or
  display of the underlying table where practical.
- Include a source line and the time period in caption style.
- Charts have an accessible name and a long description (`aria-describedby` to the summary).
- Animation: lines and bars may draw in once, 400ms, only when reduced motion is off.
- Charts are drawn with a charting approach decided in Phase 4. Whatever is used must read its
  colors from the tokens above. Hard-coded chart colors are not allowed.

### 13.3 Data stories

- A case study that includes a chart follows: question, data, method, finding, limitation.
- Never present a result that the analysis did not produce. Mark unknown numbers as TODO in
  development and remove the section before launch if it cannot be filled with real data.

### 13.4 Code blocks

- Mono 14px (13px on mobile), line height 1.6, on `--muted` fill with a 1px `--border` outline
  and 6px radius, padding 16px.
- Horizontal scroll inside the block. Never wrap SQL or Python mid-statement.
- A language label in mono 11px uppercase at the top right of the block (`SQL`, `Python`).
- A copy button is optional and, if added, has an accessible label and a visible confirmation
  that does not rely on color alone.
- Syntax highlighting uses a two-tone scheme from the tokens: keywords in `--link`, comments in
  `--muted-foreground`, strings in `--chart-3`, everything else in `--foreground`. Contrast
  must be checked in both themes.
- Inline code uses mono at 0.9em with a `--muted` background and 2px radius, padding 2px 4px.
- Show real, runnable code only. Long listings link to the repository instead of pasting
  hundreds of lines.

### 13.5 Metrics

- A metric is a mono number at 32px to 48px with a mono label below it, in a row divided by
  hairlines. No icons, no cards, no arrows implying growth.
- Only real figures from `PROFILE.md` or a real analysis. Never decorative numbers.
- The Airtel call volume (30 to 100+ calls per day) is the only figure on the resume today.

---

## 14. Forms

Used on `/contact` in Phase 5 and in the admin area in Phase 7.

### 14.1 Fields

- Label above the field, 14px weight 500, always visible.
- Input height 44px, 1px `--input` border, 6px radius, 12px horizontal padding, background
  `--background`. Text area minimum height 144px.
- Optional helper text in caption style below the label or the field.
- Required fields are marked in the label text ("Required"), not only with an asterisk.
- Placeholder text is an example only and is never the only label.
- Field gap 24px. Group gap 48px.

### 14.2 States

| State | Style |
|---|---|
| Default | `--input` border |
| Hover | border darkens one step |
| Focus | 2px `--ring` outline with 2px offset, border stays |
| Invalid | `--destructive` border, error text below with an icon |
| Disabled | muted text, no pointer, reason stated nearby when unclear |
| Success | confirmation message below the form with a check icon and text |

### 14.3 Validation

- Zod schemas shared between client and server. The server is the final authority.
- Validate on blur and on submit. Do not show errors while the visitor is still typing the
  first time.
- Error text says what is wrong and how to fix it: "Enter an email address like
  name@example.com." No blame, no jargon.
- Errors are linked to fields with `aria-describedby` and announced through a live region.
- On submit with errors, focus moves to the first invalid field and a summary appears above
  the form.

### 14.4 Contact form specifics

- Fields: name, email, message. An optional subject is allowed. Nothing else.
- A hidden honeypot field and server-side rate limiting through Upstash protect against spam.
  The honeypot is never visible to people or assistive technology.
- Sending shows a button label of "Sending" and disables the form. Success replaces the form
  with a short confirmation and a link back home. Failure keeps the entered text and shows a
  plain error with a retry.
- The destination address comes from `CONTACT_EMAIL`. It is never written into the page.
- A short line states how long a reply usually takes only if that is true. Otherwise omit it.

### 14.5 Privacy

- A short note beside the form says the message is used only to reply and is not shared.
  Keep it truthful. Do not collect anything beyond the three fields.

---

## 15. Projects and case studies

### 15.1 Projects index

- Page header, then a filter bar (section 7.8), then a ruled list of projects.
- Each row follows the home page row: index number and tool tags in the margin, title and
  summary in the content column, an arrow action at the far right. The whole row is a link.
- Rows are ordered by relevance to analyst roles, not by date.

### 15.2 Project detail

Meta row (mono labels): Type, Tools, Status, Links. Then the body in this order:

1. **Summary.** Two sentences on what the project is.
2. **Problem.** What needed doing and for whom, only if known and true.
3. **Approach.** What was built or analyzed and how.
4. **Tools.** Names of tools and why each was used.
5. **Result.** Only outcomes that exist. If none are measured, say "No measured result yet."
6. **What I learned.** Short and specific.
7. **Links.** Repository and live demo where they exist.

Each section is an h2 with the section opener pattern. Mark missing facts as TODO during
development. A TODO must never ship.

### 15.3 Honest framing

- Say "personal project" where that is true. Do not imply clients, users or revenue.
- The n8n and Ollama project is an automation project. Describe it as automation. Do not
  stretch it into an analytics claim.
- The earlier portfolio site is described as a front-end project in HTML and Tailwind CSS.

### 15.4 Analysis case studies (add as they are created)

- Each follows section 13.3: question, data, method, finding, limitation.
- Include the dataset name, its source and licence, and the number of rows used.
- Show the SQL or Python that produced the result, in a code block or by linking to it.
- Include one chart or table that states the finding, with a written summary.
- State limitations plainly. Recruiters trust candidates who name what the analysis cannot show.

### 15.5 Media

- Screenshots show real output. Crop to the relevant area. Add alt text and a caption.
- No stock imagery and no device mockups.

---

## 16. Blog and long-form text

### 16.1 Article layout

- Page header with title, date (mono) and reading time (mono), then the body in a single
  column of 62 to 70 characters, on the spine's content column.
- Body 18px desktop and 16px mobile, line height 1.65.
- Headings inside the article: h2 serif 32px with 64px space above and 16px below, h3 serif
  24px with 40px above and 12px below.

### 16.2 Elements

| Element | Rule |
|---|---|
| Paragraph | 16px gap, left aligned |
| Blockquote | 1px left rule in `--border`, 24px left padding, serif 20px, no quotation icon |
| Lists | section 7.5 |
| Inline code | section 13.4 |
| Code block | section 13.4 |
| Table | section 13.1 |
| Figure | image or chart with a caption in caption style below |
| Horizontal rule | 1px `--border`, 64px space above and below |
| Footnote | numbered in mono, listed at the end under a rule |

### 16.3 MDX components

- A fixed set of MDX components maps to the elements above. Do not allow arbitrary HTML
  styling inside posts.
- Headings in MDX get anchor ids so sections can be linked.

### 16.4 Metadata

- Each post has a title, a description of at most 160 characters, a date, and tags drawn from
  the same vocabulary as projects.
- Only publish posts that are finished. Drafts are never listed or indexed.

### 16.5 Reading aids

- A 2px reading progress bar in `--link` is allowed in Phase 9 and respects reduced motion.
- No floating share buttons, no popups, no newsletter modals.

---

## 17. Admin area (Phase 7)

- Protected by Auth.js. Not linked from the public navigation. Not indexed (`noindex`).
- Uses its own simple shell: a header with the site name, the signed-in state and sign out,
  and a left list or top tabs for Projects, Posts, Testimonials and Messages.
- Does not follow the editorial grid. It may use shadcn defaults for tables, dialogs and forms
  inside the same color, type and radius tokens.
- Denser layout is allowed: 36px controls with 24px of space between targets, 14px text.
- Every destructive action asks for confirmation in a dialog that names the item.
- Every form uses the same validation rules as section 14.
- Success and error messages use the status tokens and include text.
- The admin never displays or logs secrets. Environment values stay on the server.
- Public pages never import admin components.

---

## 18. Status pages and states

### 18.1 404

- Centered block, serif title "Page not found", one sentence, and links to Home and Projects.
- No joke illustrations and no animation.

### 18.2 Error

- Plain title "Something went wrong", a short sentence, a "Try again" button and a link home.
- Never show stack traces or internal messages to visitors.

### 18.3 Loading

- Skeleton rows in `--muted` with no shimmer when reduced motion is set. With motion allowed, a
  single slow fade between two muted tones is the maximum.
- Skeletons match the final layout to avoid shift.

### 18.4 Empty

- One honest line and, where useful, a link to something that has content (see section 7.9).

### 18.5 Offline and slow

- The site is static where possible, so most pages work without extra requests. Do not add a
  service worker unless a later phase explicitly asks.

---

## 19. SEO, metadata and performance

### 19.1 Metadata

- Every page has a unique title and description, written from `PROFILE.md` facts.
- Title pattern: `Page | Koushik C`. The home title is `Data Analyst | SQL, Excel & Python | Koushik C`.
- Descriptions are 120 to 160 characters, plain, with no keyword stuffing.
- Add `sitemap.ts`, `robots.ts` and canonical URLs in Phase 10. Add structured data for a
  Person only with facts that appear on the page.
- No email address or phone number in metadata or structured data.

### 19.2 Performance targets

| Measure | Target |
|---|---|
| Lighthouse performance | 90 or higher on mobile |
| Lighthouse accessibility | 100 |
| Largest Contentful Paint | under 2.5s |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200ms |
| JavaScript on the home page | as little as possible, Server Components by default |

### 19.3 Performance rules

- Fonts: limit weights and subsets, `display: swap`, self-hosted by `next/font`.
- Images: `next/image`, correct sizes, modern formats, lazy-load below the fold.
- Client components only where interaction or animation needs them.
- Load GSAP and ScrollTrigger only on pages that use them, and dynamically if possible.
- Do not ship unused shadcn components or unused icons.

---

## 20. Content voice and copy rules

All copy comes from `PROFILE.md`. Design never adds claims.

- First person, plain and confident. "I’m an MBA graduate in Business Analytics."
- Say "entry-level" honestly. Do not oversell. Do not apologize either.
- Lead with analyst identity: SQL, Excel, Python and business insight. The site itself shows
  technical skill. Do not present Koushik as a full-stack engineer.
- Sentence case for headings and buttons. No exclamation marks. No superlatives.
- Banned words: passionate, results-driven, dynamic, rockstar, guru, synergy, cutting-edge,
  world-class, seamless, leverage (as a verb), innovative.
- No invented numbers, motivations, clients, awards or testimonials.
- Contact is through the validated form. No phone number and no email address on any page.
- Dates and numbers follow section 3.5.
- Sentences are short. One idea per sentence. Avoid stacked adjectives.
- When a fact is missing, write `TODO: ask Koushik` in development and ask. Never fill the gap
  with something plausible.

### 20.1 Words to prefer

| Prefer | Over |
|---|---|
| built | architected |
| used | leveraged |
| helped | spearheaded |
| learned | mastered |
| entry-level analyst | rising star |
| personal project | flagship product |

---

## 21. Open decisions and code differences log

Record every mismatch between this file and the code, and every pending decision. Resolve an
item by syncing the code and the file, then delete the row.

| Item | Status | Note |
|---|---|---|
| Header blur | decided | Kept as a sanctioned exception in section 12.1 |
| Contact CTA on `/contact` | decided | `aria-current="page"` only, no visual state change; the page heading carries the location |
| Sticky Skills heading | decided | Allowed through CSS sticky, section 6.8 |
| Inner page title size | new | 48px desktop and 36px mobile, section 3.2. Not built yet |
| Status tokens | pending | Add `--success` and `--warning` to `globals.css` in Phase 5 |
| Syntax highlight colors | pending | Verify contrast in both themes when code blocks are built |
| Chart implementation | pending | Choose the approach in Phase 4, must read token colors |
| Chart-4 in dark theme | pending (Phase 4) | ΔE 0.5 protanopia, 5.3 deuteranopia against chart-1 (Machado 2009, ΔE76). Candidate `#A78BFA` scores 23.4, 17.3, 13.1 against the other four. Replace before charts ship, then re-measure |
| Resume PDF in repository | blocked | Ignored and untracked; a Git-based deploy will not include it. Needs a hosting decision |
| Contents index below `lg` | decided | Hidden under 1024px, section 5.7 updated |
| Home project rows | decided | Static rows until Phase 4 adds `/projects/[slug]`; the section footer links to GitHub |
| Phase 4 — `/projects` | new | Page header (7.1), then filter bar (7.8), then ruled rows (15.1) with index, tool tags and arrow action. Filter bar renders only when 6+ projects; the count label reads `N projects`; all rows are in the HTML and hidden client-side on filter; no animation |
| Phase 4 — `/projects/[slug]` | new | Breadcrumb (9.6), meta row (Type, Tools, Status, Links), sections in 15.2 order; null sections omitted except Result |
| Phase 4 — project data | decided | `src/lib/projects.ts` owns data and copy; fields can be `null` until filled; results read "No measured result yet." until real |
| Phase 4 — 404 | new | Custom `src/app/not-found.tsx` per 18.1 |
| Phase 4 — links on project pages | decided | External links (e.g. dev site live link) use `ArrowUpRight` 16px + `rel="noopener noreferrer"` |
| Blog nav item | pending | Hidden from `site.ts` until Phase 8 builds `/blog` |
| Experience and education data | decided | Single source in `src/lib/profile.ts`; `src/lib/timeline.ts` removed |
| `theme-color` meta | pending | Phase 10, tokenised approach |
| Focus to h1 after route change | pending | Phase 10 |
| Prisma version mismatch | pending | Phase 6: installed `@prisma/client` 7.10.1 does not match the `prisma` CLI 8.0.0-rc.34; align before schema work |
| Vitest setup | pending | Phase 5: no config or tests yet |
| Home action group (§8.5) | decided | Button scale rebuilt, single focus ring, hero action group + closing CTA applied, new §8.5 |

### 21.1 Recorded arbitrary values

These are the non-scale values currently in the built components. They are approved by eye.
Scale-aligned arbitrary values (`leading-[1.05]`, `leading-[1.15]`, `tracking-[-0.02em]`,
`tracking-[-0.015em]`) are the type scale from 3.2, not exceptions.

| Value | Where used |
|---|---|
| `text-[0.6875rem]` (11px) | mono labels and tags |
| `tracking-[0.16em]` | section openers, header role label, hero eyebrow |
| `tracking-[0.14em]` | facts ledger, skill labels, experience dates, project tags |
| `max-w-[62ch]` | hero summary, section intros, project summaries, experience bullets |
| `lg:h-[4.5rem]` (72px) | header at desktop |
| `data-[side=right]:w-[85%]` | mobile sheet width |
| `z-[100]` | skip link |
| `top-[0.7em]` | designed list bullet position |
| `before:content-['']` | designed list bullet pseudo-element |
| `duration-[250ms]` | sheet slide |
| `text-[0.8rem]` | small button size |
| `text-[0.8125rem]` (13px) | mobile sheet location line |
| `rounded-[min(var(--radius-md),10px)]` | xs and icon-xs button radius |
| `rounded-[min(var(--radius-md),12px)]` | sm and icon-sm button radius |
| `supports-[backdrop-filter]` | header background fallback |

---

## 22. Phase checklists

### 22.1 Every phase

- [ ] Read `AGENTS.md`, `PROFILE.md` and this file first
- [ ] Copy written and approved before code, using only `PROFILE.md` facts
- [ ] Only tokens from this file, no raw colors, no new fonts
- [ ] Server Components by default, client components only where needed
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean
- [ ] Both themes checked
- [ ] Keyboard pass and reduced-motion pass done
- [ ] Plain-words description at 375px and 1280px reported
- [ ] This file updated if a rule changed, and section 21 updated
- [ ] Nothing committed by the agent. The developer commits after review

### 22.2 Phase 3 (About, Experience)

- [ ] Page header pattern (7.1) on both pages
- [ ] Timeline pattern (7.2) with MBA, BBA, HDCA and both roles (ObjectWays, Altruist)
- [ ] Key-value rows (7.3) for skills, languages and location
- [ ] Resume download as a tertiary action with the file type named
- [ ] No testimonials page, no invented backstory

### 22.3 Phase 4 (Projects)

- [ ] Index with filter bar and ruled rows
- [ ] Detail template with the section order in 15.2
- [ ] Table and chart rules ready (13.1, 13.2) if any analysis is added

### 22.4 Phase 5 (Contact)

- [ ] Form pattern (14), shared Zod schema, honeypot, rate limit
- [ ] Status tokens added and measured for contrast

### 22.5 Phases 6 to 8 (Data, admin, blog)

- [ ] Admin shell (17) separate from the public shell
- [ ] MDX component set mapped to section 16
- [ ] No admin imports in public pages

### 22.6 Phase 9 (Animation)

- [ ] Only the motion allowed in 6.5
- [ ] Reduced-motion render verified for every animated element
- [ ] No layout shift introduced

### 22.7 Phase 10 (Launch)

- [ ] Metadata, sitemap, robots, social image
- [ ] Lighthouse targets met (19.2)
- [ ] Every nav link resolves, no TODO text left, no placeholder content
- [ ] Phone number and email absent from the repository and pages

---

## 23. Prompt snippets for the agent

Paste these into OpenCode when needed.

**Sync check**

```text
DESIGN.md changed. Re-read it. Verify that src/app/globals.css matches every hex value and
size in the tables. List any mismatch in words, fix the code, and do not touch anything else.
```

**Design review without screenshots**

```text
Review the page against DESIGN.md sections 2 to 7 and 11. For each rule, say pass or fail and
name the file and line. Describe the page at 375px and 1280px in plain words. Do not change
anything yet.
```

**Reject a conflicting skill suggestion**

```text
A design skill suggested something that conflicts with DESIGN.md. DESIGN.md wins. Keep the
current rule, list what you rejected and why, and continue.
```

**Fix a visual problem by quoting a rule**

```text
This breaks DESIGN.md section X.Y: <quote the rule>. Fix only that, keep every other style,
and report the changed files and a plain-words description of the result.
```

---

## 24. Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-11-23 | Initial design system from Phase 1 |
| 1.1 | 2026-11-23 | Added page composition rules for the home page redesign |
| 2.0 | 2026-11-23 | Full rewrite: measured contrast, inner page patterns, data presentation, forms, case studies, blog, admin, states, SEO, voice, checklists, prompts |
| 2.1 | 2026-11-23 | Added section 2.8 color rationale with sources and chart-safety method; logged the dark chart-4 issue |
| 2.2 | 2026-11-24 | Synced the type scale, section padding, grid and ledger breakpoints, tag spacing and home structure to the built home page; added `--primary-hover`; logged the Phase 2.5 items in section 21 |
| 2.3 | 2026-11-24 | Header revision: availability line, Contact primary action, hover underline, richer mobile sheet with identity header and footer; Contact moved from the nav row to the action |
| 2.4 | 2026-11-24 | Home hero action group (§8.5): one wrapped row with primary + outline + ruled tertiary, Button scale rebuilt (xs 28 / sm 36 / default 44 / lg 48) and duplicate focus ring removed |

End of file.