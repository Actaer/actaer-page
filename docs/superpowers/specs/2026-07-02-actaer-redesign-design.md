# Actaer Website Redesign — Design Spec

**Date:** 2026-07-02
**Status:** Approved by user

## Goal

Reposition actaer.com from a "full-service tech consulting firm" to a **product-first software company** with AI consulting as a secondary offering, and rebuild the entire visual identity on the IBM Carbon-inspired design system defined in `DESIGN.md`.

## Positioning & Narrative

Message hierarchy across the site:

1. **Products first** — Actaer builds and ships its own software:
   - **VantumIQP** (https://www.vantumiqp.com/) — business intelligence workspace built on Apache Superset. Tagline: "Open your data. See the story. Share the answer." Demo-first sales model.
   - **FaberPDF** (https://www.faberpdf.com/) — modern local-first desktop PDF editor (Windows/Linux, currently beta, free during beta). Sign, annotate, edit, and validate PDFs without cloud round-trips.
2. **Consulting second** — AI Consulting as the flagship specialization (AI strategy, adoption, automation), supported by Software Development and Digital Modernization (teaching companies how to modernize and adopt technology).

The products lend credibility to the consulting offer: "we actually build software, we don't just advise."

Hero direction: product-first headline along the lines of *"We build software products. And we help companies adopt AI."*

## Site Map

```
/                                 → new homepage
/products                         → overview of both products
/products/vantumiqp               → dedicated page, CTA → vantumiqp.com
/products/faberpdf                → dedicated page, CTA → faberpdf.com
/consulting                       → consulting overview
/consulting/ai-consulting         → flagship service
/consulting/software-development  → supporting service
/consulting/digital-modernization → supporting service
/about, /blog, /blog/[slug], /contact, /privacy, /cookies → retained, restyled
```

### Removed routes & 301 redirects

| Old route | Redirect target |
|---|---|
| `/services` | `/consulting` |
| `/services/it-consulting` | `/consulting/ai-consulting` |
| `/services/software-development` | `/consulting/software-development` |
| `/services/product-development` | `/consulting/digital-modernization` |
| `/products/vantum-erp` | `/products/vantumiqp` |

Redirects are locale-aware (apply under every `/[locale]/` prefix), configured in `next.config.ts`.

## Homepage Structure

Carbon section rhythm — alternating `canvas` (#ffffff) and `surface-1` (#f4f4f4) bands, separated by hairlines, no large vertical gaps:

1. **Hero** — display-xl (76px, weight 300) product-first headline + body-lg subhead. Primary CTA "Explore our products" (blue solid, 0px corners) + tertiary CTA to AI consulting.
2. **Products** — two large `product-card` tiles (1px hairline border, 32px padding): VantumIQP and FaberPDF, each with tagline, 3 key features, ghost link "Learn more →".
3. **Consulting** — surface-1 band: AI Consulting featured + Software Development and Digital Modernization as `feature-card` grid.
4. **Why Actaer** — principles/differentiators (product DNA, engineering-first, based in Serbia serving EU) in a hairline grid.
5. **Latest from the blog** — 3 `resource-tile` entries.
6. **CTA banner** — full-width IBM Blue (#0f62fe) panel → /contact.
7. **Footer** — charcoal #161616, the only dark surface on the page.

## Design System Implementation

Source of truth: `DESIGN.md` (IBM Carbon analysis).

- **Font:** IBM Plex Sans via `next/font/google`, replacing Montserrat + Inter. Display sizes (42–76px) at weight **300** (brand signature), body at 400 with `letter-spacing: 0.16px`.
- **Colors mapped to shadcn CSS variables:**
  - `--primary: #0f62fe` (IBM Blue — the single accent), `--primary-foreground: #ffffff`
  - `--foreground: #161616` (ink), `--muted-foreground: #525252`
  - `--background: #ffffff`, `--muted: #f4f4f4`, `--border: #e0e0e0`
  - Semantic: success #24a148, warning #f1c21b, error/destructive #da1e28
- **Radius: 0px globally** (`--radius: 0`) — every button, card, input, tab, container.
- **No drop shadows** — hierarchy via 1px hairlines and surface change (canvas ↔ surface-1).
- **Light-only:** dark mode and `mode-toggle` removed. `next-themes` removed unless needed to force light. Footer is the only inverted (charcoal) surface.
- **Buttons (Carbon variants):** primary (blue solid), secondary (charcoal solid), tertiary (white + 1px blue border, blue text), ghost (blue text + chevron). All 0px corners, 12px/16px padding, 14px/400 labels.
- **Typography utilities** in `globals.css` for display-xl/lg/md, headline, card-title, subhead, body-lg, eyebrow per DESIGN.md tokens. Eyebrows are sentence case 14px — no all-caps tracking.
- **Motion:** GSAP usage reduced to subtle fade-ins only. No atmospheric effects, gradients, or parallax — Carbon is calm and static.
- **Header:** white sticky top-nav, 48px height, 1px bottom hairline. Nav: Products, Consulting, Blog, About, Contact + language switcher.
- **Inputs:** surface-1 background, bottom-rule focus treatment (2px blue underline), 0px corners.

## Technical Updates

- Update Next.js to latest 16.x, React, next-intl, and other dependencies via `bun update`.
- Refresh shadcn/ui components to latest and restyle through the new CSS variables.
- Keep existing infrastructure intact: next-intl routing/middleware, MDX blog pipeline, Formspree contact form, cookie consent, Vercel analytics, security headers.

## Content & i18n

- New English copy for all pages, then translated into all 6 locales: en, sr, de, es, pt, pl (`messages/*.json`).
- Blog posts (MDX content) remain untouched; blog listing/detail pages get restyled chrome only.
- SEO: updated metadata and keywords (AI consulting, business intelligence platform, PDF editor); JSON-LD Organization extended with two `SoftwareApplication` schemas (VantumIQP, FaberPDF); sitemap picks up new routes automatically; hreflang alternates preserved.

## Testing & Verification

- `bun run build` and lint pass.
- Visual verification of every page via preview at desktop and mobile breakpoints.
- All 6 locales render correctly (no missing translation keys).
- All 301 redirects verified.
- Carbon conformance spot-check: 0px corners, no shadows, weight-300 display type, blue used only for CTAs/links/banner.

## Out of Scope

- Changes to the VantumIQP and FaberPDF product sites themselves.
- New blog content.
- Dark mode (explicitly removed).
- CMS migration — blog stays file-based MDX.
