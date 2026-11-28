# Phase 11 - Home page bento / data-room direction

Plan of record for Phase 11. Docs only in Step 2; no source file changes until E1 starts.
One element per session, then stop for review.

## 1. Purpose and scope

The home page moves to a bento board with data-room touches: a grid of cards that carry
facts from `PROFILE.md`. The direction is home-only. Inner pages keep the existing spine,
page headers and ruled rows.

Scope:

- `DESIGN.md` 2.8 gains section 25 and the edits listed in 11.2.
- This file holds the E1-E10 briefs, board states, content inventory and gates.
- `docs/TODO.md` holds the Phase 11 checklist.
- No `src/` file changes in the docs step.

## 2. Authority

1. Safety and honesty rules in `AGENTS.md` and `PROFILE.md`.
2. `DESIGN.md` 2.8.
3. This plan.
4. Design skills and their suggestions.
5. Library defaults.

`DESIGN.md` and `PROFILE.md` outrank every skill. Skills inform craft only.

## 3. Approved decisions

D1. Direction: modern bento with data-room touches, home page only. Light-first, dark parity.
Keep Source Serif 4, Inter and JetBrains Mono, and the current palette.
D2. `DESIGN.md` 25 resolves the conflict with 1.3 and 5.3 in words: cards are separated by
hairline borders; no shadows, no fills beyond `--card`, no gradient fills.
D3. Card primitive: `bg-card`, 1px border token, `rounded-2xl`, padding 20/24/28 at
375/768/1280, no shadow or ring, one level of nesting, no hard-coded hex.
D4. Grid: one column below 768px, two at 768px, twelve at 1280px. Spans 3/4/5/6/7/12 only.
No orphan card. Hero board: identity span 7 with two rows, terminal span 5, record span 5.
While only the identity card exists it spans 12.
D5. Terminal panel: `figure` with `sr-only` `figcaption`; `$` glyph `aria-hidden`; commands
`whoami`, `current`, `target` only; output is PROFILE text only; no typing animation, no
blinking cursor, no ASCII art.
D6. Mono chips: names only, 11-12px, 28px high, wrapping. Qualifiers may be shown verbatim
(`Excel advanced`, `English professional working`, `Tamil native`). Nothing outside
`PROFILE.md`.
D7. Buttons: primary = default, secondary, ghost. The home secondary border uses
`border-muted-foreground` through `className`, not changed globally. One primary per section.
D8. Shape accents: CSS or SVG only. No blobs, gradient fills or images. One bolder accent per
section, decided at build time.
D9. Motion: Motion library through the existing `Reveal`. 12px and 300ms, or 8px and 250ms at
375. Stagger capped at 3. No GSAP on the home page, no scroll-jacking, content visible before
hydration, reduced motion fully static.
D10. Contact: never render an email address or `mailto`. A button to `/contact` plus the
GitHub and LinkedIn links from `PROFILE.md`.
D11. Identity card: "entry-level Data / Business / MIS Analyst" near the top. Summary
sentences quoted exactly from `PROFILE.md`.
D12. FileFlow steps use only the PROFILE FileFlow wording. The n8n card uses only the five
stage names in `PROFILE.md`.
D13. No chart. PROFILE numbers do not form a series. No hard-coded project count; derive it
from the rendered cards or omit it.
D14. Home h1 is 40/48/56px. About, Experience, Projects and other inner pages keep their
current sizes. `DESIGN.md` 3.2 changes the home row only.
D15. Update 15.1, 21 and the changelog.
D16. Build order: E1, E7, E2, E3, E4, E5, E6, E8, E9, E10.
D17. Retire the cover band and the contents index on `/`. The header CTA is secondary on `/`.
Languages are included in the toolkit card.
D18. The grid splits columns at 768px. Motion keeps its 640px split.

## 4. Element briefs

Each element is one session. Run the gate before reporting, then stop.

### E1 - Bento board, BentoCard, identity card

- Purpose: add `src/lib/identity.ts`, `src/components/home/bento-card.tsx`,
  `bento-board.tsx` and `identity-card.tsx`. The board renders the identity card only.
- PROFILE lines: 7-16 (identity), 18-24 (summary).
- Libraries: none new. Server Components. No Motion in this session.
- Reduced motion: nothing animates; server HTML is the final state.
- 375px: one column, 20px card padding, h1 40px, actions wrap left.
- 1280px: 12 columns, identity span 12 (temporary), 28px padding, h1 56px.
- Risks: duplicating `siteConfig` facts; a second About page; h1 leaking to inner pages;
  `rounded-2xl` spreading; LCP inside a bordered box.
- Gate: every string traces to a PROFILE line; no hex, `shadow-*` or `ring-*`; one `h1`;
  tsc, lint and build pass; board complete with JavaScript off; identity span is 12.
- Status: todo

### E7 - Button usage

