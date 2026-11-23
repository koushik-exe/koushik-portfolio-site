# Phase 1 Foundation Implementation Plan

> **For agentic workers:** Executed inline in this session per `executing-plans`. Steps use `- [ ]`. The user reviews the code before committing; there are no commit steps.

**Goal:** Ship the visual and structural foundation of the portfolio — design tokens in both themes, fonts, theme switching, Lenis smooth scroll, navbar, footer, base layout — with `/` as a minimal placeholder.

**Architecture:** One `globals.css` token layer (`:root` / `.dark`) mapped into Tailwind v4 via `@theme inline`; three `next/font` families; two small client providers (theme, smooth scroll); a server-rendered header/footer with client-only interactive leaves (nav links, mobile Sheet, toggle). No page content beyond the placeholder.

**Tech Stack:** Next.js 16.4.6 App Router, React 19, Tailwind CSS 4.3, shadcn/ui (Nova), next-themes, Lenis 1.3.

**Spec:** `AGENTS.md` (project spec) and `PROFILE.md` (content). Design direction chosen in conversation: **1a editorial/quiet, 2a light-first, 3a deep blue, 4b serif headings + sans body, 5b balanced density, 6b subtle motion**.

## Global Constraints

- Only new package: `next-themes` (required by the spec, currently missing). shadcn component: `sheet`. Nothing else.
- No commits. No About/Projects/Blog/Experience/Contact/Admin routes.
- No GSAP or Motion this phase; Lenis is the only motion library.
- No hard-coded colors outside `globals.css`; components use semantic utilities (`bg-background`, `text-muted-foreground`, `text-link`, …).
- Server Components by default; `"use client"` only for providers and interactive leaves.
- Copy only from `PROFILE.md`. No phone number or personal email anywhere.
- Finish with `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.

## Design Decisions Locked Here

- Mood: quiet editorial / Swiss-minimal. Warm paper background, near-black ink, hairline rules, generous whitespace, almost no cards.
- Type: **Source Serif 4** headings, **Inter** body/UI, **JetBrains Mono** labels and numerals.
- Accent: deep blue `#1D4ED8` for links/focus, navy `#13213C` for solid primary surfaces.
- Radius: `0.375rem` (6px) base; small radii everywhere.
- Density: 1200px container, 20/32/48px gutters, 4rem/6rem/8rem section rhythm.
- Motion: 150–250ms, ease-out, no ambient motion; Lenis disabled under `prefers-reduced-motion`.

## Review Focus

1. **First paint of the theme toggle:** no hydration mismatch; the button has a valid accessible name and a stable 40–44px footprint before and after mount.
2. **Reduced motion:** Lenis is never instantiated when `prefers-reduced-motion: reduce`; changing the OS setting at runtime starts/stops it without a reload.
3. **Keyboard path:** skip link is the first tab stop, focus is visible on every nav/footer/toggle target, Sheet traps focus, Escape closes it and returns focus to the trigger.
4. **Contrast in both themes:** muted text ≥4.5:1, links ≥4.5:1, borders visible.
5. **Sticky header vs. skip target:** `#main` is not hidden under the 64/72px header after the skip link activates.

---

### Task 1: Dependencies, tokens, fonts

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/globals.css`
- Add: `src/components/ui/sheet.tsx` (via CLI)
- Modify: `package.json` (next-themes)

**Interfaces:**
- Produces: `inter`, `sourceSerif`, `jetbrainsMono` font objects from `@/lib/fonts`, each exposing `.variable` (`--font-inter`, `--font-source-serif`, `--font-jetbrains-mono`) and `.className`.
- Produces: CSS tokens in `:root`/`.dark` and Tailwind utilities `font-heading`, `text-link`, `text-link-hover`.

- [ ] **Step 1: Install the one required package and the Sheet primitive**

Run: `npm install next-themes` then `npx shadcn@latest add sheet`
Expected: `next-themes` in dependencies; `src/components/ui/sheet.tsx` exists; no unexpected dependencies.

- [ ] **Step 2: Write `src/lib/fonts.ts`**

Import `Inter`, `Source_Serif_4`, `JetBrains_Mono` from `next/font/google`. Each: `subsets: ["latin"]`, `display: "swap"`, explicit variable name. Export all three.

- [ ] **Step 3: Rewrite `src/app/globals.css`**

Keep the three imports and `@custom-variant dark`. Extend `@theme inline` with:
`--font-sans: var(--font-inter)`, `--font-heading: var(--font-source-serif)`, `--font-mono: var(--font-jetbrains-mono)`, `--color-link: var(--link)`, `--color-link-hover: var(--link-hover)`.

Light tokens: background `#FAFAF7`, foreground `#17191E`, card/popover `#FFFFFF`, primary `#13213C`, primary-foreground `#FAFAF7`, secondary `#EDECE6`, muted `#F0EFE9`, muted-foreground `#565A63`, accent `#E7EBF3`, accent-foreground `#13213C`, destructive `#B42318`, border `#E2E0D8`, input `#D6D3C9`, ring `#1D4ED8`, link `#1D4ED8`, link-hover `#163FA8`, radius `0.375rem`. Five chart colors: `#13213C`, `#1D4ED8`, `#0E7490`, `#A16207`, `#6B7280`.

