# Copy & Brand Iteration — Design Spec

**Date:** 2026-07-02
**Status:** Approved by user
**Builds on:** 2026-07-02-actaer-redesign-design.md (Carbon redesign, merged)

## Goal

Elevate the redesigned site from "correct" to "selling": rewrite all copy with Apple-style storytelling inside the Carbon visual system, optimize every page for SEO, add the Actaer wordmark to the navbar, integrate VantumIQP/FaberPDF logos and real product screenshots, and refresh the two blog posts to the product-first narrative.

## 1. Brand Narrative (foundation)

### Voice: "Apple tone in a Carbon suit"

- Short sentences. Benefit-first. Second person ("you", "your data", "your documents").
- Sell the outcome, not the tool. Feature lists exist to prove the promise made by the headline above them.
- No hype words (revolutionary, game-changing, cutting-edge), no exclamation marks, no all-caps.
- Confident and calm — statements, not shouting. Rhetorical rhythm is allowed (short fragment following a full sentence).
- Display headlines stay short enough to hold weight-300 at 42–76px (max ~8 words).

### Story arc (every marketing page)

1. **Hook** — the customer's problem or desire, in their words (H1 + subhead)
2. **Answer** — the product/service as the resolution
3. **Proof** — features, screenshots, differentiators
4. **One CTA** — a single, concrete next step (demo, download, contact)

### Example headline directions (copywriter refines, arc is binding)

- Home hero: "Software that works the way you wish it did." / sub: products + AI consulting framing
- VantumIQP: "Your data has a story. Finally see it."
- FaberPDF: "Your documents are your business. Keep them that way."
- AI Consulting: "You don't need more AI advice. You need AI at work."
- About: founding story — "We got tired of software that fights you. So we started building our own."

### SEO keyword map (binding per route; primary first)

| Route | Keywords |
|---|---|
| / | software product company, AI consulting, business software Serbia |
| /products | business software products, BI platform, PDF editor |
| /products/vantumiqp | business intelligence platform, Apache Superset, governed dashboards, SQL reporting tool |
| /products/faberpdf | local-first PDF editor, offline PDF editor, sign PDF without upload, PDF editor Windows Linux |
| /consulting | AI consulting company, technology consulting |
| /consulting/ai-consulting | AI consulting, AI adoption, AI strategy, business automation |
| /consulting/software-development | custom software development, full-stack development |
| /consulting/digital-modernization | digital modernization, legacy modernization, digital transformation |
| /about | Actaer, software company Novi Pazar Serbia |
| /blog | (per-post; see Blog section) |

Rules: one primary keyword per page, in H1 or first paragraph + pageTitle + pageDescription; no two pages target the same primary; titles ≤ 60 chars before the "| Actaer" template suffix; descriptions 140–160 chars with a benefit and a call to action.

## 2. Copy Rewrite — all pages, all 6 locales

- Rewrite every marketing namespace in `messages/en.json` to the narrative: `home`, `productsPage`, `vantumiqpPage`, `faberpdfPage`, `consultingPage`, `aiConsultingPage`, `softwareDevelopmentPage`, `digitalModernizationPage`, `aboutPage`, `contact`, `blog` (listing chrome), `footer` (description), `metadata`, `navigation` descriptions (dropdown copy).
- All `pageTitle`/`pageDescription` values rewritten per the keyword map.
- JSON-LD descriptions in `lib/seo.ts` (organization, about, blog list) and `public/llms.txt` synchronized with the new copy.
- Translate everything to sr/de/es/pt/pl with the established rules (register per file, product names untouched, sr latinica, ICU placeholders intact). Taglines localized naturally, keeping the story beat.
- Key STRUCTURE stays where possible (same key names/counts) so page components need no changes for pure copy; where the story needs a different section shape, the component changes (see 4–5).

## 3. Navbar Wordmark

- "Actaer" text next to the icon mark: IBM Plex Sans, semibold (600), sentence case, ink #161616, sized to the 48px bar (text-base/lg).
- Locations: Header (desktop + mobile), MobileNav sheet header, Footer (white text on charcoal, next to light logo).
- The logo image files stay as-is (icon only); wordmark is HTML text for crispness and SEO.

## 4. Product Logos

- Assets move from repo-root scratch folders (`vantumiqp/`, `faber_assets/`) into `public/images/products/`:
  - `vantumiqp-logo.png` (cyan V), `faberpdf-logo-black.png`, `faberpdf-logo-white.png`
  - screenshots: `vantumiqp-dashboard.png`, `vantumiqp-sql-editor.jpg`, `vantumiqp-visualize.jpg`
  - Root scratch folders are deleted after the move (decorative avifs and unused variants are not copied).
- Usage (flat, no shadows, no rounding):
  - Homepage product cards: product logo (~32px) beside the product name
  - /products overview cards: same treatment
  - Product page heroes: logo (~48px) above/beside the H1
  - Header Products dropdown: small (~20px) logo beside each product entry
  - FaberPDF: black logo on light surfaces, white variant on dark/blue surfaces if ever needed
- All logo `<Image>` usages have explicit width/height (no layout shift) and descriptive alt text.

## 5. VantumIQP Screenshot Showcase

- New "proof" section on /products/vantumiqp between features and audience band: large `vantumiqp-dashboard.png` full-width in a 1px hairline frame, then `vantumiqp-sql-editor.jpg` + `vantumiqp-visualize.jpg` as a 2-up grid.
- `next/image` with sized dimensions, lazy loading (below the fold), SEO alt texts ("VantumIQP governed dashboard built on Apache Superset", etc.).
- Decorative avif backgrounds from the asset folder are NOT used (clash with Carbon).
- FaberPDF page gets no screenshot section (no assets); its proof section remains the feature grid + privacy band.

## 6. Blog Refresh

- `welcome-to-actaer.mdx` (all 6 locales): rewritten as the product-first founding story following the narrative arc; internal links to /products/* and /consulting/ai-consulting; metadata (title/description/tags) SEO-tuned; FAQ schema updated to the new positioning.
- `ai-agents-enterprise-software.mdx` (all 6 locales): content refreshed and tied to the AI Consulting offer (internal link + closing CTA); `lastUpdated` bumped; FAQ schema kept and checked.
- New cover images: 2 flat geometric SVG covers (white canvas, ink + IBM Blue shapes, no gradients) at `public/images/covers/welcome-to-actaer.svg` and `public/images/covers/ai-agents.svg`; MDX `image` metadata updated; old `ChatGPT-Image-*.avif` files deleted after confirming no other references.

## 7. Verification

- `bun run build` + `bun run lint` pass.
- Locale key-diff script: missing 0 / stale 0 for all 5 non-en files.
- Visual pass at 1280/375 on: home, /products, both product pages, consulting + 3 subpages, about, blog list, both posts.
- Grep gates: no leftover references to deleted avif images; no `vantumiqp/`/`faber_assets/` root folders; titles ≤ 60 chars spot-check.
- Carbon conformance holds (no new shadows/rounding/gradients; logos are the only non-palette colors, as third-party product marks).

## Out of Scope

- New blog posts (possible follow-up).
- Any layout changes beyond the wordmark, logo placements, and the VantumIQP showcase section.
- Changes to vantumiqp.com / faberpdf.com.
- Paid-SEO/analytics tooling.
