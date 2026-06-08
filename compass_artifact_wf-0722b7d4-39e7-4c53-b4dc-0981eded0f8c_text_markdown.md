# NF Group of Companies — World-Class Website Design Specification
### A Claude Code–ready build document (Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion)

---

## TL;DR
- **Build a 6-page (Home, About, Services, Companies, News, Contact) Next.js 15 App Router site** sharing one `layout.tsx`, one design-token file, and one component library so every page feels cohesive. Use a **green + blue corporate palette** (Primary Blue `#0F4C81` for structure/trust, Primary Green `#1B7A4B` for CTAs/agriculture/growth, Gold `#C9A227` under 5% for emphasis), with **Sora (headings) + Inter (body)** as the recommended Google Font pairing.
- **The home page must stay deliberately clean** — an animated Ken Burns hero, 3 business-division cards, count-up impact stats, the premium **Digital Ecosystem downloads showcase** (6 app-store-style cards), a testimonials carousel, a 3-item news grid, and a contact CTA. Animations are formal and restrained (0.4–0.6s entrance eases, subtle parallax/Ken Burns), and the experience is **mobile-first** (44×44px touch targets, single optimized hero image on phones, lazy-loaded below-fold imagery).
- **Treat almost all company facts as client-supplied placeholders.** Only two facts are independently verifiable (NF Plantation runs 14+ Kilinochchi branches on ZKTeco/Live U biometric attendance; an Instagram account styles it "NF Plantation Pvt (Ltd)" with a 2025 first-anniversary). The founder name, registration numbers, and all six digital products are **unverified** and must be wired as editable placeholders. NF Plantation must carry a **finance disclaimer** because, under Sri Lanka's Finance Business Act No. 42 of 2011, the word "finance" is restricted.

---

## DATA-ACCURACY NOTE (read before building)

A focused verification pass found that the public footprint of NF Group is very thin. Build accordingly — wire the following as **editable placeholders / CMS fields**, not hard-coded truths:

| Claim | Status | Use in build |
|---|---|---|
| NF Plantation has **14+ branches in Kilinochchi** using **ZKTeco/Live U biometric attendance** (installed **April 16, 2025**) | ✅ Verifiable (Live U blog) | May state as fact |
| Instagram styles it **"NF Plantation Pvt (Ltd)"**, 1st-anniversary in 2025 (implying founding ~mid-2024) | ✅ Verifiable (IG post title) | May state; founding date soft |
| Founder/CEO **"Mr. Kunatheepan"** | ❌ Unverified | Placeholder |
| Reg. **PV 00334432 / PV 00303425** | ❌ Unverified | Placeholder |
| Three-sister-company structure & roles | ❌ Unverified | Placeholder |
| Six digital products (apps/sites) | ❌ Not found on Play/App Store | Placeholder; badges link to `#` until live |
| Colombo HQ; Northern & Eastern operations | ❌ Only Kilinochchi confirmed | Placeholder |

> **Implementation rule:** Put all company facts, names, stats, and store links in a single `src/content/company.ts` file so the client can correct them without touching components. Never invent statistics in the UI — render `—` or hide a stat block if its value is empty.

---

## 1. COMPLETE DESIGN SYSTEM

### 1.1 Color palette (green + blue corporate)

```css
/* Brand — Blue (structure, trust, navigation, headings) */
--color-blue-900: #0A2E50;
--color-blue-800: #0B3A63;
--color-blue-700: #0E4574;
--color-blue-600: #0F4C81;  /* PRIMARY BLUE */
--color-blue-500: #1C6BB0;
--color-blue-400: #3B82C4;
--color-blue-100: #CFE0EF;
--color-blue-50:  #EAF2F9;

/* Brand — Green (CTAs, growth, agriculture, success) */
--color-green-900: #0E3F27;
--color-green-700: #15633D;
--color-green-600: #1B7A4B;  /* PRIMARY GREEN */
--color-green-500: #239A5E;
--color-green-400: #34A56F;
--color-green-100: #CDEBD9;
--color-green-50:  #ECF7F0;

/* Accent — Gold (use < 5% of surface area) */
--color-gold-500: #C9A227;
--color-gold-300: #E3C766;

/* Neutrals */
--color-ink:      #0E1A23;  /* primary text */
--color-slate-700:#334155;  /* secondary text */
--color-slate-500:#64748B;
--color-slate-400:#94A3B8;  /* muted/placeholder */
--color-cloud:    #F5F8FA;  /* section alt background */
--color-white:    #FFFFFF;

/* Semantic */
--color-success: var(--color-green-600);
--color-info:    var(--color-blue-600);
--color-warning: #B7791F;
--color-danger:  #C0392B;
```

