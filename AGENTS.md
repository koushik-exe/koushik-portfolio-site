<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` â€” verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->



# PROJECT SPEC: Koushik C Portfolio

## Overview
Multi-page personal portfolio for Koushik C, a Data Analyst (SQL, Excel, Python) with an MBA in
Business Analytics, targeting entry-level Data Analyst, Business Analyst and MIS Analyst roles.
Audience: recruiters and hiring managers. The look should feel clean, credible and professional.
ALL content comes from PROFILE.md. Read it before writing any copy. Never invent facts.
Visual design (colors, fonts, layout, spacing) is decided by the design skills, not hard-coded here.
Never hard-code colors in components. Use theme tokens defined in src/app/globals.css.

## Tech stack (do not add or swap libraries without asking)
- Next.js App Router + TypeScript (src/ directory, alias @/*)
- Tailwind CSS + shadcn/ui (Radix, Nova preset) + lucide-react + next-themes
- Motion (UI animation), GSAP + ScrollTrigger (scroll storytelling), Lenis (smooth scroll)
- PostgreSQL (Neon) + Prisma
- Auth.js (next-auth@beta), admin only
- Zod + React Hook Form
- MDX (@next/mdx) for blog and case studies
- Resend (email), Upstash Ratelimit (spam protection)
- ESLint (jsx-a11y), Prettier, Vitest (logic and Zod schemas only)
- Deploy: GitHub + Vercel + Vercel Analytics

## Decisions already made (do not reverse)
- Cache Components is NOT enabled. Ignore the next-cache-components-* and next-partial-prefetching-* skills. Do not add cacheComponents to next.config.ts.
- No Playwright and no browser or visual-regression testing. Ignore test-driven-development. Write Vitest tests only for pure logic and Zod schemas.
- Ignore skills unrelated to a portfolio site: slides, banner-design, brand.
- No React Compiler.
- Prisma is a release candidate (v8 rc). Read prisma.config.ts and the Prisma skills before writing any schema or client code. Do not guess the setup.
- The public repo must never contain a phone number or personal email. Contact email comes from env var CONTACT_EMAIL.

## Content rules
- Facts come only from PROFILE.md. If something is missing, use a clearly marked TODO placeholder and ask.
- Lead with analyst identity (SQL, Excel, Python, business insight). Do not present Koushik as a full-stack engineer.
- Be honest about experience level. Say "entry-level". Do not oversell.
- Project and case study pages follow: problem, approach, tools, result, what I learned, links.
- Leave room for future analysis case studies (SQL analyses, Excel or dashboard work, insight write-ups) in /projects and /blog.

## Pages
1. / (Home): hero (name, title, one-line pitch, CTAs for resume and contact), featured projects, skills, CTA
2. /about: story, timeline, education, skills
3. /projects: filterable grid; /projects/[slug] case study
4. /blog and /blog/[slug] (MDX)
5. /experience (resume view, with PDF download)
6. /testimonials (hide the page until real testimonials exist)
7. /contact: validated form that sends email via Resend. No phone number shown.
8. /admin (protected): manage projects, posts, testimonials, messages
9. Custom 404 and loading states

## Skills: when to use which
- Start of every phase: brainstorming, then writing-plans. Use executing-plans to carry the plan out.
- Any visual or layout decision: ui-ux-pro-max (main design authority), plus ui-styling for Tailwind and shadcn styling.
  Settle the design system once in Phase 1 and reuse it. Do not re-pick styles per page.
- Review of any UI work: web-design-guidelines.
- Any React or Next.js code: vercel-react-best-practices and vercel-composition-patterns.
- Bundle size and dev server issues: next-bundle-optimizer and next-dev-loop.
- Any error or unexpected behavior: systematic-debugging. Find the cause before changing code.
- End of every phase: verification-before-completion, then requesting-code-review.
- If a skill conflicts with this file, this file wins.

## Coding rules
- Server Components by default. Add "use client" only for animation, forms and interactive UI.
- Every form and every API input is validated with a Zod schema. Share schemas between client and server.
- Use Server Actions for mutations. Use Route Handlers only when needed.
- Use next/image for images and next/font for fonts. Add metadata to every page.
- Use shadcn/ui components before building custom ones. Do not mix other UI libraries.
- Icons: lucide-react only.
- Respect prefers-reduced-motion in every animation. Clean up GSAP in useEffect or useGSAP.
- Accessibility: semantic HTML, alt text, visible focus states, keyboard navigation.
- No secrets in code. Use environment variables. Never commit .env.
- Before using any Next.js 16 API, check the docs referenced at the top of this file. Do not guess APIs.

## Workflow rules
- Work in small phases. Do one phase at a time and stop for review.
- After each phase run: npx tsc --noEmit, npm run lint, npm run build. Fix all errors before finishing.
- The developer cannot show screenshots. Describe layout decisions in words and ask before big visual changes.
- Do not install new packages without asking.
- Commit after each approved phase with a clear message.

## Build phases
1. Foundation: design system via ui-ux-pro-max (written into globals.css tokens), fonts, theme provider, Lenis provider, navbar, footer, base layout
2. Home page (static, no animation), content from PROFILE.md
3. About, Experience, Testimonials pages (static)
4. Projects list and detail pages using local sample data from PROFILE.md
5. Contact page: form, Zod schema, Server Action, Resend, rate limit
6. Prisma schema + Neon connection; move projects, posts, testimonials to the database
7. Auth.js + admin dashboard (CRUD)
8. Blog with MDX
9. Animations: Motion first, then GSAP ScrollTrigger, one section at a time
10. SEO (metadata, sitemap.ts, robots.ts), Vercel Analytics, accessibility pass, final polish
