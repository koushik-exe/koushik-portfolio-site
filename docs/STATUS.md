# Status

Updated 2026-11-24, after Phase 5 shipped the `/contact` page.

## Shipped

- Phase 1: tokens, fonts, theme and Lenis providers, sticky header, desktop nav, mobile sheet, footer, skip link.
- Phase 2: home page in the editorial layout, copy from `PROFILE.md`.
- Phase 2.5: accessibility and design-system cleanup (buttons, focus rings, mobile-nav current state, sheet motion, list bullets, radii, footer icon, tag spacing, README, `.env.example`, primary hover token).
- Phase 2.6: header revision. Role label at `md`; five inline nav items at `lg`; hover underline; the sheet serves tablet and mobile. `DESIGN.md` 4.5, 9.1–9.4, 12.1 in sync.
- Phase 2.7: home refinement.
- Phase 3: `/about` and `/experience` built from `PROFILE.md` (story, timeline, education, skills; resume PDF download TODO).
- Phase 4: `/projects` index (page header, filter bar by tool with count label, ruled rows per home page, static data) and `/projects/[slug]` case studies (breadcrumb, meta row, Summary/Problem/Approach/Tools/Result sections in 15.2 order; null sections omitted), custom 404 page.
- Phase 5: `/contact` — intro, form (name, email, message, optional subject, honeypot), shared Zod schema `src/lib/schemas/contact.ts`, Server Action `src/lib/actions/contact.ts` sending via Resend to `CONTACT_EMAIL` with reply-to set to the visitor, rate limiting via Upstash (5 per 10 minutes per IP, in-memory fallback in development), status tokens `--success`/`--warning` (DESIGN 2.3), Vitest tests for the schema.

## Verification

- `npx tsc --noEmit`: pass
- `npm run lint`: pass
- `npm run build`: pass; routes generated: `/`, `/_not-found`, `/about`, `/experience`, `/projects`, `/projects/fileflow`, `/projects/n8n-ai-career-platform`, `/projects/developer-portfolio-website`, `/contact`, `/blog`
- `npm test`: 12 passed (schema tests)

## Not built yet

- `/blog` — stub; posts (Phase 8)
- Testimonials stay hidden until real ones exist

## Open

- /contact fails closed in production when the Upstash variables are missing (generic error + server log).

- `CONTACT_FROM` is Resend's default test sender. Change it to a verified custom domain before sending to anyone else.

- TODO (Phase 6): update the /contact privacy note - it currently says the IP is used briefly to limit spam; when messages are saved to the database, state the new facts.

## Rule

- Do not deploy publicly until every navigation target exists (DESIGN 9.2).
