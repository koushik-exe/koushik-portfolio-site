# Phase 6 — Database with Prisma and Neon (Plan → Build → Handoff)

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 15.2, 16.4, 14.5, 21; `docs/STATUS.md`;
Prisma 7.10.1 docs (v7); `package.json`; `src/lib/projects.ts`; `prisma.config.ts`.
Phase 5 shipped. Neon project and `DATABASE_URL` (pooled) + `DIRECT_URL` (direct) in `.env` (user).
No installs yet. Do not commit. One item at a time; run `npx tsc --noEmit` before ticking an item.
No todo tool is available; this file is the tracker.

## Step 1 — Plan only (stop for approval)

- [ ] 1.1 Versions: installed (`prisma` 8.0.0-rc.34 CLI, `@prisma/client` 7.10.1); approved: **`prisma@7.10.1` + `@prisma/client@7.10.1`** (both published 2026-10-15; do not install `@prisma/orm-postgres`).
- [ ] 1.2 Install commands: `npm install prisma@7.10.1 @prisma/client@7.10.1`; `npm install dotenv@18.0.10` (2026-11-09); `npm install @prisma/adapter-neon@7.10.1`; `npm install -D tsx@4.23.15` (2026-09-20).
- [ ] 1.3 Generate: `npx prisma generate` (v7 emits the client into the generator `output`).
- [ ] 1.4 Client connection on Vercel + Neon: `.env` `DATABASE_URL` = pooled, `DIRECT_URL` = direct; `prisma.config.ts` `datasource.url = env("DIRECT_URL")`; `src/lib/db.ts` = `new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) })`. Why `@prisma/adapter-neon`.
- [ ] 1.5 `prisma.config.ts` changes: current file uses `definePrismaConfig` + a `skills` key — Prisma 7.10.1's `prisma/config` exports `defineConfig`, `env` only (verified against the packed tarball); new v7 config (report in the plan). Postinstall `prisma skills sync` removal (report why).
- [ ] 1.6 `package.json` changes: pin versions to 7.10.1; add `"type": "module"`; remove the postinstall script.
- [ ] 1.7 Revised schema `prisma/schema.prisma` (v7): Message (no `ip`; `read` added), Project (`published` default true, `featured` default false, `sortOrder` default 0; `links` flattened to `repository`/`live`), Post (`date` dropped; `publishedAt` is the displayed date; `@@index([published])` + `@@index([publishedAt])`), all models get `createdAt`/`updatedAt`, Testimonial has no slug. Reconcile `type`/`status`/`result` with `src/lib/projects.ts`.
- [ ] 1.8 Seed plan: `prisma/seed.ts` idempotent (upsert by `slug`, never delete); run `npx prisma db seed`.
- [ ] 1.9 Migration commands (tell you before running): `npx prisma migrate dev --name init` (first, on the empty Neon DB); later `npx prisma migrate dev --name <name>`; `npx prisma migrate deploy` for Vercel. Note the shadow DB permission requirement.
- [ ] 1.10 Stop; write no code until the user replies with the exact word "approved".

## Step 2 — Build (only after "approved")

- [x] 2.1 Align versions: install the approved set (`prisma@7.10.1`, `@prisma/client@7.10.1`, `dotenv@18.0.10`, `@prisma/adapter-neon@7.10.1`, `tsx@4.23.15` dev); pin `prisma` + `@prisma/client` to `7.10.1` in `package.json`; add `"type": "module"`; remove the postinstall.
- [x] 2.2 Write `prisma/schema.prisma` (revised for Prisma 7) and rewrite `prisma.config.ts` to the v7 shape (§5).
- [x] 2.2a Sanity: `npx tsc --noEmit` passes. (`npx prisma validate` failed only on missing `DIRECT_URL` — see 2.3.)
- [ ] 2.3 Run the first migration: `npx prisma migrate dev --name init` — BLOCKED until the user confirms the `.env` with `DATABASE_URL`/`DIRECT_URL` is in place.
- [ ] 2.4 `npx prisma generate`.
- [ ] 2.5 `src/lib/db.ts`: server-only Prisma client singleton (`PrismaNeon` + `DATABASE_URL`).
- [ ] 2.6 `src/lib/data/*.ts`: server-only read functions (`getPublishedProjects`, `getFeaturedProjects`, `getProjectBySlug`, `getPublishedPosts`, `getPublishedTestimonials`); pages read published rows only.
- [ ] 2.7 `prisma/seed.ts`: idempotent upsert of the three Projects from `src/lib/projects.ts`; run `npx prisma db seed`.
- [ ] 2.8 Switch `/projects`, `/projects/[slug]` and home featured to the DB (static, `generateStaticParams`, `revalidate`).
- [ ] 2.9 Contact Server Action: save messages to `Message` (save failure must not block the email; email failure must not lose the saved message). Update the `/contact` privacy note.
- [ ] 2.10 Document env vars in `.env.example` + Vercel setup steps in `docs/STATUS.md`.

## Step 3 — Handoff

- [ ] 3.1 Update `docs/STATUS.md` (under 60 lines).
- [ ] 3.2 Add differences to `DESIGN.md` section 21.
- [ ] 3.3 Run `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`; fix all errors.
- [ ] 3.4 Report files changed, migration commands run, and a before/after comparison of the project pages.

---

## Completed

(Previous phase tracker — see the pre-revision file: Phase 5 — Contact page, form, Server Action, email, spam protection; plus Phase 4, Phase 3, Phase 2.5/2.6/2.7.)
