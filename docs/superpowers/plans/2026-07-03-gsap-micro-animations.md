# GSAP Micro-Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add minimal Carbon-style micro-animations (scroll-reveal, hero entrance, card stagger via GSAP; hover micro-interactions via CSS) across all pages of the Actaer marketing site.

**Architecture:** One new client component (`ScrollAnimations`) mounted in the locale layout scans the DOM for `data-hero`, `data-reveal`, and `data-reveal-group` attributes and animates them with GSAP + ScrollTrigger using Carbon "productive" motion values. Server components stay server components — they only gain inert data attributes. Hovers are pure CSS with a Carbon easing token.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (CSS-first config in `app/globals.css`), GSAP 3.15 + `@gsap/react` (already in package.json, currently unused), next-intl. Runtime/package manager: **bun**.

**Spec:** `docs/superpowers/specs/2026-07-03-gsap-micro-animations-design.md`

## Global Constraints

- **No new dependencies.** GSAP and `@gsap/react` are already installed.
- **Carbon motion values (verbatim from spec):** entrance easing `cubic-bezier(0, 0, 0.38, 0.9)` (GSAP), standard easing `cubic-bezier(0.2, 0, 0.38, 0.9)` (CSS hovers), hover duration 150ms, reveal duration 0.6s, reveal offset 24px translate-Y, stagger 0.09s.
- **Reveals play once** (`once: true`) — never re-trigger on scroll-up.
- **`prefers-reduced-motion: reduce`** → GSAP does nothing; CSS hover transitions get `motion-reduce:transition-none`.
- **No FOUC / no-JS safety:** CSS must never hide content. All hiding happens via `gsap.from()` at runtime.
- **Server components must not become client components.** Only `ScrollAnimations` is a new client boundary.
- **This repo has no test framework** and adding one is out of scope. Verification per task = `bun run build` (must pass) plus the final browser-verification task. Run builds from the repo root `/Users/adnan/Projects/actaer-page`.

---

### Task 1: Motion foundation — easing token + ScrollAnimations component

**Files:**
- Modify: `app/globals.css` (add `--ease-carbon` + `--color-layer-hover` theme tokens, `--layer-hover` root var)
- Create: `components/layout/ScrollAnimations.tsx`
- Modify: `components/layout/index.ts` (barrel export)
- Modify: `app/[locale]/layout.tsx` (mount component)

**Interfaces:**
- Consumes: `usePathname` from `@/i18n/navigation` (exists, verified).
- Produces: `<ScrollAnimations />` client component (renders `null`); animates any DOM element carrying `data-hero`, `data-reveal`, or `data-reveal-group` (attributes added in Tasks 2–4). Tailwind utilities `ease-carbon` and `bg-layer-hover` / `hover:bg-layer-hover` (used in Task 5).

- [ ] **Step 1: Add motion + hover tokens to `app/globals.css`**

Inside the existing `@theme inline { ... }` block, after the `--radius-4xl: 0px;` line, add:

```css
  /* Carbon productive motion — standard easing for CSS transitions */
  --ease-carbon: cubic-bezier(0.2, 0, 0.38, 0.9);
  --color-layer-hover: var(--layer-hover);
```

Inside the `:root { ... }` block, in the `/* Carbon extras used by components */` group (after `--inverse-ink-muted: #c6c6c6;`), add:

```css
  --layer-hover: #e8e8e8;
```

- [ ] **Step 2: Create `components/layout/ScrollAnimations.tsx`**

```tsx
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { usePathname } from "@/i18n/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

// Carbon productive-entrance curve: cubic-bezier(0, 0, 0.38, 0.9)
const entrance = CustomEase.create("carbonEntrance", "0, 0, 0.38, 0.9");

const OFFSET_Y = 24;
const DURATION = 0.6;
const STAGGER = 0.09;

/**
 * Global animator: reveals elements marked with data attributes.
 * - [data-hero]         staggered entrance on page load (no ScrollTrigger)
 * - [data-reveal]       fade + rise when scrolled into view, once
 * - [data-reveal-group] children fade + rise with stagger, once
 * Content is never hidden by CSS — without JS everything stays visible.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const heroes = gsap.utils.toArray<HTMLElement>("[data-hero]");
      if (heroes.length > 0) {
        gsap.from(heroes, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          stagger: STAGGER,
          clearProps: "all",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          stagger: STAGGER,
          clearProps: "all",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    },
    // Re-run on client-side navigation; revert old tweens/ScrollTriggers first.
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
```

- [ ] **Step 3: Export from the layout barrel**

In `components/layout/index.ts` add:

```ts
export { ScrollAnimations } from "./ScrollAnimations";
```

- [ ] **Step 4: Mount in `app/[locale]/layout.tsx`**