- Purpose: apply default/secondary/ghost on the home page. One primary per section. Home
  secondary adds `border border-muted-foreground` through `className`.
- PROFILE lines: 14 (links), 16 (no email).
- Libraries: existing `Button` and `cva`. No new packages.
- Reduced motion: only the existing 150ms hover transition, collapsed by global CSS.
- 375px: actions wrap, 44px targets, secondary keeps a visible border.
- 1280px: one row, 1px x 24px divider before the resume link.
- Risks: editing the global variants; secondary reading as a fill; duplicate focus rings;
  two solid primary buttons on the first screen.
- Gate: `src/components/ui/button.tsx` unchanged; at most one `variant="default"` per
  section; resume stays the 8.5 tertiary link; both themes checked.
- Status: todo

### E2 - Terminal card

- Purpose: a `figure` with an `sr-only` `figcaption`, three commands, PROFILE output only.
- PROFILE lines: `whoami` 8-9, `current` 10, `target` 12.
- Libraries: none. No syntax highlighter, no horizontal scroll.
- Reduced motion: no typing or blinking exists, so nothing to reduce.
- 375px: full width, commands stack, long output wraps, no overflow at 320px.
- 1280px: span 5 in row 1, beside the identity card.
- Risks: reading as costume; output drifting from PROFILE; `$` announced; `pre` overflow.
- Gate: each output matches a PROFILE line; `$` is `aria-hidden`; figcaption present; no
  typing or blink code; no overflow; text is selectable.
- Status: todo

### E3 - Record card

- Purpose: experience, education and certification in one card, capped at 2 roles, 2 degrees
  and 1 certification.
- PROFILE lines: 36-42, 44-50, 69-70, 71, 74-75.
- Libraries: existing `experience` and `education` from `src/lib/profile.ts`.
- Reduced motion: static.
- 375px: dates above titles, one card per row.
- 1280px: span 5 in row 2 under the terminal; identity spans both rows.
- Risks: duplicating `/experience`; long bullets; the "six months" phrase in the current
  `experience-snapshot.tsx` is inferred, not a PROFILE fact, and must not return.
- Gate: exactly 2 roles, 2 degrees, 1 certification; every string in PROFILE; no "six
  months"; one quiet link to `/experience`; en dashes; tabular numerals.
- Status: todo

### E4 - FileFlow card

- Purpose: one anchor to `/projects/fileflow`, steps from PROFILE only.
- PROFILE lines: 53-56.
- Libraries: `next/link`, `lucide-react`.
- Reduced motion: static; arrow nudge is hover only.
- 375px: full width, steps as a short ruled list.
- 1280px: span 6, paired with E5, equal row height.
- Risks: invented steps; over-explaining "two-phase"; nested links; a 404 slug.
- Gate: every phrase in lines 54-56; one anchor with an `aria-label`; no nested interactive
  element; card omitted when `getFeaturedProjects()` has no `fileflow` row; route returns 200.
- Status: todo

### E5 - n8n card

- Purpose: card with the five stage names only.
- PROFILE lines: 57-62; stages 60-61.
- Libraries: `next/link` only.
- Reduced motion: static.
- 375px: full width, stages as a ruled list.
- 1280px: span 6 beside E4.
- Risks: renaming stages; "5-stage" must read "five-stage"; implying a result; Ollama treated
  as an outcome.
- Gate: exactly five stages, verbatim; no metric or result; height matches E4; route 200.
- Status: todo

### E6 - Toolkit card with chips

- Purpose: replace the comma list with grouped mono chips, names only.
- PROFILE lines: 27-30 and 33. Languages are included.
- Libraries: none. Chips are non-interactive `li`/`span`.
- Reduced motion: static.
- 375px: chips wrap, 28px high, never links or buttons.
- 1280px: span 12, five groups.
- Risks: chips read as filters; a 28px interactive target; qualifiers outside the three;
  drift from `skills.ts`.
- Gate: chips render from `homeSkillGroups` plus Languages; only the three qualifiers; no
  `href` or `onClick`; no fill; `home: true` on Languages in `skills.ts`.
- Status: todo

### E8 - Shape accents

- Purpose: one bolder CSS or SVG accent per section, chosen at build time.
- PROFILE lines: none; decorative only.
- Libraries: none.
- Reduced motion: static; no draw-in or loop.
- 375px: hidden if it touches the text measure.
- 1280px: outside the text measure, aligned to a column line.
- Risks: blobs, gradients, glows or images; decoration competing with content; implied meaning.
- Gate: no gradient, blur, filter or image; `aria-hidden`; at most one per section; tokens
  only.
- Status: todo

### E9 - Section transitions

- Purpose: wire the board and sections to `Reveal`; remove `SelectedWorkMotion` from `/`.
- PROFILE lines: none.
- Libraries: existing `motion` and `src/lib/motion.ts`. No GSAP in the home tree.
- Reduced motion: nothing armed; server HTML final; a mid-page setting change clears armed
  elements.
