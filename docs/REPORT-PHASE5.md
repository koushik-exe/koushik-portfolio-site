# Phase 5 report — Contact page, form, Server Action, email, spam protection

## Files changed

**New**
- `src/lib/schemas/contact.ts` — shared Zod schema (name 1–100, valid email, message 10–2000, optional subject ≤120, honeypot must be empty; trimmed; newlines rejected in name/email/subject, allowed in message).
- `src/lib/schemas/contact.test.ts` — 12 schema tests (valid, bad email, too short, too long, newline injection, honeypot filled).
- `src/lib/actions/contact.ts` — Server Action `contactUs`.
- `src/components/contact/contact-form.tsx` — the form UI.
- `vitest.config.ts`.

**Modified**
- `src/app/contact/page.tsx` — page header + approved intro + form + GitHub/LinkedIn column; new unique description.
- `src/app/globals.css` — added `--success`/`--warning` primitives in both themes and `--color-success`/`--color-warning` in `@theme`.
- `src/app/page.tsx` — metadata.description (approved edit).
- `src/components/home/home-hero.tsx` — hero pitch (approved edit).
- `DESIGN.md` — 2.3 status tokens (no longer "proposed"), 2.4 measured contrast rows, new 21 rows for Phase 5.
- `docs/STATUS.md` — rewritten (34 lines).
- `docs/TODO.md` — tracker, all items ticked.
- `package.json` — `test` script added.
- `.env.example` — `CONTACT_FROM` added (names only, empty values).

## Test results

- `npx tsc --noEmit`: pass
- `npm run lint`: pass (clean)
- `npm run build`: pass
- `npm test`: 12 passed (1 file)

## Plain words — `/contact` at 375px

Single column. A mono 11px uppercase label "Contact" above the content. Then the serif page heading "Contact", and the intro sentence in muted body: "You can send a message through this form. I’m based in Karur, Tamil Nadu, and I’m open to relocating to Chennai, Bengaluru or Coimbatore." Below that, the form: a label above each input, every input full width and 44px tall, stacked as Name, Email, Message (a 6-row textarea) and Subject (optional). Errors, when the form is submitted with issues, appear as text under the field with a small icon. Below the form: the muted 14px line "Your message is used only to reply." and the primary "Send message" button (44px). Below that, the "Find me on" column with the GitHub and LinkedIn text links with a small arrow. Success replaces the form with a short confirmation line plus a "Back home" link.

## Plain words — `/contact` at 1280px

The page uses the 12-column grid: the form takes columns 5–12 (8 columns wide) and the GitHub/LinkedIn column sits at columns 1–3 (3 columns). Inside the form, same structure: labels above each 44px-tall input, message is a 6-row textarea. The action row puts "Send message" on the left and the muted privacy line on the right.

## Manual test checklist (with your `.env`)

1. **Valid send** — fill Name, Email and Message (≥10 characters); submit. The button label shows "Sending" while it runs, then the form is replaced by a confirmation ("Thank you — your message is on its way.") with a "Back home" link. Confirm the email arrives in your `CONTACT_EMAIL` inbox with `From` = your `CONTACT_FROM`, `reply-to` = the visitor's email.
2. **Invalid fields** — submit the empty form. Errors appear under Name ("Enter your name."), Email ("Enter an email address like name@example.com.") and Message; focus moves to the first invalid field, and each error is linked with `aria-describedby`.
3. **Subject** — leave blank (works), fill it and check the email subject line is your text; when blank, the email subject is "Contact form message".
4. **Honeypot** — open DevTools, set the hidden honeypot input's value, submit: the success message still appears, no email is sent, and the rate limiter is not touched.
5. **Rate limit (development)** — try 5+ quick valid submits; the 6th returns "Too many messages sent recently. Please wait and try again." Development uses an in-memory map (Upstash is not needed).
6. **Missing env (development)** — unset `CONTACT_EMAIL`/`CONTACT_FROM`/`RESEND_API_KEY`: submitting shows "Email is not configured yet." Production shows the generic "Sorry, your message could not be sent. Please try again later." plus a server log with the missing names.
7. **Both themes** — scan the page at 375px and 1280px in light and dark; the new status tokens measure as pass (5.12 / 4.71 light, 12.87 / 12.26 dark against background).
8. **No secrets** — the three values live only in `.env`; `.env.example` lists the names.

## Items done, skipped or blocked

- **Done**: all Step 1 items (copy + plan, approved), Step 2 items 2.1–2.6, and Step 3 items 3.1–3.4; plus the two approved home-page edits (page.tsx metadata description, home-hero pitch).
- **Skipped**: nothing — every tracker item is now ticked.
- **Blocked**: nothing.
- **Note**: `CONTACT_FROM` is Resend's default test sender; before sending to real visitors it must be on a domain verified in Resend (the `resend.dev` test domain only delivers to your own address — verified against the current Resend docs). Documented in `DESIGN.md` 21 and `docs/STATUS.md` → Open. No new packages were added and no database was touched (Phase 6/7 still ahead).
- **Audit findings** (no edits, per your decision):
  - `src/components/home/experience-snapshot.tsx`: no sentence implies SQL/Python/Excel in the ObjectWays role.
  - `src/app/about/page.tsx` lines 33–37: "MBA graduate specializing in Business Analytics, skilled in SQL, Python and Microsoft Excel for turning raw data into business insights." — the skills are stated separately from the role, but the trailing "for turning raw data into business insights" can read as implying use during the ObjectWays role; your call.