**Usage rules**
- **Blue is the spine:** header, footer, H1/H2 headings, links, structural dividers, primary section eyebrows.
- **Green is action & nature:** primary buttons, success states, agriculture/Nature Farming sections, stat highlights, growth icons.
- **Gold is a whisper:** awards, certifications, a single underline accent — never a background fill larger than a badge.
- **Gradients:** allowed only as deep blue→green diagonal (`from-blue-800 to-green-700`) on hero overlays and CTA bands; keep ≤ 12% opacity over photos so text passes contrast.
- **Accessibility:** meet **WCAG 2.2 Success Criterion 1.4.3 Contrast (Minimum), Level AA** — per W3C, "the visual presentation of text and images of text has a contrast ratio of at least 4.5:1" (large text ≥18pt, or 14pt bold, requires only **3:1**). White text on `#0F4C81` and on `#1B7A4B` both pass for normal body text; do **not** put body text on `#34A56F` or `#3B82C4` without darkening.

### 1.2 Typography

**Recommended pairing (use this): `Sora` (headings) + `Inter` (body).**
- *Why:* Sora is a geometric, slightly technical display sans that reads confident and modern at large sizes (ideal for "Building Tomorrow's Enterprise"), while Inter is the workhorse UI body font with a large x-height for excellent mobile legibility. Both are Google Fonts (SIL Open Font License) and ship as variable fonts, keeping payload small.
- **Alternate 1 — `Montserrat` + `Lora`:** geometric heading + calligraphic serif body; warmer, more editorial — good if the client wants a "heritage" feel.
- **Alternate 2 — `Plus Jakarta Sans` + `Inter`:** softer, friendlier geometric headings; slightly less formal.

**Responsive type scale** (use `clamp()` so it fluidly scales without breakpoints):

| Token | Size (clamp) | Weight | Line-height | Tracking |
|---|---|---|---|---|
| `display` (hero H1) | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | 700 | 1.05 | -0.02em |
| `h2` | `clamp(2rem, 3vw + 0.5rem, 3rem)` | 700 | 1.1 | -0.02em |
| `h3` | `clamp(1.5rem, 1.5vw + 0.5rem, 2rem)` | 600 | 1.2 | -0.01em |
| `h4` | `1.25rem` | 600 | 1.3 | 0 |
| `body-lg` | `1.125rem` | 400 | 1.6 | 0 |
| `body` | `1rem` | 400 | 1.65 | 0 |
| `small` | `0.875rem` | 500 | 1.5 | 0.01em |
| `eyebrow` | `0.8125rem` | 600 | 1.4 | 0.12em (uppercase) |

```tsx
// app/layout.tsx — font loading for continuity & performance
import { Sora, Inter } from "next/font/google";
const sora = Sora({ subsets: ["latin"], weight: ["600","700"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-body", display: "swap" });
// <html className={`${sora.variable} ${inter.variable}`}>
```

### 1.3 Spacing, radius, shadow, motion tokens (Tailwind v4 `@theme`)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* colors: paste the palette above here as --color-* tokens */
  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Spacing scale (4px base) */
  --spacing: 0.25rem;            /* 1 unit = 4px */
  --spacing-section: 6rem;       /* desktop section padding-y */
  --spacing-section-sm: 3.5rem;  /* mobile section padding-y */
  --container-max: 80rem;        /* 1280px content max-width */

  /* Radius */
  --radius-sm: 0.375rem;  /* 6px  */
  --radius-md: 0.75rem;   /* 12px */
  --radius-lg: 1.25rem;   /* 20px cards */
  --radius-xl: 2rem;      /* 32px hero panels */
  --radius-full: 9999px;

  /* Elevation */
  --shadow-soft:   0 1px 2px rgb(14 26 35 / 0.04), 0 1px 3px rgb(14 26 35 / 0.06);
  --shadow-card:   0 4px 12px rgb(14 26 35 / 0.08), 0 2px 4px rgb(14 26 35 / 0.04);
  --shadow-lifted: 0 18px 40px rgb(14 26 35 / 0.14), 0 6px 12px rgb(14 26 35 / 0.06);
  --shadow-blue:   0 12px 30px rgb(15 76 129 / 0.22);

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);  /* smooth, premium decel */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}

