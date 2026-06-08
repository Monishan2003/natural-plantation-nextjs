# Natural Plantation — Corporate Website

A world-class, formal corporate marketing site for **Natural Plantation** (PV 00334432) — a
diversified Sri Lankan group in retail/FMCG, group holding and organic agriculture, rooted in
Kilinochchi.

Built per [`AGENT (1).md`](./AGENT%20%281%29.md) (the build contract) and the design specification
in `compass_artifact_*.md`.

## Stack

- **Next.js 16** (App Router, RSC) · **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first design tokens in `src/app/globals.css` (`@theme`)
- **Motion** (`motion/react`) — formal, restrained animations; respects `prefers-reduced-motion`
- **Supabase** (Postgres + Storage) — content is CMS-driven and read with the anon key under RLS
- **next/font** — Sora (display) + Inter (body)

## Pages (6)

Home · About · Services · Companies · News · Contact. Continuity lives in `src/app/layout.tsx`
(shared Header + Footer + fonts + tokens).

## Data

All content is read from the existing, populated Supabase project
(`eqqczxgwrqlgrknhhjtf`): `companies`, `company_facts`, `news_articles`, `team_members`,
`timeline_events`, and `site_settings` (home/about stats, head office, footer, social links).
The contact form writes to `contact_submissions` via `POST /api/contact` (Zod-validated,
honeypot + rate-limited). No service-role key is used anywhere.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Environment (`.env.local`, gitignored):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # publishable/anon key only — never the service role
```

## Notes

- **Brand is Natural Plantation**, not "NF Group" — the reference mock only supplied the visual
  style (green + blue palette, layout, motion).
- **NF Plantation finance disclaimer** (Finance Business Act No. 42 of 2011) is mandatory and
  appears on Companies → NF Plantation and in the footer. Have counsel approve final wording.
- Company facts are client-supplied placeholders where unverified — see `src/content/company.ts`.
