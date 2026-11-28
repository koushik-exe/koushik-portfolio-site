# Status

Updated 2026-11-28, after the Phase 11 docs rebuild.

## Shipped

- Phase 1: tokens, fonts, theme and Lenis providers, header, nav, footer, skip link.
- Phase 2: home page; accessibility cleanup; header revision; home refinement.
- Phase 3: `/about` and `/experience` (story, timeline, education, skills).
- Phase 4: `/projects` index and `/projects/[slug]` case studies; custom 404.
- Phase 5: `/contact` form, shared Zod schema, Resend, Upstash rate limit; messages saved to Neon.
- Phase 6: Prisma 7.10.1 + Neon; Project, Post, Testimonial, Message; seed script; public projects read from the database.
- Phase 7: Auth.js v5 GitHub OAuth, admin root layout, `proxy.ts` + `requireAdmin()`, CRUD, messages, conditional testimonials.
- Phase 8: `/blog` and `/blog/[slug]` with guarded MDX, GFM, heading ids, DataTable/BarChart/LineChart and a `noindex` admin preview. One unpublished sample draft is seeded.
- Phase 9: Motion `Reveal` islands, home GSAP ScrollTrigger rows, reading progress, 400ms chart draw-in; reduced motion and no-JS keep the final state.
- Phase 10: `metadataBase` + canonicals + 120-160 character descriptions, OG/Twitter cards, `sitemap.ts`, `robots.ts`, Person JSON-LD, `icon.svg`, theme-color sync, public-only Vercel Analytics, conditional resume CTA, route-change focus, and `docs/LAUNCH.md`.

## In progress

- Phase 11, home page bento / data-room direction: docs only. `DESIGN.md` 2.8 adds section 25
  and states the 1.3 / 5.3 card exception in words; `docs/DESIGN-PLAN.md` holds E1-E10;
  `docs/TODO.md` holds the checklist. No source file changed yet.
- The home page still uses the Phase 2/9 layout. The h1 stays 48/60/72 until E1 lands 40/48/56.
- Build order: E1, E7, E2, E3, E4, E5, E6, E8, E9, E10. One element per session, then stop.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm test` (87 tests) and `npm run build`: pass.
- Production-build smoke test: all public routes 200, missing project and unpublished draft 404, OG/Twitter images 200 PNG 1200x630, sitemap/robots correct, admin redirect + `noindex` + no analytics, privacy scan clean.
- Draft published temporarily for testing, then reverted: `published=false`, `publishedAt=null`.
- Lighthouse: not run; manual Chrome run on the deployed URL is in `docs/LAUNCH.md`.
- Not browser-tested locally: live contact send, manual theme toggle, keyboard route focus.
- Phase 11 docs: `npx tsc --noEmit` passes and `git status` shows no `src/` change.

## Vercel setup

Set `DATABASE_URL` (pooled), `DATABASE_URL_UNPOOLED` (direct), `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `ADMIN_GITHUB_ID`, `CONTACT_EMAIL`, `CONTACT_FROM`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `NEXT_PUBLIC_SITE_URL` for Production. `RESUME_URL` is optional and hides the resume CTA when unset. The GitHub OAuth callback is `https://<site>/api/auth/callback/github`. Full runbook: `docs/LAUNCH.md`.

## Launch blockers

- No real blog posts; the seeded sample stays an unpublished draft.
- No real consented testimonials; the page is hidden and `noindex`.
- The resume PDF is out of date and gitignored; host a current copy before setting `RESUME_URL`.
- `CONTACT_FROM` still uses Resend's test sender until a domain is verified.
- Lighthouse has not been run, so the 19.2 targets are unverified.

## Not built yet

- Security headers/CSP, PWA manifest, Speed Insights.
- Real content beyond the sample draft and `PROFILE.md` facts.
- Phase 11 bento board and cards (E1-E10).

## Rule

- Do not deploy publicly until every navigation target exists and the launch checklist passes.
