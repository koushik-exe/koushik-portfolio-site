# Phase 11 - Home page bento direction

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 2.8 (1.3, 3.2, 5.3, 5.6, 5.7, 5.9, 6.5, 15.1,
19.3, 21, 22.8, 25), `docs/DESIGN-PLAN.md`, `docs/STATUS.md`.
Docs first, then one element per session. Do not commit. One item at a time; run
`npx tsc --noEmit` before ticking a code item.

## Step 1 - Plan (read-only)

- [x] 11.1 Read the docs, audit the home page and verify PROFILE line numbers; report the
  E1-E10 plan; approved 2026-11-28 with the decisions in `docs/DESIGN-PLAN.md` section 3.

## Step 2 - Docs (no source files)

- [x] 11.2 Add `DESIGN.md` section 25 and the edits to 1.3, 3.2, 5.3, 5.6, 5.7, 5.9, 6.5,
  15.1, 19.3, 21, 21.1, 22.8 and 24; bump to 2.8.
- [x] 11.3 Write `docs/DESIGN-PLAN.md` with the E1-E10 briefs, board states, content
  inventory, gates and open questions.
- [x] 11.4 Add this checklist; keep Phase 10 below as an archive and move 10.14 to
  "Carried over". Fix the false note on 10.14: `prisma/seed.ts` still imports
  `featuredProjects` from `src/lib/projects.ts`.
- [x] 11.5 Update `docs/STATUS.md` (under 60 lines) with the Phase 11 docs state.
- [x] 11.6 Verify docs only: `git status` lists no `src/` change and `npx tsc --noEmit` passes.

## Step 3 - Build (one element per session, after "approved")

- [x] 11.7 E1 bento board, `BentoCard`, `src/lib/identity.ts`, identity card (span 12 only)
- [ ] 11.8 E7 button usage: default, secondary, ghost; secondary border via className
- [ ] 11.9 E2 terminal card (span 5); board becomes 7 + 5
- [ ] 11.10 E3 record card (span 5); identity spans two rows
- [ ] 11.11 E4 FileFlow card (span 6)
- [ ] 11.12 E5 n8n card (span 6); project row complete
- [ ] 11.13 E6 toolkit card with chips (span 12)
- [ ] 11.14 E8 shape accents, one per section
- [ ] 11.15 E9 section transitions via `Reveal`; 8/250 at 375, 12/300 at 1280; no GSAP
- [ ] 11.16 E10 contact card and quieter header CTA on `/`
- [ ] 11.17 Final pass: tsc, lint, tests, build; keyboard, reduced motion, both themes,
  320/375/768/1280; update `DESIGN.md` 21 and `docs/STATUS.md`; no commit.

## Carried over

- [ ] 10.14 Move seed data into `prisma/` and delete `src/lib/projects.ts`; `seed.ts` still
  imports `featuredProjects`, so update the import before deleting.

---

## Phase 10 - SEO and launch (complete except 10.14)

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
- 10.14 moved to "Carried over" at the top of this file.

---

## Completed (previous phases)

- Phase 9 - Animation (Motion + GSAP, reduced motion) (see docs/STATUS.md).
- Phase 8 - Blog with MDX (see docs/STATUS.md).
- Phase 7 - Auth.js and the admin dashboard (see docs/STATUS.md).
- Phase 6 - Database with Prisma 7.10.1 + Neon (see docs/STATUS.md).

