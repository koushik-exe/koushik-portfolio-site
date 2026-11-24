# Status

Updated 2026-11-24, after the Phase 2.5 cleanup pass and the primary-hover approval.

## Shipped

- Phase 1: tokens, fonts, theme and Lenis providers, sticky header, desktop nav, mobile sheet, footer, skip link.
- Phase 2: home page in the editorial layout, copy from `PROFILE.md`.
- Phase 2.5: accessibility and design-system cleanup (buttons, focus rings, mobile-nav current state, sheet motion, list bullets, radii, footer icon, tag spacing, README, `.env.example`, primary hover token).

## Verification

- `npx tsc --noEmit`: pass
- `npm run lint`: pass
- `npm run build`: pass; `/` prerendered, `/_not-found` generated

## Not built yet

- `/about`, `/experience` (Phase 3)
- `/projects`, `/projects/[slug]` (Phase 4)
- `/contact` (Phase 5)
- `/blog` (Phase 8)
- Custom 404, loading and error states (Phase 10)
- Testimonials stay hidden until real ones exist

## Open

- `DESIGN.md` section 21 lists the remaining decisions and their phases.
- The resume PDF is gitignored and untracked, so a Git-based deploy will 404 on the download until it is hosted.

## Rule

- Do not deploy publicly until every navigation target exists (DESIGN 9.2).