Dark tokens: background `#0D1016`, foreground `#ECEDEF`, card/popover `#12161E`, primary `#ECEDEF`, primary-foreground `#0D1016`, secondary `#1A1F29`, muted `#171C25`, muted-foreground `#A3A9B5`, accent `#1B2230`, accent-foreground `#ECEDEF`, destructive `#F97066`, border `#242A35`, input `#2B323F`, ring/link `#9DBBFF`, link-hover `#C2D4FF`. Charts: `#9DBBFF`, `#5EEAD4`, `#F5C97B`, `#C4B5FD`, `#94A3B8`.

Map sidebar tokens to matching values. Base layer: `html { @apply font-sans; }`, `body { @apply bg-background text-foreground antialiased; }`, `* { @apply border-border outline-ring/50; }`, `::selection` uses accent tokens, and a reduced-motion rule that forces `scroll-behavior: auto` and shortens transitions.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0. (Fonts are not used yet, so this only proves the module parses.)

---

### Task 2: Site config, theme provider, smooth scroll, toggle

**Files:**
- Create: `src/lib/site.ts`
- Create: `src/components/providers/theme-provider.tsx`
- Create: `src/components/providers/smooth-scroll.tsx`
- Create: `src/components/theme-toggle.tsx`

**Interfaces:**
- Produces: `siteConfig` with `name: "Koushik C"`, `title`, `description`, `location`, `nav: readonly NavItem[]`, `social: { github, linkedin }`.
- Produces: `ThemeProvider({ children })`, `SmoothScroll({ children })`, `ThemeToggle()` (no props).
- Consumes: `next-themes`, `lenis`, `lucide-react`, tokens.

- [ ] **Step 1: `src/lib/site.ts`**

`description` paraphrases PROFILE: "Entry-level data analyst with an MBA in Business Analytics, using SQL, Python and Excel to turn raw data into business insight." Nav order: Home `/`, About `/about`, Projects `/projects`, Blog `/blog`, Experience `/experience`, Contact `/contact`. Social URLs exactly `https://github.com/koushik-exe` and `https://www.linkedin.com/in/koushik-c-data-analyst`.

- [ ] **Step 2: `ThemeProvider`**

`"use client"`; wraps `NextThemesProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.

- [ ] **Step 3: `SmoothScroll`**

`"use client"`; `useEffect` with a `matchMedia("(prefers-reduced-motion: reduce)")` check. If reduced, do not construct Lenis. Otherwise `new Lenis({ autoRaf: true, smoothWheel: true, anchors: false, respectReducedMotion: true })`. Add a `change` listener that destroys/creates accordingly; cleanup destroys and removes the listener. Render `{children}`.

- [ ] **Step 4: `ThemeToggle`**

`"use client"`; mounted flag to avoid hydration mismatch; icon is Moon in light, Sun in dark; both from lucide-react; `aria-hidden` on the SVG; dynamic `aria-label` ("Switch to dark theme" / "Switch to light theme") and `title`; `type="button"`; ghost Button; 44px on mobile, 36px from `md`; visible focus ring; `onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}`.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

### Task 3: Navbar and footer

**Files:**
- Create: `src/components/nav-link.tsx`
- Create: `src/components/mobile-nav.tsx`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`

**Interfaces:**
- Produces: `NavLink({ href, label })`, `MobileNav()`, `SiteHeader()`, `SiteFooter()`.
- Consumes: `Button`, `Sheet*`, `siteConfig`, `ThemeToggle`.

- [ ] **Step 1: `NavLink`**

