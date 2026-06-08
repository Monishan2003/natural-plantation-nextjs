# AGENT.md — Natural Plantation Website

> **This file is the single source of truth for any AI coding agent (Claude Code, etc.) working in this repo.** Read it fully before writing or editing code. Follow it over your own defaults. If a request conflicts with the **Golden Rules** or **Legal & Data Integrity** sections, stop and ask the human.

---

## 1. PROJECT CONTEXT

**What we're building:** A world-class, formal corporate website for **Natural Plantation** — a diversified Sri Lankan group, consumer-facing parent brand, **registered PV 00334432**, operations rooted in Kilinochchi / Northern Province. **Natural Plantation is the brand identity of this entire website** (logo, name, tagline, footer). Its two **sister companies** are showcased on the Companies page:

- **Natural Plantation** — the parent / consumer-facing brand: retail / FMCG / e-commerce. **This site = Natural Plantation's site.**
- **NF Plantation** (PV 00303425) — sister company: group holding & business-partnership facilitation. **NOT a licensed finance company** (see §11).
- **Nature Farming** — sister company: agricultural production (aloe vera, coconut, spices, cotton) in Kilinochchi.

**Brand identity (use everywhere for continuity):**
- **Name:** Natural Plantation (long form in footer: "Natural Plantation — Group of Companies · PV 00334432").
- **Tagline:** "Rooted in the North. Growing for Sri Lanka."
- **Logo:** the Natural Plantation circular logo (hands cradling plant/home, red + green). Header left, footer brand block. Provide white/mono version for dark backgrounds.
- **Live site:** `natural-plantation-website.vercel.app`.

> **Note on the reference design:** The client approved the *visual style* of a separate "NF Group / Building Tomorrow's Enterprise" mock — meaning the **green + blue palette, clean layout, formal animations, and section structure**. Adopt that *style*, but the *brand* throughout is **Natural Plantation**, not "NF Group". Hero headline stays on-brand (e.g. "Rooted in the North. Growing for Sri Lanka." or a clean variant), not "Building Tomorrow's Enterprise".

**Pages (6):** Home, About, Services, Companies, News, Contact.

**Primary goals, in priority order:**
1. **Official/formal corporate look** — trustworthy, world-class, cohesive across every page.
2. **Excellent mobile experience** — mobile-first, fast, smooth, clean UI.
3. **Cross-page continuity** — one shared layout, one design-token set, one component library.
4. **Security** — especially around Supabase, auth, secrets, and the contact form.
5. **Clean home page** — only essential content; no clutter.

**Approved visual direction:** green + blue corporate palette, animated Ken Burns hero, a "Digital Ecosystem" downloads showcase (6 products), formal/restrained animations.

---

## 2. GOLDEN RULES (do not break)

1. **Continuity first.** All pages share `app/layout.tsx` (Header + Footer + fonts + tokens). Header shows the **Natural Plantation** logo + name; footer shows "Natural Plantation — Group of Companies · PV 00334432". Never re-style chrome per-page.
2. **Design tokens only.** Never hard-code hex colors, font names, spacing, radii, or shadows in components. Always use the tokens in `app/globals.css` (`@theme`) / Tailwind classes. If a value is missing, add it as a token first.
3. **Server Components by default.** Add `"use client"` **only** to components that need interactivity (Header, Hero carousel, Testimonials, CountUp, mobile menu, forms). Page bodies stay server components.
4. **All company facts live in `src/content/`.** Never hard-code a name, stat, registration number, address, or store link inside a component. Treat every fact as an editable placeholder (see §10).
5. **Never commit secrets.** No keys, tokens, or service-role credentials in code or client bundles. `.env.local` only; `NEXT_PUBLIC_` prefix is for *public* values exclusively (see §9).
6. **Mobile-first.** Design and verify every section at 360px first, then enhance upward. Touch targets ≥ 44×44px (48px for primary CTAs/inputs).
7. **Respect `prefers-reduced-motion`.** All animation must degrade gracefully (Ken Burns, reveals, count-ups disabled).
8. **Accessibility is non-negotiable.** WCAG 2.2 AA: 4.5:1 text contrast, semantic HTML, labelled inputs, focus-visible states, alt text.
9. **The NF Plantation finance disclaimer is mandatory** wherever NF Plantation is described (see §11).
10. **Ask before destructive actions** — DB migrations that drop/alter columns, deleting files, changing auth/RLS policies, or rewriting shared components used across pages.

