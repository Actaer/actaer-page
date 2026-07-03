# GSAP Micro-Animations — Design

**Date:** 2026-07-03
**Status:** Approved

## Goal

Add minimal, enterprise-appropriate micro-animations so the site feels smooth and alive while staying true to the Carbon design language. Scope approved by owner: scroll-reveal of sections, hero entrance, card stagger, and hover micro-interactions — applied consistently across all pages.

GSAP 3.15 and `@gsap/react` are already in `package.json` but unused; this work puts them to use. No new dependencies.

## Motion language (Carbon "productive" tokens)

All animations use official IBM Carbon motion values to keep the enterprise feel:

| Token | Value | Used for |
|---|---|---|
| Entrance easing | `cubic-bezier(0, 0, 0.38, 0.9)` | reveals, hero entrance |
| Standard easing | `cubic-bezier(0.2, 0, 0.38, 0.9)` | CSS hover transitions |
| Hover duration | 150ms | ArrowLink arrow, card hover |
| Reveal duration | ~500–600ms | scroll-reveal, hero entrance |
| Reveal offset | 24px translate-Y | subtle, not "flying" |
| Stagger | ~90ms | cards, hero elements |

## Architecture

### One new client component: `components/layout/ScrollAnimations.tsx`

`"use client"`, mounted once in `app/[locale]/layout.tsx` next to `BackToTop`. Responsibilities:

- Registers GSAP `ScrollTrigger` plugin.
- Scans the DOM for three data attributes and animates matches:
  - `data-reveal` — element fades in + moves up 24px when it enters the viewport (`start: "top 85%"`, `once: true` — plays only the first time, enterprise standard).
  - `data-reveal-group` — the element's direct children reveal with ~90ms stagger (card grids).
  - `data-hero` — elements animate immediately on mount with stagger (hero entrance, no ScrollTrigger).
- Re-runs on client-side navigation: keyed on `usePathname()` (from `@/i18n/navigation`), with `useGSAP` context revert cleaning up old tweens/triggers so navigating between pages doesn't duplicate or leak ScrollTriggers.
- Respects `prefers-reduced-motion: reduce`: if set, the component does nothing — content stays static and fully visible.
- Uses `gsap.from()` inside `useGSAP` (runs before paint) so there is no flash of unstyled/hidden content. Without JavaScript, content is normally visible (CSS never hides anything) — important for SEO and progressive enhancement.

### Where the attributes go

- `components/sections/HomeHero.tsx` — `data-hero` on eyebrow, title, description, and CTA row → staggered entrance on load.
- `components/carbon/page-hero.tsx` — same `data-hero` treatment → every subpage gets the entrance automatically.
- Home sections (`ProductsShowcase`, `ConsultingOverview`, `WhyActaer`, `BlogTeaser`) — `data-reveal` on the header block, `data-reveal-group` on the card grid.
- `components/carbon/cta-banner.tsx` — `data-reveal` → covers the CTA banner on all pages.
- Other content pages (products, consulting, about, contact, blog) get reveals through the shared primitives (`PageHero`, `CtaBanner`) plus `data-reveal`/`data-reveal-group` on their in-page section headers and card grids. Utility pages (privacy, cookies) get only the `PageHero` entrance — long legal text is not animated.

Server components stay server components — they only gain static attributes. No i18n changes.

### Hover micro-interactions (CSS, not GSAP)

Carbon does hovers in CSS; GSAP per-card hover would add JS weight for no visual gain.

- `components/carbon/arrow-link.tsx` — arrow slides 4px right on hover (150ms, Carbon standard easing).
- Cards (`ProductsShowcase` articles, `BlogCard`, consulting cards) — subtle background tint + stronger border on hover.
- All hover transitions carry `motion-reduce:transition-none`.

## Error handling / degradation

- No JS → no animation, content visible (attributes are inert).
- Reduced motion → component exits early; CSS hovers disabled via `motion-reduce`.
- Unknown/missing attributes on a page → nothing happens; the animator only acts on what it finds.

## Testing

Manual verification in the browser via dev server:

1. Home page: hero entrance stagger plays once on load.
2. Scrolling home: sections and card grids reveal once, no re-trigger on scroll-up.
3. Client-side navigation between pages: animations play on the new page, no duplicated ScrollTriggers or console warnings.
4. `prefers-reduced-motion: reduce` emulation: no animations, all content visible.
5. Hover: ArrowLink arrow slide, card tint.