`"use client"`; `usePathname`; `Link`; `aria-current="page"` when the path equals `href` (or starts with `href + "/"` for non-root); muted by default, foreground on hover, foreground + underline offset when current; focus-visible ring on a rounded hit area; `className` merged with `cn`.

- [ ] **Step 2: `MobileNav`**

`"use client"`; `Sheet` + `SheetTrigger` (ghost Button, Menu icon, `aria-label="Open navigation menu"`, `size-11 md:hidden`), `SheetContent side="right"` at `w-[85%] max-w-xs`, `SheetHeader` with `SheetTitle` "Navigation" and an `sr-only` `SheetDescription`. Each item is `SheetClose asChild` wrapping `Link`, 48px row, hairline divider, focus ring. `nav aria-label="Mobile"`.

- [ ] **Step 3: `SiteHeader`**

Server component. Sticky, `top-0 z-50`, `border-b border-border`, `bg-background/85 backdrop-blur`. Inner `mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12`. Brand is a `Link` with serif wordmark "Koushik C" and a `lg`-only mono "Data Analyst" label separated by a hairline. Desktop nav `hidden md:flex` with `gap-7`, `aria-label="Primary"`. Right cluster: `ThemeToggle` + `MobileNav`.

- [ ] **Step 4: `SiteFooter`**

Server component. `border-t border-border`; inner container with `py-8`, stacked on mobile and one row from `md`. Left: `© {year} Koushik C.` in muted small text. Right: GitHub and LinkedIn links with 16px lucide icons (`aria-hidden`), visible labels, `target="_blank"`, `rel="noreferrer noopener"`, external-link affordance not required, focus ring. No email/phone.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

### Task 4: Root layout and home placeholder

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: fonts, providers, `SiteHeader`, `SiteFooter`, `siteConfig`.
- Produces: the page shell with header/main/footer landmarks.

- [ ] **Step 1: Rewrite `layout.tsx`**

`Metadata`: title `{ default: "Koushik C — Data Analyst", template: "%s | Koushik C" }`, description from `siteConfig`, applicationName, authors. `<html lang="en" suppressHydrationWarning className={all font variables}>`; `<body className="flex min-h-dvh flex-col">`. Inside: `ThemeProvider` → `SmoothScroll` → skip link → `SiteHeader` → `<main id="main" tabIndex={-1} className="flex-1 scroll-mt-24 outline-none">` → `SiteFooter`.

- [ ] **Step 2: Skip link**

First focusable element, `sr-only` until focused, then fixed at top-left with background, padding, radius, and a 2px ring. Label "Skip to content", href `#main`.

- [ ] **Step 3: Home placeholder**

Centered vertically within the main area, container aligned to the same grid: `h1` "Koushik C" in heading serif at `text-5xl sm:text-6xl lg:text-7xl`, tight leading/tracking; below it one `p` with the exact PROFILE title "Data Analyst | SQL, Excel & Python | MBA in Business Analytics" in muted text, balanced measure. Nothing else.

- [ ] **Step 4: Build smoke test**

Run: `npx tsc --noEmit` then `npm run build`
Expected: both exit 0; `/` renders statically.

---

### Task 5: Design documentation

**Files:**
- Create: `DESIGN.md`
- Modify: `AGENTS.md` (one line)

- [ ] **Step 1: Write `DESIGN.md`**

Mood and anti-goals; color tables with the exact hex values above for light and dark; font roles and scale; spacing/container/radius rules; motion rules (durations, easing, reduced-motion policy); component conventions (header height, hairline dividers, link/focus treatment, no shadows, no decorative gradients). Note that changing a token means changing `globals.css` and this file together.

- [ ] **Step 2: Add the pointer line to `AGENTS.md`**

`Design system (tokens, type, spacing, motion): see DESIGN.md. It is the source of truth for all later phases.` placed directly after the Overview paragraph.

---

### Task 6: Verification and review

- [ ] **Step 1: `npx tsc --noEmit`** — exit 0.
- [ ] **Step 2: `npm run lint`** — exit 0, no new warnings.
- [ ] **Step 3: `npm run build`** — exit 0, `/` static.
- [ ] **Step 4: Grep for hard-coded colors** in `src/components` and `src/app` (excluding `globals.css`) — none.
- [ ] **Step 5: `verification-before-completion`** — record the actual command output.
- [ ] **Step 6: `web-design-guidelines`** — review landmarks, heading order, focus, contrast, reduced motion, 375px behavior; fix findings.
- [ ] **Step 7: Report** files, check results, 375px/1280px description, open questions. Stop.