Change the import line:

```tsx
import { CookieBanner, BackToTop, ScrollAnimations } from "@/components/layout";
```

and inside `NextIntlClientProvider`, after `{children}`:

```tsx
      {children}
      <ScrollAnimations />
      <BackToTop />
      <CookieBanner />
```

- [ ] **Step 5: Verify build**

Run: `bun run build`
Expected: build completes with no errors (no animations visible yet — no attributes exist).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/layout/ScrollAnimations.tsx components/layout/index.ts "app/[locale]/layout.tsx"
git commit -m "feat: add ScrollAnimations component with Carbon motion tokens"
```

---

### Task 2: Hero entrance — HomeHero and PageHero

**Files:**
- Modify: `components/carbon/eyebrow.tsx` (accept/spread HTML attributes)
- Modify: `components/sections/HomeHero.tsx`
- Modify: `components/carbon/page-hero.tsx`

**Interfaces:**
- Consumes: `data-hero` handling from Task 1 (`ScrollAnimations` staggers all `[data-hero]` elements on load, in DOM order).
- Produces: `Eyebrow` now accepts standard `<p>` HTML attributes (e.g. `data-hero=""`). Every page hero (home + all subpages via `PageHero`) plays a staggered entrance.

- [ ] **Step 1: Let `Eyebrow` pass through HTML attributes**

Replace the full contents of `components/carbon/eyebrow.tsx` with:

```tsx
export function Eyebrow({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="text-eyebrow text-muted-foreground before:mb-3 before:block before:h-0.5 before:w-8 before:bg-primary before:content-['']"
      {...props}
    >
      {children}
    </p>
  );
}
```

- [ ] **Step 2: Tag `HomeHero` elements**

In `components/sections/HomeHero.tsx`, add `data-hero=""` to the four animatable elements (eyebrow, h1, description, CTA row):

```tsx
      <div className="max-w-5xl space-y-6">
        <Eyebrow data-hero="">{t("eyebrow")}</Eyebrow>
        <h1 data-hero="" className="text-display-xl text-balance">{t("title")}</h1>
        <p data-hero="" className="text-body-lg max-w-2xl text-muted-foreground">{t("description")}</p>
        <div data-hero="" className="flex flex-wrap pt-4">