---

## 3. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, RSC) | Server components default |
| Language | **TypeScript** (strict) | No `any` in committed code |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` tokens in `globals.css` |
| Animation | **Framer Motion** (`motion`) | Client components only; confirm package name at install (`framer-motion` vs `motion/react`) |
| Images | **next/image** | AVIF/WebP, `priority` on hero LCP only |
| Fonts | **next/font/google** | Sora (display) + Inter (body), `display:swap`, self-hosted |
| Backend/DB | **Supabase** (Postgres + Auth + Storage) | RLS ON for every table (see §8–9) |
| Forms | Server Actions / Route Handlers | Validate with **Zod**; never trust client input |
| Deploy | **Vercel** | Env vars in Vercel dashboard, not in repo |
| Icons | **lucide-react** | Consistent 1.5–2px stroke |

---

## 4. COMMANDS

```bash
# Install
npm install

# Dev
npm run dev            # http://localhost:3000

# Quality gates — run before every commit
npm run lint           # ESLint (must pass, zero warnings on changed files)
npm run typecheck      # tsc --noEmit (must pass)
npm run build          # next build (must succeed)

# Supabase (local)
npx supabase start     # local stack
npx supabase db diff   # generate migration from schema changes
npx supabase db push   # apply migrations
npx supabase gen types typescript --local > src/lib/database.types.ts
```

> **Agent rule:** after any change, run `lint` + `typecheck` + `build` and fix all errors before declaring done. After any schema change, regenerate `database.types.ts`.

---

## 5. FILE & FOLDER STRUCTURE

```
src/
  app/
    layout.tsx              # Header + Footer + fonts (CONTINUITY lives here)
    globals.css             # @import "tailwindcss"; @theme { all design tokens }
    page.tsx                # Home
    about/page.tsx
    services/page.tsx
    companies/page.tsx
    news/page.tsx
    contact/page.tsx
    api/                    # Route Handlers (server-only)
      contact/route.ts      # contact form submit (validated, rate-limited)
  components/
    layout/  Header.tsx Footer.tsx
    ui/      Button.tsx Card.tsx Badge.tsx Input.tsx SectionHeader.tsx Reveal.tsx CountUp.tsx
    home/    Hero.tsx Divisions.tsx Stats.tsx Testimonials.tsx LatestNews.tsx CTA.tsx
    Ecosystem.tsx
  content/                  # ALL editable facts — single source of truth
    company.ts              # names, stats, reg numbers, addresses, disclaimer text
    companies.ts services.ts ecosystem.ts news.ts testimonials.ts
  lib/
    supabase/
      client.ts             # browser client (anon key, public)
      server.ts             # server client (cookies; anon key)
      admin.ts              # service-role client — SERVER ONLY, never imported by client code
    motion.ts               # shared variants/easings
    validation.ts           # Zod schemas
    database.types.ts       # generated; do not edit by hand
  middleware.ts             # Supabase auth session refresh (if auth used)
public/
  hero/ mockups/ news/ badges/   # optimized local images (WebP/AVIF)
supabase/
  migrations/               # SQL migrations (version-controlled)
