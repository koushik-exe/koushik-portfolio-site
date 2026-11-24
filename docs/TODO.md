# Phase 5 — Contact page, form, Server Action, email, spam protection

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 2.3, 14, 12.2, 8.2, 10.2, 11; `docs/STATUS.md`.
No database yet (Phase 6). No new packages. Do not modify other pages. Do not commit.
No todo tool is available, so this file is the tracker.

Current item: 1.4

## Step 1 — Copy and plan only (stop for approval)

- [x] 1.1 Revised `/contact` copy per Koushik's changes: intro (max 3 sentences) = "You can send a message through this form. I’m based in Karur, Tamil Nadu, and I’m open to relocating to Chennai, Bengaluru or Coimbatore." Privacy note: "Your message is used only to reply." No employer, email or phone on this page.
- [x] 1.2 Newline rejection applies to name, email and subject only; the message field allows line breaks.
- [x] 1.3 Honeypot-filled → normal success result; nothing sent and the rate limiter is not touched.
- [x] 1.4 Rate-limit IP: first comma-separated value of `x-forwarded-for`, trimmed, then `x-real-ip`, then a fixed fallback.
- [x] 1.5 Add `autocomplete="name"` to the name field and `autocomplete="email"` to the email field.
- [x] 1.6 `CONTACT_FROM`: Resend default test sender. Delivery target is `CONTACT_EMAIL`. STATUS.md will document that a verified domain is required before sending to anyone else. No domain asked now.
- [x] 1.7 (earlier) Checked the current Resend docs: the default test sender uses the `resend.dev` domain, which "can only send to the email address associated with your Resend account" (403 if you try to send elsewhere).
- [x] 1.8 Home audit: hero pitch replaced in `src/components/home/home-hero.tsx` with the approved text; skills stated separately from the role.

## Step 2 — Build (Phase 5)

Current item: 3.4 (report follows)

- [x] 2.1 Add `--success` and `--warning` tokens to `globals.css` and DESIGN 2.3, with measured contrast in both themes. (Measured: success/background 5.12 light / 12.87 dark; warning/background 4.71 light / 12.26 dark — all pass. Verified with the WCAG relative luminance formula.)
- [x] 2.2 `src/lib/schemas/contact.ts`: one Zod schema shared by client and server. Name 1–100, valid email, message 10–2000, optional subject up to 120, a honeypot field that must be empty. Trim input; reject newlines in name, email and subject (header injection).
- [x] 2.3 Vitest setup: `vitest.config.ts`, a "test" script, and tests for the schema (valid, bad email, too short, too long, newline injection, honeypot filled). Pure logic only.
- [x] 2.4 Server Action: validate again on the server; rate limit with Upstash (5 per 10 minutes per IP using the forwarded IP header, with an in-memory fallback in development only); send with Resend to `CONTACT_EMAIL` with reply-to set to the visitor and a plain-text body. Return typed results and never expose internal errors. In production, missing env values fail safely with a generic message and a server log that contains no secrets.
- [x] 2.5 Form UI per DESIGN 14: labels above fields, 44px inputs, errors linked with `aria-describedby` and announced in a live region, focus moves to the first invalid field, a sending state, a success state that replaces the form, and a failure state that keeps the typed text. The honeypot is hidden from people and assistive technology.
- [x] 2.6 `/contact` page with unique metadata. Show GitHub and LinkedIn links only.

## Step 3 — Handoff

- [x] 3.1 Update `docs/STATUS.md` (under 60 lines).
- [x] 3.2 Add differences to DESIGN.md section 21.
- [x] 3.3 Run `npx tsc --noEmit`, `npm run lint`, `npm run build`; fix all errors.
- [x] 3.4 Report files changed, test results, plain-words descriptions at 375px and 1280px, and a manual test checklist. Do not commit.

## Completed

### Phase 4 — Projects index and project detail pages

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 7.1, 7.8, 9.6, 15.1, 15.2, 18.1, 21 and
`docs/STATUS.md`. Static, local data, no animation. One item at a time; run
`npx tsc --noEmit` before ticking an item. No todo tool is available, so this file is the
tracker. Do not commit.

Current item: 3.2 (in progress)

#### Step 1 — Data and copy only (stop for approval)

- [x] 1.1 Define the copy fields for all three projects (summary, problem, approach, tools, result, what I learned, links); no files changed except this tracker.
- [x] 1.2 Write FileFlow copy using only `PROFILE.md`; mark unknown facts `null`.
- [x] 1.3 Write n8n AI Career Platform v2 copy using only `PROFILE.md`; mark unknown facts `null`.
- [x] 1.4 Write Developer Portfolio Website copy using only `PROFILE.md`; mark unknown facts `null`.
- [x] 1.5 Write the `/projects` intro in at most two sentences, with no marketing words.
- [x] 1.6 Set every result to "No measured result yet." and list one question for each missing fact.
- [x] 1.7 Show the data and questions, then stop. Write no code until the reply is exactly `approved`.
- [x] 1.8 Apply the approval changes, show the revised data, stop.

#### Step 2 — Build (only after `approved`)

- [x] 2.1 Extend the type and data in `src/lib/projects.ts` with the approved copy; keep the three home-page slugs working.
- [x] 2.2 Build the `/projects` page header (DESIGN 7.1) and the approved intro.
- [x] 2.3 Build the tool filter bar derived from the data (DESIGN 7.8), with a count label, `aria-pressed` and keyboard operation; no animation.
- [x] 2.4 Build ruled project rows matching the home page rows (DESIGN 15.1); all rows in HTML, hidden client-side only.
- [x] 2.5 Build `/projects/[slug]`: breadcrumb (9.6), meta row (Type, Tools, Status, Links), sections in 15.2 order; omit null sections except Result.
- [x] 2.6 Add `generateStaticParams`, `notFound()` for unknown slugs, and unique metadata per page.
- [x] 2.7 Use the arrow icon and `rel="noopener noreferrer"` on every external link.
- [x] 2.8 Add a custom not-found page following DESIGN 18.1.
- [x] 2.9 Check `/projects` and one detail page at 375px and 1280px, both themes, keyboard focus and reduced motion.
- [x] 2.10 Run `npx tsc --noEmit`, `npm run lint`, `npm run build` and fix all errors.