```

(Only these four attribute additions — everything else stays as is.)

- [ ] **Step 3: Tag `PageHero` elements**

In `components/carbon/page-hero.tsx`, add `data-hero=""` to the media wrapper, eyebrow, h1, description, and children row:

```tsx
      <div className="max-w-4xl space-y-6">
        {media ? <div data-hero="" className="pb-2">{media}</div> : null}
        {eyebrow ? <Eyebrow data-hero="">{eyebrow}</Eyebrow> : null}
        <h1 data-hero="" className="text-display-lg text-balance">{title}</h1>
        {description ? (
          <p data-hero="" className="text-body-lg max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
        {children ? <div data-hero="" className="flex flex-wrap gap-0 pt-4">{children}</div> : null}
      </div>
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/carbon/eyebrow.tsx components/carbon/page-hero.tsx components/sections/HomeHero.tsx
git commit -m "feat: staggered hero entrance on home and page heroes"
```

---

### Task 3: Scroll reveals — home sections and CtaBanner

**Files:**
- Modify: `components/sections/ProductsShowcase.tsx`
- Modify: `components/sections/ConsultingOverview.tsx`
- Modify: `components/sections/WhyActaer.tsx`
- Modify: `components/sections/BlogTeaser.tsx`
- Modify: `components/carbon/cta-banner.tsx`

**Interfaces:**
- Consumes: `data-reveal` / `data-reveal-group` handling from Task 1. `data-reveal-group` animates the element's **direct children** with stagger.
- Produces: home page sections reveal on scroll; CTA banner reveals on every page that uses it.

Pattern for every section: the header block (`mb-12` div) gets `data-reveal=""`; the card grid gets `data-reveal-group=""`. Cards use overlapping 1px borders (`-mt-px`/`-ml-px`) — translate-Y animation does not affect layout, so no border artifacts.

- [ ] **Step 1: `ProductsShowcase.tsx`**

```tsx
      <div data-reveal="" className="mb-12 space-y-4">
```
and
```tsx
      <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-2">
```

- [ ] **Step 2: `ConsultingOverview.tsx`**

```tsx
      <div data-reveal="" className="mb-12 space-y-4">
```
and
```tsx
      <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-3">
```

- [ ] **Step 3: `WhyActaer.tsx`**

```tsx
      <div data-reveal="" className="mb-12 space-y-4">
```
and
```tsx
      <div data-reveal-group="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

- [ ] **Step 4: `BlogTeaser.tsx`**

```tsx
      <div data-reveal="" className="mb-12 flex flex-wrap items-end justify-between gap-4">
```
and
```tsx
      <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-3">
```

- [ ] **Step 5: `cta-banner.tsx`**

The banner is one visual unit — a single `data-reveal` on the inner container:

```tsx
      <div data-reveal="" className="mx-auto flex max-w-[1584px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
```

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/sections/ProductsShowcase.tsx components/sections/ConsultingOverview.tsx components/sections/WhyActaer.tsx components/sections/BlogTeaser.tsx components/carbon/cta-banner.tsx
git commit -m "feat: scroll reveals for home sections and CTA banner"
```

---

### Task 4: Scroll reveals — subpage in-page sections

**Files:**
- Modify: `app/[locale]/products/vantumiqp/page.tsx`
- Modify: `app/[locale]/products/faberpdf/page.tsx`
- Modify: `app/[locale]/consulting/ai-consulting/page.tsx`
- Modify: `app/[locale]/consulting/software-development/page.tsx`
- Modify: `app/[locale]/consulting/digital-modernization/page.tsx`
- Modify: `app/[locale]/about/page.tsx`
- Modify: `app/[locale]/contact/page.tsx`
- Modify: `app/[locale]/blog/page.tsx`

**Interfaces:**
- Consumes: `data-reveal` / `data-reveal-group` handling from Task 1.
- Produces: subpage content sections reveal on scroll. Privacy and cookies pages are intentionally untouched (hero entrance only, via `PageHero` from Task 2). `app/[locale]/products/page.tsx` and `app/[locale]/consulting/page.tsx` need no edits — they compose only `PageHero` + shared sections + `CtaBanner`, all already covered.

Apply the same mechanical rule as Task 3 — section header blocks get `data-reveal=""`, card/item grids get `data-reveal-group=""`. Exact targets (line numbers as of commit `35e6091`; re-locate by the quoted className if drifted):

- [ ] **Step 1: `products/vantumiqp/page.tsx`** — add `data-reveal=""` to the `<div className="mb-12 space-y-4">` at lines 80 and 95; add `data-reveal-group=""` to `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">` (line 84) and `<div className="grid grid-cols-1 gap-8 md:grid-cols-2">` (line 109). Inspect the `<Section>` at line 132: if it contains a header block / grid matching the pattern, tag them the same way; if it is plain prose, leave it.

- [ ] **Step 2: `products/faberpdf/page.tsx`** — add `data-reveal=""` to `<div className="mb-12 space-y-4">` (line 80); add `data-reveal-group=""` to `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">` (line 84). Inspect the `<Section band="muted">` at line 94 and apply the pattern if it matches.

- [ ] **Step 3: `consulting/ai-consulting/page.tsx`** — `data-reveal=""` on `<div className="mb-12 space-y-4">` (line 57); `data-reveal-group=""` on `<div className="grid grid-cols-1 sm:grid-cols-2">` (line 61). Inspect `<Section band="muted">` at line 71 and apply the pattern if it matches.

- [ ] **Step 4: `consulting/software-development/page.tsx`** — same as Step 3: `data-reveal=""` on line 57's `mb-12 space-y-4` div, `data-reveal-group=""` on line 61's grid.

- [ ] **Step 5: `consulting/digital-modernization/page.tsx`** — same as Step 3: `data-reveal=""` on line 57's `mb-12 space-y-4` div, `data-reveal-group=""` on line 61's grid.

- [ ] **Step 6: `about/page.tsx`** — `data-reveal=""` on `<div className="mb-12 max-w-3xl space-y-4">` (lines 201 and 237); `data-reveal-group=""` on `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">` (line 206) and `<div className="grid grid-cols-1 md:grid-cols-3">` (line 242). Inspect the Sections at lines 154 and 223 and apply the pattern to any header/grid inside.

- [ ] **Step 7: `contact/page.tsx`** — `data-reveal-group=""` on the contact-info grid `<div className="grid grid-cols-1">` (line 166); `data-reveal=""` on `<h2 className="text-display-md mb-12">` (line 203). Do NOT put `data-reveal-group` on the FAQ list (line 205) — accordion items are interactive and numerous; a single `data-reveal=""` on that wrapper div is enough.

- [ ] **Step 8: `blog/page.tsx`** — `data-reveal-group=""` on the posts grid `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">` (line 77).

- [ ] **Step 9: Verify build**

Run: `bun run build`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add "app/[locale]/products" "app/[locale]/consulting" "app/[locale]/about/page.tsx" "app/[locale]/contact/page.tsx" "app/[locale]/blog/page.tsx"
git commit -m "feat: scroll reveals on product, consulting, about, contact, and blog pages"
```

---

### Task 5: Hover micro-interactions (CSS only)

**Files:**
- Modify: `components/carbon/arrow-link.tsx`
- Modify: `components/sections/ProductsShowcase.tsx`
- Modify: `components/sections/ConsultingOverview.tsx`
- Modify: `components/sections/BlogTeaser.tsx`
- Modify: `components/blog/BlogCard.tsx`

**Interfaces:**
- Consumes: `ease-carbon` and `hover:bg-layer-hover` utilities from Task 1.
- Produces: nothing consumed downstream — leaf styling. Rule from spec: only cards containing a link get hover treatment; `WhyActaer` (informational) stays static; no border-color hovers (overlapping 1px borders render partially).

- [ ] **Step 1: `arrow-link.tsx` — arrow slides 4px right on hover**

Update the shared `classes` (add `group`) and both `ArrowRight` icons:

```tsx
  const classes = cn(
    "group inline-flex items-center gap-2 text-sm tracking-[0.16px] text-primary hover:underline underline-offset-4",
    className,
  );
```

Both occurrences of the icon become:

```tsx
        <ArrowRight className="size-4 transition-transform duration-150 ease-carbon group-hover:translate-x-1 motion-reduce:transition-none" />
```

- [ ] **Step 2: `ProductsShowcase.tsx` — card hover tint**

Cards sit on the white canvas band, so muted (#f4f4f4) is the tint:

```tsx
          <article key={product.key} className="-mt-px flex flex-col gap-4 border border-border p-8 transition-colors duration-150 ease-carbon hover:bg-muted motion-reduce:transition-none md:-ml-px md:mt-0">
```

- [ ] **Step 3: `ConsultingOverview.tsx` — card hover tint**

Cards are white on the muted band, so they need the darker `layer-hover` (#e8e8e8):

```tsx
          <article
            key={s.key}
            className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 transition-colors duration-150 ease-carbon hover:bg-layer-hover motion-reduce:transition-none md:-ml-px md:mt-0"
          >
```

- [ ] **Step 4: `BlogTeaser.tsx` — card hover tint**

Same situation as ConsultingOverview (white cards on muted band):

```tsx
          <article key={post.slug} className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 transition-colors duration-150 ease-carbon hover:bg-layer-hover motion-reduce:transition-none md:-ml-px md:mt-0">
```

- [ ] **Step 5: `BlogCard.tsx` — card tint + arrow slide**

The whole card is a link (`group` already on the inner `Link`). Add tint to the article and slide to the arrow:

```tsx
    <article className="-mt-px -ml-px flex flex-col border border-border bg-background transition-colors duration-150 ease-carbon hover:bg-layer-hover motion-reduce:transition-none">
```

and the `ArrowRight` inside the read-more span:

```tsx
              <ArrowRight className="size-4 transition-transform duration-150 ease-carbon group-hover:translate-x-1 motion-reduce:transition-none" />
```

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/carbon/arrow-link.tsx components/sections/ProductsShowcase.tsx components/sections/ConsultingOverview.tsx components/sections/BlogTeaser.tsx components/blog/BlogCard.tsx
git commit -m "feat: Carbon-easing hover micro-interactions on links and cards"
```

---

### Task 6: Browser verification

**Files:** none (verification only; fix-forward any issues found and commit fixes).

- [ ] **Step 1: Start the dev server**

Run: `bun run dev` (background). Wait for "Ready".

- [ ] **Step 2: Home page entrance**

Open `http://localhost:3000`. Expected: eyebrow → title → description → CTAs fade in upward one after another (~90ms apart), once. No flash of hidden content, no layout shift.

- [ ] **Step 3: Scroll reveals on home**

Scroll down slowly. Expected: each section header reveals, then its cards stagger in. Scroll back up and down again: nothing re-animates. CTA banner reveals as one unit.

- [ ] **Step 4: Client-side navigation**

Click through Products → VantumIQP → Consulting → About → Blog using the header nav. Expected: each page plays its `PageHero` entrance; in-page sections reveal on scroll; browser console shows no GSAP/ScrollTrigger warnings (especially no duplicate-trigger accumulation after several navigations).

- [ ] **Step 5: Reduced motion**

In DevTools, emulate `prefers-reduced-motion: reduce` (Rendering tab), reload home. Expected: no animations at all; all content immediately visible; hovers show no transition.

- [ ] **Step 6: Hovers**

With reduced-motion off: hover an ArrowLink (arrow slides 4px right), a product card (tints to #f4f4f4), a consulting/blog card (tints to #e8e8e8).

- [ ] **Step 7: No-JS sanity check**

DevTools → disable JavaScript, reload home. Expected: all content visible and static.

- [ ] **Step 8: Stop dev server, final commit if fixes were made**