```

**Naming conventions**
- Components: `PascalCase.tsx`. Hooks: `useThing.ts`. Utils/content: `camelCase.ts`.
- One component per file; co-locate section components under their page folder.
- Imports: use the `@/` alias (`@/components/ui/Button`). No deep relative `../../../`.

---

## 6. DESIGN SYSTEM (reference — full tokens in `globals.css`)

### 6.1 Colors (green + blue corporate)
- **Primary Blue `#0F4C81`** — structure, header/footer, headings, links. (`--color-blue-600`)
- **Primary Green `#1B7A4B`** — CTAs, success, agriculture, growth. (`--color-green-600`)
- **Gold `#C9A227`** — accent only, < 5% of surface (badges, single underlines). (`--color-gold-500`)
- **Neutrals** — ink `#0E1A23`, slate-700 `#334155`, slate-500 `#64748B`, cloud `#F5F8FA`, white.
- **Usage:** blue = the spine; green = action & nature; gold = a whisper. Gradients only as blue→green diagonal on hero/CTA bands. Never put body text on light tints (`#34A56F`, `#3B82C4`) — fails contrast.

### 6.2 Typography
- **Sora** (headings, 600/700) + **Inter** (body, 400/500/600). Loaded via `next/font`, exposed as `--font-display` / `--font-body`.
- Responsive scale via `clamp()` (display, h2, h3, h4, body-lg, body, small, eyebrow). Body ≥ 16px (prevents iOS focus-zoom). Eyebrows uppercase, tracking `0.12em`.

### 6.3 Tokens
- **Spacing:** 4px base; section padding `6rem` desktop / `3.5rem` mobile; content `max-w-[80rem]`.
- **Radius:** sm 6 / md 12 / lg 20 (cards) / xl 32 (hero panels) / full.
- **Shadow:** soft / card / lifted / blue (see globals).
- **Motion:** durations 150/250/400/600ms; eases `standard cubic-bezier(0.4,0,0.2,1)`, `entrance cubic-bezier(0.16,1,0.3,1)`.

### 6.4 Component patterns
- **Button** variants: primary (green), secondary (blue outline), ghost. `rounded-full`, `active:scale-[0.98]`.
- **Card:** `rounded-lg bg-white shadow-card` → hover `shadow-lifted -translate-y-1` (250ms).
- **SectionHeader:** eyebrow → H2 → muted lead (`max-w-2xl`).
- **Reveal:** scroll-in wrapper (`opacity/y`, 0.6s entrance ease, `viewport once`).
- **Section:** standardized vertical rhythm + container; alternate `bg-white` / `bg-cloud`.

---

## 7. ANIMATION & MOBILE RULES (condensed)

- **Hero:** Ken Burns (scale 1→1.08 / 8s, 1.5s cross-fade, 7s per slide) on desktop; **single static `priority` image on mobile** (no JS interval, protects LCP/battery).
- **Reveals:** `y:24→0, opacity:0→1`, stagger 0.06–0.08s. **Count-up:** spring, `once:true`. **Testimonials:** 6s auto, pause on hover/focus, swipe on touch.
- **No bounce** on corporate elements (springs only on count-up).
- **Mobile:** hamburger < `lg`, full-screen slide-in panel (blue bg), focus-trapped, scroll-locked. Grids collapse to 1 col; stats 2×2; alternating blocks stack; timeline single column.
- **Performance budget:** LCP < 2.5s mobile, CLS ≈ 0, Lighthouse ≥ 90 all categories. Only the hero image is preloaded; everything below the fold is lazy + correct `sizes`.

---

## 8. SUPABASE — DATABASE & DATA ACCESS

### 8.1 What Supabase is used for
- **Contact form submissions** (`contact_submissions` table).
- **Newsletter signups** (`newsletter_subscribers`).
- **News/press content** (`news_posts`) — optional CMS-style source for the News page.
- (Optional, later) **Admin auth** for editing news/content.

### 8.2 Schema conventions
- `snake_case` tables/columns. Every table has `id uuid default gen_random_uuid() primary key`, `created_at timestamptz default now()`.
- Migrations live in `supabase/migrations/` and are version-controlled. **Never** edit the DB only via the dashboard — always write a migration so the schema is reproducible.
- After schema changes, regenerate `src/lib/database.types.ts` and type all queries.