- 375px: 8px and 250ms, stagger at most 3.
- 1280px: 12px and 300ms, stagger at most 3.
- Risks: hidden content before paint; LCP delay; breaking `featured-projects.tsx`; shared
  `Reveal` change affecting inner pages.
- Gate: no `gsap` import in the home tree; JavaScript-off view complete; reduced-motion view
  static; no CLS; at most three concurrent reveals; inner pages still reveal.
- Status: todo

### E10 - Contact card and header CTA

- Purpose: a contact card with a button to `/contact` plus GitHub and LinkedIn. On `/` only,
  the header Contact action is secondary.
- PROFILE lines: 11, 12, 14, 16.
- Libraries: `next/link`, `lucide-react`, existing `ContactCta`.
- Reduced motion: static.
- 375px: full width, stacked actions, 44px targets.
- 1280px: span 12; header CTA secondary at `lg` and up.
- Risks: leaking `CONTACT_EMAIL`; a `mailto:`; duplicate primary actions; losing
  `aria-current`; changing the mobile sheet button.
- Gate: no email or `mailto` in the public home components; only `/contact`, GitHub and
  LinkedIn linked; header diff scoped to `/`; sheet keeps its full-width primary.
- Status: todo

## 5. Board states

| Step | Cards and spans at 1280px | Row total |
|---|---|---|
| E1 | identity 12 | 12 |
| E2 | identity 7 (two rows) + terminal 5 | 12 |
| E3 | identity 7 (two rows) + terminal 5 + record 5 | 12 and 12 |
| E4 | previous + FileFlow 6 | 12 and 12 and 6 |
| E5 | previous + n8n 6 | 12, 12, 12 |
| E6 | previous + toolkit 12 | 12, 12, 12, 12 |
| E7, E8, E9 | no layout change | unchanged |
| E10 | previous + contact 12 | 12, 12, 12, 12, 12 |

At 768px a span of 6 fills one of the two columns; 5, 7 and 12 fill both. At 375px every card
is full width. No step leaves an orphan card.

## 6. Content inventory

| String | PROFILE line | Kind |
|---|---|---|
| "Koushik C" | 8 | verbatim |
| "Data Analyst \| SQL, Excel & Python \| MBA in Business Analytics" | 9 | verbatim |
| "Junior Analyst, ObjectWays, Karur (Aug 2026 - Present, on-site)" | 10 | verbatim |
| "Junior Analyst at ObjectWays" (eyebrow) | 10 | derived |
| "entry-level Data / Business / MIS Analyst" | 12 | derived |
| Summary sentences | 19-22 | verbatim |
| "Karur, Tamil Nadu, India" and "Open to relocate: Chennai, Bengaluru, Coimbatore" | 11 | verbatim |
| GitHub and LinkedIn URLs | 14 | verbatim |
| Skill names | 27-30, 33 | verbatim |
| "Excel advanced", "English professional working", "Tamil native" | 29, 33 | verbatim |
| FileFlow phrases | 54-56 | verbatim |
| n8n stage names | 60-61 | verbatim |
| Roles and bullets | 36-50 | verbatim |
| Degrees | 69-71 | verbatim |
| Certification | 74-75 | verbatim |

Rules: the eyebrow and the entry-level line are derived and must stay traceable to their
lines. Summary sentences are verbatim and are not paraphrased. No email or phone number
appears anywhere (line 16).

## 7. Non-goals

- No chart, no fake dashboard, no count-up.
- No hard-coded project count.
- No GSAP on `/`, no scroll-jacking, no parallax, no looping motion.
- No email address, no `mailto:`, no phone number.
- No new fonts, colours, radii beyond 25.2, or UI libraries.
- No testimonials, logos, client names or invented metrics.
- No images in cards; shape accents are CSS or SVG only.

## 8. Verification

For every element:

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm test`
4. `npm run build`
5. Keyboard pass; reduced-motion pass; both themes.
6. 320, 375, 768 and 1280 described in words.
7. `DESIGN.md` 21 updated if a rule changed.
8. No commit. The developer commits after review.

## 9. Resolved questions

| Question | Decision | Date |
|---|---|---|
| Retire the cover band and contents index on `/` | Yes. Location and relocation move to the identity card; languages to the toolkit card | 2026-11-28 |
| "Quieter" header CTA on `/` | Secondary variant on `/` only; solid primary elsewhere | 2026-11-28 |
| Include Languages in the home toolkit | Yes. `home: true` on Languages in `skills.ts` | 2026-11-28 |

## 10. Status log

| Date | Element | Result |
|---|---|---|
| 2026-11-28 | Docs (11.2-11.6) | `DESIGN.md` 2.8, this plan, `docs/TODO.md` and `docs/STATUS.md` updated. No source change. |
| 2026-11-28 | E1-E10 | todo |