#### Step 3 — Handoff

- [x] 3.1 Update `docs/STATUS.md` to under 60 lines.
- [x] 3.2 Record any code/DESIGN difference in `DESIGN.md` section 21.
- [x] 3.3 Re-run `npx tsc --noEmit`, `npm run lint`, `npm run build` after documentation edits.
- [x] 3.4 Report files changed and plain-words 375px/1280px descriptions, then stop. Do not commit.

### Phase 3 — About and Experience

Source: `AGENTS.md`, `PROFILE.md`, `DESIGN.md` 7.1–7.3. Work one item at a time; run
`npx tsc --noEmit` before ticking an item. Do not commit. No todo tool is available, so this
file is the tracker.

Current item: 1.4

#### Step 1 — Copy only (stop for approval)

- [x] 1.1 Compose `/about` copy: short intro, timeline (Business Associate, MBA, HDCA, BBA), skills, languages, based in, open to relocate.
- [x] 1.2 Compose `/experience` copy: Business Associate with the three `PROFILE.md` bullets, MBA, BBA, HDCA, and the resume link.
- [x] 1.3 Add the `TODO: ask Koushik` placeholder and list the questions that need a real answer.
- [x] 1.4 Show the copy and stop. Write no code until the reply is exactly `approved`.

#### Step 2 — Build (only after `approved`)

- [x] 2.1 Add the page-header pattern from DESIGN 7.1.
- [x] 2.2 Add the timeline pattern from DESIGN 7.2.
- [x] 2.3 Add the key-value rows from DESIGN 7.3.
- [x] 2.4 Build `/about` with unique metadata.
- [x] 2.5 Build `/experience` with unique metadata and the resume download.
- [x] 2.6 Reuse `src/lib/site.ts` and `src/lib/skills.ts`; add one shared timeline data file; do not touch the home page or any Phase 1/2 component.
- [x] 2.7 Check both pages at 375px and 1280px, both themes, keyboard focus and reduced motion.
- [x] 2.8 Run `npx tsc --noEmit`, `npm run lint`, `npm run build`.

#### Step 3 — Handoff

- [x] 3.1 Update `docs/STATUS.md` in under 60 lines.
- [x] 3.2 Add any new code/DESIGN difference to `DESIGN.md` section 21.
- [x] 3.3 Report files changed, check results, and plain-words 375px/1280px descriptions; stop.

#### Phase 2.5 — cleanup checklist

Source: the Phase 2 review report (sections 4 and 5). Work one item at a time; run
`npx tsc --noEmit` before ticking an item. Do not commit. No todo tool is available, so this
file is the tracker.

##### Code fixes

- [x] 1a. `button.tsx`: default height 44px and 20px horizontal padding; solid 2px `--ring` with 2px offset, not animated; remove press translate; outline uses `border-input`; destructive is solid.
- [x] 1b. Approved 2026-11-24: added `--navy-800` `#1B2E52` and `--slate-200` `#D8DBE0`, mapped `--primary-hover` in both themes, added `--color-primary-hover`, and switched the default button to `hover:bg-primary-hover`.
- [x] 2. `featured-projects.tsx`: focus-ring offset 2px.
- [x] 3. `mobile-nav.tsx`: underline the current page and set `aria-current`; trigger label "Open menu"; use the `--popover` background.
- [x] 4. `sheet.tsx`: slide duration 250ms; remove the overlay backdrop blur.
- [x] 5. `experience-snapshot.tsx`: en dash in date ranges; dates mono 14px with `tabular-nums`; replace `list-disc` with the designed bullet from DESIGN 7.5.
- [x] 6. `closing-cta.tsx` and any resume link: label "Download resume (PDF)".
- [x] 7. Replace `rounded-sm` (3.6px) with a token-based radius of at least 4px everywhere it appears.
- [x] 8. `site-footer.tsx`: arrow icon 16px. `site-header.tsx`: wordmark hover changes color, not opacity.
- [x] 9. `featured-projects.tsx`: tag separation 12px.

##### DESIGN.md sync (approved by eye)

- [x] 10. Update DESIGN 3.2 (h2, h3, body-small, hero role line, label tracking), 4.3 (section padding), 5.2 (grid starts at lg), 5.6/5.7 (ledger and index breakpoints), 5.9 (home structure), and section 21 (record every arbitrary value).

##### Housekeeping

- [x] 11. Delete unused default SVGs in `public/` (verify with grep first). Rewrite `README.md` for this project in 15 lines or fewer, with no phone number or email.
- [x] 12. Create `.env.example` with names only and empty values: `CONTACT_EMAIL`, `RESEND_API_KEY`, `DATABASE_URL`, `AUTH_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Add a `.gitignore` negation so `.env.example` is tracked and `.env` stays ignored. Capture `git check-ignore` output for both.

##### Defer (DESIGN.md section 21 rows only)

- [x] Add rows with phases: focus to h1 after route change (Phase 10), Prisma version mismatch (Phase 6), Vitest setup (Phase 5), dark chart-4 (Phase 4).

##### Final verification

- [x] Run `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- [x] Update `docs/STATUS.md`.
- [x] Report files changed and plain-words 375px / 1280px differences.