### 8.3 Example migration (contact form) — RLS ON, least privilege

```sql
-- supabase/migrations/0001_contact.sql
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Anonymous visitors may INSERT a submission, but never read them.
create policy "anon can insert contact"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No select/update/delete policy for anon/authenticated => reads are blocked.
-- Staff read submissions via the service-role key on the server only.
```

### 8.4 Client selection (critical)
- **`lib/supabase/client.ts`** — browser, **anon** key. Use in client components for safe public reads/inserts governed by RLS.
- **`lib/supabase/server.ts`** — server (RSC/Route Handlers), anon key + cookies for auth session.
- **`lib/supabase/admin.ts`** — **service-role** key. **SERVER-ONLY.** Bypasses RLS. Never import this in a client component, never expose its key with `NEXT_PUBLIC_`. Use only in Route Handlers/Server Actions for privileged ops (e.g., reading submissions for an admin view).

> **Agent rule:** if you find yourself importing `admin.ts` into anything under `components/` that is (or becomes) a client component, **stop** — that is a security leak.

---

## 9. SECURITY (treat as release-blocking)

### 9.1 Secrets & env
- `.env.local` (gitignored) for local; Vercel dashboard for prod. **Never** commit `.env*`.
- **`NEXT_PUBLIC_` = world-readable.** Only the Supabase URL and **anon** key may be public. The **service-role key, DB connection string, SMTP creds, and any API secret must NOT** carry that prefix and must never reach the client bundle.
- Required vars:
  ```
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_ROLE_KEY=...        # server only
  ```

### 9.2 RLS
- **RLS ON for every table, always.** Default-deny; add the narrowest policies needed. Anon may insert contact/newsletter rows; anon may select only explicitly-public content (e.g., published news). Never write a blanket `using (true)` select policy on tables holding personal data.

### 9.3 Input validation & forms
- Validate **all** input server-side with **Zod** before touching the DB (length caps, email format, required fields). Never rely on client validation alone.
- **Honeypot + rate limit** the contact form (e.g., reject if hidden field filled; limit submissions per IP/time). Consider a CAPTCHA/Turnstile if spam appears.
- Sanitize/escape any user-supplied text before it's rendered anywhere. React escapes by default — **never** use `dangerouslySetInnerHTML` with user or untrusted content.

### 9.4 Headers & transport
- Enforce HTTPS (Vercel default). Add security headers in `next.config`/middleware: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), `Referrer-Policy: strict-origin-when-cross-origin`, and a **Content-Security-Policy** allowing only required origins (self, Supabase, Unsplash/Pexels if hotlinked, map embed).
- Set `images.remotePatterns` to the exact allowed image hosts only.

### 9.5 Dependencies & data
- Keep deps current; run `npm audit` and address high/critical before launch.
- Personal data (contact/newsletter) = treat as sensitive: minimal retention, access only via service role on the server, never logged in plaintext to client-visible logs.
- No secrets, tokens, or PII in commit messages, comments, or console logs.

### 9.6 Security checklist (must pass before launch)
- [ ] RLS enabled on every table; policies least-privilege.
- [ ] Service-role key server-only; not in any client import or `NEXT_PUBLIC_`.
- [ ] All forms Zod-validated server-side + rate-limited + honeypot.
- [ ] Security headers + CSP configured.
- [ ] `npm audit` clean of high/critical.
- [ ] No secrets/PII in repo, logs, or client bundle.
- [ ] `dangerouslySetInnerHTML` absent (or only with fully trusted, sanitized content).

---

## 10. DATA INTEGRITY (placeholders — do not invent facts)

Most company facts are **unverified** and client-supplied. **Do not fabricate statistics, names, or claims in the UI.**

