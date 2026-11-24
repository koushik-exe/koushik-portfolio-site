# Status

Updated 2026-11-24, after the Phase 4 projects index and case studies shipped.

## Shipped

- Phase 1: tokens, fonts, theme and Lenis providers, sticky header, desktop nav, mobile sheet, footer, skip link.
- Phase 2: home page in the editorial layout, copy from `PROFILE.md`.
- Phase 2.5: accessibility and design-system cleanup (buttons, focus rings, mobile-nav current state, sheet motion, list bullets, radii, footer icon, tag spacing, README, `.env.example`, primary hover token).
- Phase 2.6: header revision. Role label at `md`; five inline nav items at `lg`; hover underline; the sheet serves tablet and mobile. `DESIGN.md` 4.5, 9.1–9.4, 12.1 in sync.
- Phase 2.7: home refinement.
- Phase 3: `/about` and `/experience` built from `PROFILE.md` (story, timeline, education, skills; resume PDF download TODO).
- Phase 4: `/projects` index (page header, filter bar by tool with count label, ruled rows per home page, static data) and `/projects/[slug]` case studies (breadcrumb, meta row, Summary/Problem/Approach/Tools/Result sections in 15.2 order; null sections omitted), custom 404 page.

## Verification

- `npx tsc --noEmit`: pass
- `npm run lint`: pass
- `npm run build`: pass; routes generated: `/`, `/_not-found`, `/about`, `/experience`, `/projects`, `/projects/fileflow`, `/projects/n8n-ai-career-platform`, `/projects/developer-portfolio-website`, `/contact`, `/blog`

## Not built yet

- Custom 404, loading and error states beyond the 404 page in Phase 4 (Phase 10)
- `/contact` — stub; validated form and Server Action (Phase 5)
- `/blog` — stub; posts (Phase 8)
- Testimonials stay hidden until real ones exist

## Open

- `/contact`, `/blog` and `/admin` are still stubs; real content lands in Phases 5, 8 and 7.
- Resume PDF is gitignored and untracked until a Git-based deploy hosts it.
- The closing "Contact me" still points at the `/contact` stub until Phase 5.

## Content still needed (Phase 4)

- FileFlow: problem statement and what I learned.
- n8n AI Career Platform v2: problem statement and what I learned.
- Developer Portfolio Website: what I learned; add a repository link when one exists.

## Rule

- Do not deploy publicly until every navigation target exists (DESIGN 9.2).
