# Launch runbook

Phase 10 launch checklist for the portfolio. Nothing here is committed or
deployed automatically; run the steps in order and record the results.

## 1. Content and privacy checklist

- [ ] `PROFILE.md` facts still match the site; no invented metrics, employers or projects.
- [ ] No published blog post is a draft; the sample draft stays `published=false`, `publishedAt=null`.
- [ ] Testimonials stay hidden until a real quote has `published=true` and `consent=true`.
- [ ] No personal email, phone number, `mailto:` or `tel:` in public HTML, metadata, JSON-LD or tracked files. The admin message view may build a `mailto:` from a sender address at runtime.
- [ ] The contact form fails closed in production when `CONTACT_EMAIL`, `CONTACT_FROM`, `RESEND_API_KEY` or either Upstash variable is missing.
- [ ] `public/Koushik_C_Resume.pdf` is not committed and is not linked unless `RESUME_URL` is set to a current copy.

## 2. Environment variables

Set these in Vercel for the Production environment. Preview can use the same
database and auth values; leave `NEXT_PUBLIC_SITE_URL` unset on Preview so
preview canonicals do not claim the production origin.

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma runtime | Neon pooled connection string. |
| `DATABASE_URL_UNPOOLED` | Yes | Prisma CLI | Neon direct connection; `prisma migrate deploy` uses it. |
| `AUTH_SECRET` | Yes | Auth.js | Random 32-byte secret, for example `openssl rand -base64 32`. |
| `AUTH_GITHUB_ID` | Yes | Auth.js | GitHub OAuth app client id. |
| `AUTH_GITHUB_SECRET` | Yes | Auth.js | GitHub OAuth app client secret. |
| `ADMIN_GITHUB_ID` | Yes | `src/auth.ts` | Must be the numeric GitHub user id allowed to sign in. |
| `CONTACT_EMAIL` | Yes | Contact action | Destination inbox; never commit it. |
| `CONTACT_FROM` | Yes | Contact action | Sender on a domain verified in Resend. |
| `RESEND_API_KEY` | Yes | Contact action | Resend API key. |
| `UPSTASH_REDIS_REST_URL` | Yes | Contact action | Rate limiting; missing in production fails closed. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Contact action | Rate limiting; missing in production fails closed. |
| `NEXT_PUBLIC_SITE_URL` | Production | Metadata, sitemap, robots | Canonical origin, for example `https://your-domain.example`. Falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. |
| `RESUME_URL` | Optional | Home hero and closing CTA | Absolute URL or root-relative path. The resume CTA/button is hidden when unset. |

`VERCEL_ENV` is provided by Vercel. `robots.ts` disallows the whole site when it
is `preview`.

## 3. Vercel project and domain

1. Import the repository as a Next.js project. Install command `npm install`, build command `npm run build` (the `prebuild` script runs `prisma generate`).
2. Set `DATABASE_URL` before running `npm run build`; the app client and CLI both need it.
3. Add the Production environment variables above.
4. Add the custom domain and set `NEXT_PUBLIC_SITE_URL` to its `https://` origin.
5. Confirm the production deployment uses the production domain, not a preview URL.

## 4. GitHub OAuth

Create or update the GitHub OAuth app with both callback URLs:

- `https://YOUR_DOMAIN/api/auth/callback/github`
- `http://localhost:3000/api/auth/callback/github` for local sign-in

Set `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` and `ADMIN_GITHUB_ID`. Sign in at
`/admin` with the allow-listed account; any other account must be rejected.

## 5. Neon database

1. Create the Neon project and copy the pooled and direct connection strings into `DATABASE_URL` and `DATABASE_URL_UNPOOLED`.
2. Run migrations against the direct string: `npx prisma migrate deploy`. On the existing Neon DB the `20261125044150_init` migration is already applied; use `prisma migrate deploy` only for future migrations.
3. Never run the seed (`npx prisma db seed`) in build or deploy; seeding is for local demo data only, and seeding never overwrites admin edits.
4. Optional demo data: `npx prisma db seed` (local only).
5. Take a Neon branch or backup before any migration.
6. Verify `/projects`, `/blog` and the admin lists load; then publish or unpublish a test row only if you intend to keep it.

## 6. Resend

1. Verify the sending domain in Resend.
2. Set `CONTACT_FROM` to an address on that domain and `CONTACT_EMAIL` to the destination inbox.
3. Submit the contact form once from production and confirm delivery.
4. Remove the Resend key or Upstash variables in a staging check to confirm the form fails closed instead of sending.

## 7. Resume hosting

The PDF is gitignored, so a Git-based Vercel deploy will not serve
`/Koushik_C_Resume.pdf`.