- All facts come from `src/content/company.ts`. If a value is empty, **hide that element** (render nothing or `—`) — never guess a number.
- **Verified (may state):** NF Plantation (sister company) operates 14+ Kilinochchi branches using ZKTeco/Live U biometric attendance (rolled out April 2025); a 2025 first-anniversary milestone.
- **Unverified (mark as placeholder in content, confirm with client):** founder/CEO name, registration numbers (Natural Plantation PV 00334432 / NF Plantation PV 00303425 — confirm against the Sri Lanka eROC registry), the parent/sister-company structure specifics, HQ + province coverage, and all six digital-ecosystem product links.
- **Digital ecosystem links:** until a product has a real store/web URL, set it to `#` with a "Coming soon" state — never ship a dead link styled as live.

---

## 11. LEGAL COMPLIANCE (NF Plantation finance disclaimer)

Sri Lanka's **Finance Business Act, No. 42 of 2011** restricts the words "finance/financial/financing" to licensed finance companies (CBSL). Therefore:

- **Do not** label any UI element "NF Plantation Finance" (or imply finance-company status) unless the client provides written CBSL licensing confirmation. Default label: **"NF Plantation"** / "Group & Partnerships".
- Render this disclaimer in the **Companies → NF Plantation** section **and** the **footer**:

  > *"NF Plantation (Pvt) Ltd is a group holding and business-partnership facilitation entity. It is not a licensed finance company and is not regulated by, or registered with, the Central Bank of Sri Lanka under the Finance Business Act, No. 42 of 2011. It does not accept public deposits or carry on finance business."*

- Disclaimer text lives in `content/company.ts` so counsel can adjust wording. This is design guidance, not legal advice — flag to the human for legal sign-off before launch.

---

## 12. CODING CONVENTIONS

- **TypeScript strict**; no `any` in committed code; type all Supabase queries with generated types.
- **Accessibility:** semantic elements (`header/nav/main/section/footer`), one `h1` per page, labelled inputs, `aria-*` where needed, visible focus states, `alt` on every meaningful image (`alt=""` for decorative).
- **next/image** for all images with explicit `width/height` or `fill` + aspect-ratio parent; accurate `sizes`; `priority` only on hero LCP.
- **No inline styles** for themable values; Tailwind + tokens only.
- **Keep client bundles lean:** push state down, keep `"use client"` at the leaf, no heavy libs in shared layout.
- **Comments:** explain *why*, not *what*; keep them current.

---

## 13. GIT & PR CONVENTIONS

- **Conventional Commits:** `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `perf:`, `a11y:`, `security:`.
- Small, focused commits; one concern each.
- A change is **not done** until: `lint` + `typecheck` + `build` pass, mobile (360px) and desktop verified, `prefers-reduced-motion` checked, and (if DB touched) migration written + types regenerated.
- Never commit `.env*`, secrets, generated `node_modules`, or unoptimized raw 4K images.

---

## 14. AGENT WORKFLOW (how to operate in this repo)

1. **Plan before coding.** For non-trivial work, restate the task, list files you'll touch, and note any Golden-Rule/security/legal implications. If it conflicts with this file, ask first.
2. **Build the design system + shared layout before any page** if not already present. Verify Header→Hero→CTA→Footer renders correctly on mobile + desktop with correct tokens — this is the continuity gate.
3. **Ship Home next, kept clean**, and **do not add more pages until mobile Lighthouse Performance ≥ 90 and LCP < 2.5s** (throttled). If unmet, reduce hero image weight and confirm only one preloaded image.
4. **Reuse components** for About/Services/Companies/News/Contact — no bespoke chrome.
5. **For Supabase work:** write a migration (not dashboard-only), enable RLS with least-privilege policies, regenerate types, validate inputs with Zod, keep service-role server-only.
6. **Before declaring done:** run the quality gates, the security checklist (§9.6), and confirm no invented facts (§10) and the disclaimer (§11) are intact.
7. **When unsure, ask.** Especially before destructive DB ops, auth/RLS changes, editing shared components, or publishing any unverified claim.

---

*End of AGENT.md — keep this file updated as the project evolves.*
