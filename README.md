# Payroll JTBD Monitor

A living overview of the Jobs-to-be-Done a payroll bookkeeper performs in
e-conomic Payroll, with satisfaction and verbatim user insights per phase.

Built on the Ulwick Outcome-Driven Innovation framework:
- 8 payroll phases mapped to the 8 universal job-map stages (Define → Conclude)
- Each phase exposes Main Job, Sub Jobs, Related Jobs, Aspirations, Job Steps,
  Outcomes, and User Insights
- Proxy CSAT per phase (sentiment-derived from support + sales feedback) and
  the official in-product CSAT survey at the top

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Static-only — no API routes, no DB; all data lives in
  [`lib/jobs-data.ts`](./lib/jobs-data.ts) and
  [`lib/universal-stages.ts`](./lib/universal-stages.ts)

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

The project is a vanilla Next.js App Router app — no special config needed.

```bash
# from this directory
vercel              # preview deployment
vercel --prod       # production deployment
```

Or connect this folder as a project root in the Vercel dashboard. The build
command (`next build`) and output are auto-detected.

## Adding / updating data

All content is statically typed and lives in `lib/jobs-data.ts`:

- `jobs` — the 8 phases, each with `subJobs`, `relatedJobs`, `aspirations`,
  `jobSteps`, `outcomes`, `insights`, and a `satisfaction` block
- `surveyCsat` — the top-of-page CSAT card (in-product survey)
- `insightsMeta` — methodology, caveats, and data-source attribution shown in
  the footer

To add a new insight, append to the relevant phase's `insights` array. The
detail panel sorts them by `weight` (high → low) automatically.

## Project layout

```
app/
  layout.tsx         Root layout, fonts, metadata
  page.tsx           Dashboard (header, summary cards, Jobs section, methodology)
  globals.css        Tailwind + theme + animations
components/
  job-card.tsx       Phase card (cards view)
  job-detail.tsx     Slide-in detail panel
  universal-job-map.tsx  Universal map view
  satisfaction.tsx   Ring gauge + NPS bar + history chart + top-pain box
  illustrations.tsx  Inline SVGs for phase icons
lib/
  jobs-data.ts       All phase content + insights + satisfaction
  universal-stages.ts Ulwick's 8 universal stages
```
