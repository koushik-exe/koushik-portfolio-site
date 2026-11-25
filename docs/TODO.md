# Phase 10 - SEO and launch

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 2.7, 8.5, 10.4, 19, 21, 22.7; `docs/STATUS.md`.
Do not commit. One item at a time; run `npx tsc --noEmit` before ticking an item.

## Step 1 - Plan (read-only)

- [x] 10.1 Read the required docs, audit the current SEO/launch state, report the Phase 10 plan; approved 2026-11-25 with defaults 1-6.

## Step 2 - Build (after "approved")

- [x] 10.2 Add site URL and SEO metadata helpers; add canonicals, OG/Twitter defaults and 120-160 char descriptions to every public page.
- [x] 10.3 Add `sitemap.ts`, `robots.ts`, pure sitemap tests and `/sitemap.xml` revalidation.
- [x] 10.4 Add the shared OG renderer, stable `/opengraph-image` and `/twitter-image` route handlers, and the Source Serif 4 asset.
- [x] 10.5 Add `icon.svg`, remove the default favicon, add viewport theme color + `ThemeColorSync`, and mount Vercel Analytics.
- [x] 10.6 Add Person JSON-LD, privacy checks and reject `mailto:` in MDX `safeHref`.
- [x] 10.7 Add `src/lib/resume.ts`, conditional resume CTAs and `RESUME_URL` in `.env.example`.
- [x] 10.8 Add `RouteFocus`, fix project-section labels and complete the accessibility audit.
- [x] 10.9 Create `docs/LAUNCH.md` with env, deploy, OAuth, Resend, Neon, resume, smoke-test and Lighthouse sections.
- [x] 10.10 Update `DESIGN.md`, `docs/STATUS.md` (< 60 lines) and this checklist.
- [x] 10.11 Run `npx tsc --noEmit`, lint, tests and build; smoke-test and revert the sample draft. Verified locally: tsc/lint/tests/build pass; routes, OG images and sitemap/robots correct; draft 200 when published, 404 after revert.
- [x] 10.12 Record the manual Lighthouse and launch checklist results; Lighthouse recorded as not run. Local pre-deploy record added to `docs/LAUNCH.md`.
- [x] 10.13 Final review and report; do not commit. Final review: diffs inspected for the new files; DOCs/STATUS and LAUNCH record the local results; public privacy scan clean (outside tests/docs); resume PDF exists but is gitignored; no commits made.
- [ ] 10.14 Move seed data into `prisma/` and delete `src/lib/projects.ts` (seed.ts no longer reads it; check nothing else imports it).

---

## Completed (previous phases)

- Phase 9 - Animation (Motion + GSAP, reduced motion) (see docs/STATUS.md).
- Phase 8 - Blog with MDX (see docs/STATUS.md).
- Phase 7 - Auth.js and the admin dashboard (see docs/STATUS.md).
- Phase 6 - Database with Prisma 7.10.1 + Neon (see docs/STATUS.md).