/* Honor reduced motion globally */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```

---

## 2. SHARED COMPONENTS (for cross-page continuity)

> All six pages import these from `src/components/`. Continuity comes from: one sticky `<Header>`, one `<Footer>`, one `<Section>` wrapper, one `<SectionHeader>` (eyebrow + title + lead), and shared `<Button>`/`<Card>`/`<Badge>` primitives.

### 2.1 Navigation header
- **Behavior:** transparent over the hero, then transitions to solid white with `--shadow-soft` after 24px of scroll. Logo left, nav center/right (Home · About · Services · Companies · News · Contact), a green **"Contact Us"** primary button at far right.
- **Mobile:** hamburger → full-screen slide-in panel (blue `#0F4C81` background, white links, staggered reveal), body scroll locked, focus-trapped.

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV = [["Home","/"],["About","/about"],["Services","/services"],
  ["Companies","/companies"],["News","/news"],["Contact","/contact"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300
      ${solid ? "bg-white/95 backdrop-blur shadow-soft" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-5 md:px-8">
        <Link href="/" className={`font-display text-lg font-bold ${solid ? "text-blue-600" : "text-white"}`}>
          NF Group<span className="text-green-500">.</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(([l,h]) => (
            <Link key={h} href={h}
              className={`text-sm font-medium transition-colors ${solid ? "text-slate-700 hover:text-blue-600" : "text-white/90 hover:text-white"}`}>
              {l}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">Contact Us</Link>
        </nav>
        <button aria-label="Open menu" onClick={() => setOpen(true)}
          className={`lg:hidden ${solid ? "text-blue-600" : "text-white"}`}>☰</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-blue-600 lg:hidden"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}>
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display font-bold text-white">NF Group.</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-white text-2xl">×</button>
            </div>
            <motion.ul className="mt-8 flex flex-col gap-2 px-6"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
              {NAV.map(([l,h]) => (
                <motion.li key={h}
                  variants={{ hidden:{opacity:0,x:24}, show:{opacity:1,x:0} }}>
                  <Link href={h} onClick={() => setOpen(false)}
                    className="block py-3 text-2xl font-semibold text-white">{l}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

### 2.2 Footer
4-column layout on a deep blue (`#0A2E50`) ground: (1) brand + one-line mission + social icons; (2) Quick links; (3) Companies (links to /companies anchors); (4) Contact (Kilinochchi address placeholder, email, phone). Below: a thin legal bar with copyright + the **finance disclaimer** (see §3.4). Green top hairline (`border-t-2 border-green-500`) ties it to the palette.

### 2.3 Buttons

```tsx
const styles = {
  primary:  "bg-green-600 text-white hover:bg-green-700 shadow-blue",
  secondary:"border border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost:    "text-blue-600 hover:bg-blue-50",
} as const;
export function Button({ variant="primary", className="", ...p }: any) {
  return <button {...p}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
      text-sm font-semibold transition-all duration-[var(--duration-normal)]
      ease-[var(--ease-standard)] active:scale-[0.98] ${styles[variant]} ${className}`} />;
}
```

### 2.4 Cards, badges, inputs, section header
- **Card:** `rounded-[var(--radius-lg)] bg-white shadow-card` → hover `shadow-lifted` + `-translate-y-1` (250ms). Optional top image with `rounded-t-[var(--radius-lg)] overflow-hidden`.
- **Badge/eyebrow:** uppercase, tracked `0.12em`, blue or green text on tint pill (`bg-green-50 text-green-700`).
- **Input:** `rounded-md border border-slate-200 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100`; labels above; 48px min height for touch.
- **SectionHeader:** centered or left; eyebrow → H2 → muted lead (max-w-2xl).

```tsx
export function SectionHeader({ eyebrow, title, lead, align="center" }: any) {
  return (
    <div className={`mb-12 ${align==="center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.12em] text-green-600">{eyebrow}</p>}
      <h2 className="font-display text-h2 font-bold text-blue-900">{title}</h2>
      {lead && <p className="mt-4 text-body-lg text-slate-600">{lead}</p>}
    </div>
  );
}
```

### 2.5 Reusable scroll-reveal wrapper (used site-wide)

```tsx
"use client";
import { motion } from "framer-motion";
export function Reveal({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay }}>
      {children}
    </motion.div>
  );
}
```

---

## 3. PAGE-BY-PAGE SPECIFICATION

### 3.1 HOME (kept clean — only the essentials)

**Section order:** Hero → Business Divisions → Impact Stats → Digital Ecosystem → Testimonials → Latest News → Contact CTA → Footer.

**A. Hero (animated Ken Burns background)**
- Full-viewport (`min-h-[92vh]`), 3-image slow cross-fading Ken Burns carousel beneath a blue→green gradient overlay (≤55% opacity for contrast).
- Content: eyebrow ("NF GROUP OF COMPANIES"), H1 **"Building Tomorrow's Enterprise"**, one-line subhead, two buttons (primary green "Explore Our Companies", secondary white-outline "Get in Touch"). Optional scroll-cue chevron.
- Imagery search terms: *"sustainable agriculture aerial"*, *"coconut plantation Sri Lanka"*, *"modern business teamwork"*. (See §8 for direct URLs.)

```tsx
// components/home/Hero.tsx — Ken Burns cross-fade (desktop) / static image (mobile)
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = ["/hero/agri.jpg","/hero/coconut.jpg","/hero/team.jpg"];
export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(p => (p+1)%SLIDES.length), 7000); return () => clearInterval(t); }, []);
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div key={i} className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}>
          <motion.div className="absolute inset-0"
            initial={{ scale: 1 }} animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}>
            <Image src={SLIDES[i]} alt="" fill priority={i===0} sizes="100vw"
              className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/45 to-green-700/45" />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[var(--container-max)] flex-col justify-center px-5 md:px-8">
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6,ease:[0.16,1,0.3,1]}}
          className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-green-300">NF Group of Companies</motion.p>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1,ease:[0.16,1,0.3,1]}}
          className="mt-4 max-w-3xl font-display text-display font-bold text-white">Building Tomorrow's Enterprise</motion.h1>
        <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[0.16,1,0.3,1]}}
          className="mt-5 max-w-xl text-body-lg text-white/85">A diversified Sri Lankan group in agriculture, retail, and enterprise partnerships — rooted in the Northern Province, growing nationwide.</motion.p>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.3,ease:[0.16,1,0.3,1]}}
          className="mt-8 flex flex-wrap gap-4">{/* Buttons here */}</motion.div>
      </div>
    </section>
  );
}
```
> **Mobile hero rule:** swap the carousel for a single `priority` image (no JS interval) under 768px to protect LCP and battery. Detect via CSS `hidden md:block` for the animated layer and `md:hidden` for the static `<Image>`.

**B. Business divisions** — 3 cards (Natural Plantation · NF Plantation · Nature Farming): icon, name, one-line role, "Learn more →" deep-link to `/companies#slug`. Equal-height grid (`grid md:grid-cols-3 gap-6`), each wrapped in `<Reveal delay={i*0.08}>`.

**C. Impact stats** — blue band, 3–4 count-up figures (e.g., "14+ Branches", "3 Companies", "Years of Growth", "Provinces Served"). Use the count-up component in §5.2. **Leave values editable; hide any stat with no verified number.**

**D. Digital Ecosystem downloads** — see §4 (the showcase). On home, show a tight 3-up preview + "Explore the full ecosystem →".

**E. Testimonials** — carousel of 3–5 quote cards (avatar placeholder, name, role/company), auto-advancing 6s, swipeable on touch, dots + arrows. Subtle fade/slide between slides.

**F. Latest news** — 3 most-recent cards (image, category badge, date, title, excerpt) + "View all news →".

**G. Contact CTA** — full-width blue→green gradient band: H2 **"Let's Start Building Your Success Story"**, short line, primary white button → /contact. This is the only home form-adjacent block (keeps home clean; full form lives on /contact).

### 3.2 ABOUT
- **Hero strip** (shorter, ~50vh) with eyebrow "About NF Group" + title + lead, static photo.
- **Our Story** — two-column: narrative text + framed image (placeholder: "Founded in Kilinochchi…", verified anniversary 2025).
- **Vision & Mission** — two side-by-side cards (blue and green accented).
- **Leadership** — founder card: portrait placeholder, **"Mr. Kunatheepan — Founder & CEO"** (label clearly as placeholder in CMS), short bio, optional quote pull. Grid below for additional leaders.
- **Timeline** — vertical, scroll-revealed milestones (alternate left/right on desktop, single column on mobile). Seed with verifiable nodes (2024 founding (soft), 2025 first anniversary, 2025 biometric rollout to 14+ branches) + placeholder future nodes.
- **Values** — 4–6 icon tiles (Integrity, Sustainability, Community, Innovation…).

### 3.3 SERVICES
- Hero strip → **Service categories** grouped by company. Each service = card with icon, title, 1–2 line description, and the owning company tag.
  - *Natural Plantation:* retail / FMCG distribution, e-commerce, consumer products.
  - *NF Plantation:* group holding, business partnership facilitation, enterprise support, operations/management technology.
  - *Nature Farming:* aloe vera cultivation, coconut, spices, cotton, organic agricultural production (Kilinochchi).
- **Process band** — 3–4 step "How we work" (Discover → Partner → Grow → Sustain) with connecting line.
- CTA band reused from home.

### 3.4 COMPANIES (the three sister companies)
Anchor sections (`#natural-plantation`, `#nf-plantation`, `#nature-farming`), each a full alternating-layout block: large image one side, content other side (eyebrow, name, paragraph, mini-stats row, "Visit website / app" buttons where applicable).

**NF Plantation — mandatory legal disclaimer.** Because Sri Lanka's **Finance Business Act, No. 42 of 2011** restricts the words "finance/financing/financial" (per the Central Bank of Sri Lanka, under Section 10(2) only licensed finance companies may use such terms without written CBSL approval), render a persistent, clearly-visible disclaimer in this section **and** in the footer:

> *"NF Plantation (Pvt) Ltd is a group holding and business-partnership facilitation entity. It is **not** a licensed finance company and is **not** regulated by, or registered with, the Central Bank of Sri Lanka under the Finance Business Act, No. 42 of 2011. It does not accept public deposits or carry on finance business."*

Style it as an info callout (`bg-blue-50 border-l-4 border-blue-600 text-slate-700 text-small p-4 rounded-md`). **Avoid branding the company "NF Plantation Finance" anywhere in UI copy** unless the client confirms CBSL licensing; default the division label to "NF Plantation" or "NF Plantation — Group & Partnerships".

Stats per company: render only verified/known numbers (e.g., NF Plantation "14+ branches, Kilinochchi"); leave others as editable.

### 3.5 NEWS
- Hero strip → **category filter row** (All · Company · Agriculture · Retail · Community · Press) as pill toggles (client-side filter).
- **Responsive grid:** 1 col (mobile) → 2 (tablet) → 3 (desktop). Card = 16:9 image, category badge, date, title, 2-line excerpt, "Read →".
- **Featured** first item spans 2 columns on desktop.
- Empty-state and "Load more" pattern. Wire to a `news[]` array in content for easy CMS swap later.

### 3.6 CONTACT
- Hero strip → two-column: **(left)** contact form (Name, Email, Phone, Company, Message, consent checkbox) with inline validation and a success state; **(right)** contact details card (address placeholder — Colombo HQ / Kilinochchi operations), email, phone, **business hours table**, social links.
- **Map:** embedded responsive map (lazy-loaded `<iframe loading="lazy">` or a static map image swapped to interactive on click to protect LCP).
- Reuse the CTA band on no other page-bottom here (form is the CTA).

---

## 4. DIGITAL ECOSYSTEM / DOWNLOADS SECTION (detailed)

A premium, app-store-style showcase. On **/services** or a dedicated `/#ecosystem` block and previewed on home. Six products as cards in a responsive grid (`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`).

**The six products (placeholders until live):**
1. **NF Plantation — Mobile App** (consumer) → App Store + Google Play badges.
2. **NF Plantation — Management App** (staff/operations) → Play badge (or "Request access").
3. **NF Plantation — Website** → "Visit Website" button.
4. **Nature Plantation — Website** → "Visit Website" button.
5. **Nature Plantation — App** → store badges.
6. **Natural Plantation — E-commerce** → "Shop Now" button.

**Card anatomy:** rounded-lg white card, top zone = device mockup / app-icon tile on a soft blue→green tint, then product name, one-line description, a small platform row (iOS / Android / Web tags), then action(s): official **App Store** and **Google Play** SVG badges (download localized hi-res badges from Apple & Google brand resources) and/or a green "Visit" button. Hover: `-translate-y-1` + `shadow-lifted`. Each card `<Reveal delay={i*0.06}>`.

```tsx
// components/Ecosystem.tsx
const PRODUCTS = [
  { name:"NF Plantation App", kind:"Mobile app", platforms:["iOS","Android"],
    ios:"#", android:"#", desc:"Stay connected to NF Plantation services on the go." },
  { name:"NF Plantation Management", kind:"Operations app", platforms:["Android"],
    android:"#", desc:"Branch & workforce management for NF Plantation teams." },
  { name:"NF Plantation Website", kind:"Website", platforms:["Web"], web:"#", desc:"Corporate hub for NF Plantation." },
  { name:"Nature Plantation Website", kind:"Website", platforms:["Web"], web:"#", desc:"Explore Nature Plantation." },
  { name:"Nature Plantation App", kind:"Mobile app", platforms:["iOS","Android"], ios:"#", android:"#", desc:"Nature Plantation in your pocket." },
  { name:"Natural Plantation Store", kind:"E-commerce", platforms:["Web"], web:"#", desc:"Shop Natural Plantation products online." },
];
export function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-cloud py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-max)] px-5 md:px-8">
        {/* <SectionHeader eyebrow="Digital Ecosystem" title="One Group. A Connected Digital Experience."
              lead="Download our apps and explore our platforms." /> */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <div key={p.name}
              className="group rounded-[var(--radius-lg)] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
              <div className="mb-5 flex h-40 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-blue-50 to-green-50">
                {/* device mockup / app icon image */}
              </div>
              <p className="text-eyebrow uppercase tracking-[0.12em] text-green-600">{p.kind}</p>
              <h3 className="mt-1 font-display text-h4 font-semibold text-blue-900">{p.name}</h3>
              <p className="mt-2 text-small text-slate-600">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.platforms.map(t => <span key={t} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{t}</span>)}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {p.ios && <a href={p.ios} aria-label={`${p.name} on the App Store`}>{/* App Store badge SVG */}</a>}
                {p.android && <a href={p.android} aria-label={`${p.name} on Google Play`}>{/* Google Play badge SVG */}</a>}
                {p.web && <a href={p.web} className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700">Visit →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Mockup placement guidance:** use realistic phone frames (e.g., a transparent-PNG iPhone bezel from a free mockup kit) for the three app products and a laptop/browser frame for the three web products. Keep mockup zones a consistent height (`h-40`/`h-48`) so the grid stays even. Store badges must use **official assets** (Apple App Store + Google Play brand pages) at correct proportions and clear-space — never recolor them. Until live, badges link to `#` and may carry a small "Coming soon" ribbon.

---

## 5. ANIMATION SPECIFICATION (formal, professional)

**Principles:** subtle, slow, confident. No bounce on corporate elements (reserve spring only for the count-up). Entrances use `--ease-entrance` `cubic-bezier(0.16,1,0.3,1)`, 0.4–0.6s. Everything respects `prefers-reduced-motion`.

| Pattern | Spec |
|---|---|
| **Hero Ken Burns** | scale 1 → 1.08 over 8s linear; 1.5s cross-fade between slides; 7s per slide; mobile = static image |
| **Scroll reveals** | `opacity 0→1`, `y 24→0`, 0.6s ease-entrance, `viewport once, margin -80px`; stagger children 0.06–0.08s |
| **Hover (cards/buttons)** | `-translate-y-1` + shadow upgrade, 250ms standard ease; buttons `active:scale-0.98` |
| **Count-up stats** | spring on `useInView`, ~1.6s to target, `once:true` |
| **Carousel (testimonials)** | fade+slide 0.5s, auto 6s, pause on hover/focus, swipe on touch |
| **Page transitions** | `AnimatePresence` fade (opacity 0↔1, 0.3s) on route change; keep minimal to protect perceived speed |
| **Header** | background color/elevation cross-fade 300ms on scroll past 24px |
| **Mobile menu** | panel slide-in 0.4s ease-entrance + staggered link reveal |

### 5.1 Shared variants

```tsx
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } },
};
export const stagger = { show: { transition: { staggerChildren: 0.08 } } };
```

### 5.2 Count-up component

```tsx
"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
export function CountUp({ to, suffix="" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on("change", v => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
```

---

## 6. MOBILE-FIRST RESPONSIVE SPECIFICATION

**Breakpoints (Tailwind defaults + a small phone tier):** base `360px`, `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Design every section at 360px first, then enhance.

- **Navigation:** hamburger below `lg`; full-screen slide-in panel; sticky header height 56–64px.
- **Touch targets:** every interactive element ≥ **44×44 CSS px** — per Apple Human Interface Guidelines, "create controls that measure at least 44 points × 44 points so they can be accurately tapped with a finger." This satisfies WCAG 2.2 SC 2.5.5 (Enhanced, AAA); note the WCAG AA floor (SC 2.5.8) is only **24×24 px** and Google Material Design recommends **48×48 dp**. Use 48px on primary CTAs and form fields for comfort.
- **Layout adjustments per section:** divisions/news/ecosystem grids collapse to 1 column; stats become 2×2; alternating company blocks stack image-over-text; timeline becomes single left-aligned column; testimonials become full-width single card with swipe.
- **Hero on mobile:** single `priority` `next/image` (no Ken Burns interval, no multiple downloads); shorter `min-h-[80vh]`; H1 uses the lower clamp bound; overlay slightly darker for sun-readability.
- **Performance:** lazy-load all below-fold images; `sizes="(max-width:768px) 100vw, 33vw"` on grid images so phones never fetch desktop-width files; defer the map iframe; avoid layout shift by always setting width/height or `fill` + aspect-ratio parent.
- **Typography:** `clamp()` scale prevents per-breakpoint overrides; body stays ≥16px to avoid iOS zoom-on-focus.

---

## 7. TECHNICAL STACK & IMPLEMENTATION GUIDANCE

**Stack:** Next.js 15 (App Router, React Server Components by default) · TypeScript · Tailwind CSS v4 (CSS-first `@theme`) · Framer Motion (client components only) · `next/image` for optimized 4K imagery · deployed on Vercel.

**Folder structure**
```
src/
  app/
    layout.tsx            # Header + Footer + fonts (continuity lives here)
    page.tsx              # Home
    about/page.tsx
    services/page.tsx
    companies/page.tsx
    news/page.tsx
    contact/page.tsx
    globals.css           # @import "tailwindcss"; @theme { tokens }
  components/
    Header.tsx Footer.tsx Section.tsx SectionHeader.tsx
    Button.tsx Card.tsx Badge.tsx Reveal.tsx CountUp.tsx
    home/Hero.tsx Divisions.tsx Stats.tsx Testimonials.tsx LatestNews.tsx CTA.tsx
    Ecosystem.tsx
  content/
    company.ts            # ALL placeholder facts, stats, links, disclaimer text
    news.ts services.ts testimonials.ts
  lib/ motion.ts          # shared variants/easings
public/
  hero/ mockups/ news/ badges/   # local optimized assets
```

**Continuity:** the shared `layout.tsx` renders `<Header/>` + `{children}` + `<Footer/>` so all six pages inherit identical chrome, fonts, and tokens. Mark only interactive pieces (`Header`, `Hero`, carousels, `CountUp`, mobile menu) as `"use client"`; keep page bodies as Server Components for speed.

**`next.config` images:**
```js
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" },
                     { protocol: "https", hostname: "images.pexels.com" }],
  },
};
```

**Performance targets — aim for Lighthouse 90+.** A Lighthouse score of **90–100** is classified as **"Good" (green)** in Google's official scoring; 50–89 is "Needs Improvement" (orange) and 0–49 "Poor" (red). Per Chrome's documentation the "good" control point at 90 corresponds to roughly the 8th percentile of real-world HTTP Archive data, so this is a demanding but appropriate bar.
- Single `priority`/`fetchPriority="high"` image = the LCP hero only; never preload carousels or grids.
- Self-host fonts via `next/font` with `display:swap` (zero render-blocking, no CLS).
- `placeholder="blur"` on large above-the-fold images; quality 85 hero / 75 general / 60 thumbs.
- Keep client JS minimal; code-split heavy client components; defer map.
- Target: LCP < 2.5s mobile, CLS ≈ 0, TBT low.

---

## 8. 4K IMAGE SOURCING GUIDE

**Sources & licensing:** Unsplash, Pexels, Pixabay — all free for commercial use, no attribution legally required (attribution still courteous). Avoid Getty/iStock/Alamy/Shutterstock thumbnails (paid/watermarked). Note Unsplash's hotlinking guideline expects the returned image URL to be used; for a production corporate site, **download once, convert to WebP/AVIF, and self-host in `/public`** for reliability and speed.

**Direct URL pattern (Unsplash):**
`https://images.unsplash.com/photo-{ID}?q=80&w=2400&auto=format&fit=crop` — set `w` per use (hero 2400, card 1080, thumb 400). Find the `{ID}` in the photo's page URL (the trailing token).

**Aspect ratios:** hero 16:9 (or full-bleed), company blocks 4:3, news cards 16:9, ecosystem mockups 4:5/1:1, testimonials avatar 1:1.

**Per-section search terms (Unsplash/Pexels):**

| Section | Search terms |
|---|---|
| Hero slides | "aerial farmland green", "coconut plantation Sri Lanka", "modern business team meeting" |
| Natural Plantation (retail/FMCG) | "grocery retail shelves", "FMCG products", "online shopping ecommerce", "supermarket aisle" |
| NF Plantation (holding/partnership) | "business handshake partnership", "corporate office Colombo", "team strategy whiteboard" |
| Nature Farming (agriculture) | "aloe vera plantation field", "aloe vera leaf macro", "spice cinnamon harvest", "cotton field", "organic farm worker" |
| About / story | "Sri Lanka landscape", "farmers community", "sunrise over field" |
| Wellness/products | "natural skincare aloe", "wellness botanical", "herbal products flatlay" |
| Contact | "Colombo city", "map abstract", "customer support desk" |

**Verified example image references (search-confirmed Unsplash pages — pull the regular/raw URL):**
- Aloe vera collections: `unsplash.com/s/photos/aloe-vera` and `/aloe-vera-plant` (4.8k photos; e.g., photo slug `BRKmqCjStD8` aloe with flower stalk; `Rvu0r96dmAw` green aloe vera).
- Coconut plantation: `unsplash.com/s/photos/coconut-plantation`; Sri Lanka–specific: photo slug `9fJB_wvQd5I` ("coconut plantation in Madampe, North Western Province, Sri Lanka").
- Sri Lanka scenery: `unsplash.com/s/photos/sri-lanka` and `/sri-lanka-tea`.

**Optimization checklist:** download highest available → compress to WebP (and AVIF) → store in `/public/<section>/` → reference via `next/image` with explicit `width/height` or `fill` + aspect-ratio parent → set accurate `sizes` → `priority` on hero only → `placeholder="blur"` on large images.

---

## Recommendations (staged, with thresholds)

1. **Build the design system + shared layout first** (tokens, Header, Footer, `Section`, `Button`, `Card`, `Reveal`). *Threshold to proceed:* a single demo page renders Header→Hero→CTA→Footer with correct fonts/colors on mobile and desktop. This guarantees continuity before any page-specific work.
2. **Ship Home next, kept clean,** with the Ken Burns hero (desktop) / static hero (mobile), divisions, stats, ecosystem, testimonials, news, CTA. *Threshold:* mobile Lighthouse Performance ≥ 90 and LCP < 2.5s on a throttled 4G profile before adding more pages — if not met, reduce hero image weight and confirm only one preloaded image.
3. **Add About, Services, Companies, News, Contact** reusing the same components. *Gate Companies/NF Plantation behind the finance disclaimer* — do not label anything "…Finance" in UI unless the client provides written CBSL confirmation of licensing. If confirmed, you may relax the disclaimer wording.
4. **Wire the Digital Ecosystem to real links as products go live.** Until a product has a real App Store/Play/Web URL, keep its badge at `#` with a "Coming soon" ribbon rather than a dead link.
5. **Replace every placeholder fact** (founder name, registration numbers, company roles, stats, addresses) from `content/company.ts` only after the client verifies them — ideally against the official Sri Lanka eROC registry for the PV numbers. *Change trigger:* if any number can't be verified, hide that stat block rather than display an unverified figure.
6. **Before launch,** run Lighthouse on all six routes (mobile), confirm WCAG AA contrast on every text/background pair, test the mobile menu/focus trap, and verify `prefers-reduced-motion` disables Ken Burns and reveals.

## Caveats
- **Most company content is unverified.** Independent search confirmed only the Kilinochchi branch count (14+) with ZKTeco/Live U biometric attendance (April 16, 2025) and the "NF Plantation Pvt (Ltd)" 1st-anniversary (2025). The founder "Mr. Kunatheepan", the registration numbers, the three-company structure, the Colombo HQ, and all six digital products are **client-supplied and must be confirmed**; a Facebook "Natural Plantation" page that surfaced describes a *different* plantation-services business and should **not** be cited.
- **Legal:** the finance disclaimer is essential — Sri Lanka's Finance Business Act No. 42 of 2011 restricts "finance/financial" terminology (CBSL, Section 10(2)); have the client's counsel approve the exact wording. This document is design guidance, not legal advice.
- **Imagery:** licenses can change; re-check Unsplash/Pexels/Pixabay terms at build time and prefer self-hosting downloaded, optimized copies. Use authentic photos of the actual operations/products once available — stock imagery should be a temporary stand-in for a trust-driven corporate site.
- **Animation libraries evolve:** Framer Motion is now published as `motion` (motion.dev); confirm the current package name/version at install and adjust imports (`framer-motion` vs `motion/react`) accordingly.
- **App-store badges** are trademarked assets with strict usage rules; download official versions and don't restyle them, or store review can reject listings.