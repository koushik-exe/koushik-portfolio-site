# Koushik C — Portfolio

Personal portfolio of Koushik C, an entry-level data analyst (SQL, Excel, Python) with an MBA in
Business Analytics. It shows projects, experience and how I work, in a quiet editorial design.

<!-- Add the live link after deploying: **Live site:** https://... -->
<!-- Add a screenshot: ![Home page](docs/screenshot-home.png) -->

## Status

In progress, built in phases.

- Done: design system (light and dark), layout, navigation, home page
- Next: About and Experience pages
- Planned: Projects and case studies, Blog, Contact form, admin dashboard

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- next-themes (light and dark), Lenis (smooth scroll)
- Planned: PostgreSQL (Neon) with Prisma, Auth.js, Zod, MDX, Resend

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Before committing, run:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Copy `.env.example` to `.env` and fill in values when features that need them are added.

## Design

The design system is documented in `DESIGN.md`: color tokens with measured contrast ratios,
type scale, spacing, motion rules and accessibility rules. Every page is built to WCAG 2.2 AA.

## Contact

[GitHub](https://github.com/koushik-exe) · [LinkedIn](https://www.linkedin.com/in/koushik-c-data-analyst)