1. Host a current PDF on stable storage you control.
2. Set `RESUME_URL` to that URL and redeploy.
3. Confirm the home hero and closing CTA show "View resume (PDF)" and open in a new tab.
4. Leave `RESUME_URL` unset until the PDF is current; the CTA and its divider stay hidden.

## 8. Deploy and smoke test

After the production deployment:

- [ ] `/`, `/about`, `/projects`, `/projects/fileflow`, `/blog`, `/experience`, `/contact` return 200.
- [ ] `/projects/not-real` and the unpublished draft return 404.
- [ ] Titles, 120-160 character descriptions and absolute canonicals are present on every public page.
- [ ] `og:image`, `og:image:width/height`, `twitter:card` and `twitter:image` point at `/opengraph-image` and `/twitter-image`.
- [ ] `/opengraph-image` and `/twitter-image` return 200 `image/png` at 1200x630 with `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800`.
- [ ] `/icon.svg` returns 200 and the HTML links it; the old Next favicon is gone.
- [ ] `theme-color` follows light/dark, including a manual theme toggle.
- [ ] The home page contains valid `Person` JSON-LD with no email or phone.
- [ ] `/sitemap.xml` includes the six static pages, three published projects and any published posts; it excludes admin, API, drafts and empty testimonials.
- [ ] `/robots.txt` allows the public site, disallows `/admin` and `/api`, and points at the absolute sitemap.
- [ ] `/admin` redirects to `/admin/signin` when signed out; admin HTML is `noindex` and has no public header, footer or analytics.
- [ ] Contact form validation, success and failure states work; no live email is sent during the smoke test.
- [ ] No public `mailto:`, `tel:`, personal email or phone number.
- [ ] Testimonials are hidden from navigation and `noindex` while the table is empty.
- [ ] The sample draft is still `published=false`, `publishedAt=null` after testing.

### Local pre-deploy verification (2026-11-25)

Recorded on a production build served with `next start`; repeat on the deployed URL.

- `npx tsc --noEmit`, `npm run lint`, `npm test` (87 tests) and `npm run build` pass.
- `/`, `/about`, `/projects`, the three project pages, `/blog`, `/experience`, `/contact` and `/testimonials` return 200; `/projects/not-real` and the unpublished draft return 404.
- Every public page has a 124-159 character description, an absolute canonical, and `/opengraph-image` plus `/twitter-image` tags.
- Both image routes return 200 `image/png` at 1200x630; the home title is `Data Analyst | SQL, Excel & Python | Koushik C`.
- `/icon.svg` is linked and served; the light/dark `theme-color` meta tags are present.
- Person JSON-LD is valid and contains no email or phone; the public HTML scan found no `mailto:`, `tel:`, email or phone.
- `/sitemap.xml` lists the six static pages and three projects, excludes the draft and `/testimonials`; `/robots.txt` disallows admin/API and points at the absolute sitemap.
- `/admin` redirects to `/admin/signin`; the sign-in page is `noindex`, has no analytics chunk, and the public layout is not used.
- Temporarily publishing the sample draft returned 200 with the correct title; after reverting it returned 404 and the database is back to `published=false`, `publishedAt=null`.
- Not verified locally: a live contact-form send (no email sent), the manual theme toggle, keyboard route focus and Lighthouse. These need a browser or the deployed environment.

## 9. Search and analytics

1. Submit `https://YOUR_DOMAIN/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Request indexing for the home page, About, Projects and Blog.
3. Confirm the Vercel Analytics script loads on public pages and not on `/admin`.
4. Check the Vercel Analytics dashboard for page views after launch.

## 10. Lighthouse

Run Chrome DevTools Lighthouse (Mobile, Navigation) against the deployed URL.

Targets:

- Performance >= 90
- Accessibility 100
- Best Practices >= 95
- SEO 100
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms

Record the date, URL and scores here. **Status: not run as of 2026-11-25.**

## 11. Known blockers and limits

- No real blog posts are published yet; the blog index is intentionally empty.
- No real consented testimonials exist; the page is hidden and `noindex`.
- The resume PDF is out of date and not hosted; `RESUME_URL` stays unset.
- `CONTACT_FROM` may still use a Resend test sender until the domain is verified.
- No security headers/CSP, PWA manifest or Speed Insights in this phase.
- Sitemap ISR refreshes every 5 minutes; admin mutations also revalidate `/sitemap.xml`.

## 12. Rollback and monitoring

- Use Vercel's instant rollback to return to the previous deployment.
- Migrations are forward-only; restore the Neon branch/backup if a migration must be undone.
- Watch Vercel runtime logs for contact-form and Prisma errors, and the Analytics dashboard for traffic.
- Keep `NEXT_PUBLIC_SITE_URL` and `RESUME_URL` aligned with the live domain and the current PDF.
