# Phase 2.5 — cleanup checklist

Source: the Phase 2 review report (sections 4 and 5). Work one item at a time; run
`npx tsc --noEmit` before ticking an item. Do not commit.

## Code fixes

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

## DESIGN.md sync (approved by eye)

- [x] 10. Update DESIGN 3.2 (h2, h3, body-small, hero role line, label tracking), 4.3 (section padding), 5.2 (grid starts at lg), 5.6/5.7 (ledger and index breakpoints), 5.9 (home structure), and section 21 (record every arbitrary value).

## Housekeeping

- [x] 11. Delete unused default SVGs in `public/` (verify with grep first). Rewrite `README.md` for this project in 15 lines or fewer, with no phone number or email.
- [x] 12. Create `.env.example` with names only and empty values: `CONTACT_EMAIL`, `RESEND_API_KEY`, `DATABASE_URL`, `AUTH_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Add a `.gitignore` negation so `.env.example` is tracked and `.env` stays ignored. Capture `git check-ignore` output for both.

## Defer (DESIGN.md section 21 rows only)

- [x] Add rows with phases: focus to h1 after route change (Phase 10), Prisma version mismatch (Phase 6), Vitest setup (Phase 5), dark chart-4 (Phase 4).

## Final verification

- [x] Run `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- [x] Update `docs/STATUS.md`.
- [x] Report files changed and plain-words 375px / 1280px differences.
