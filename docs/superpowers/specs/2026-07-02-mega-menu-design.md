# IBM Mega-Menu Navigation — Design Spec

**Date:** 2026-07-02
**Status:** Approved by user

## Goal

Replace the compact Products/Consulting header dropdowns with a full-width IBM/Carbon-style mega-menu panel, fixing the current title/description overlap bug.

## Bug Being Fixed

shadcn 4.12's `NavigationMenuLink` base class includes `flex items-center gap-1.5` (components/ui/navigation-menu.tsx:131), which lays our stacked title `<div>` + description `<p>` out in a ROW — title and description overlap/collide. The new markup overrides to a column layout.

## Design

**Mechanism:** keep Radix `NavigationMenu` (keyboard/ARIA for free). Restyle so the dropdown content spans the full viewport width directly under the 48px nav bar: `NavigationMenu` root becomes `static` (not a positioning context), the viewport/content container is positioned `absolute left-0 right-0 top-full w-full` relative to the fixed header.

**Panel chrome (Carbon, per DESIGN.md):** white `--background` canvas; 1px `--border` hairline bottom (top edge coincides with the header's existing bottom hairline); NO shadow; 0px corners; inner container `mx-auto max-w-[1584px] px-4 md:px-8 py-8`.

**Two-zone layout:**

1. **Left column** (~1/4 width, 1px hairline separator on the right, `pr-8`):
   - Section title: the nav label ("Products" / "Consulting") at `text-card-title` (24px/400) — sentence case.
   - One-line description in `text-sm text-muted-foreground`: reuse `navigation.allProductsDescription` / `navigation.allConsultingDescription`.
   - `ArrowLink` to the overview page: label `navigation.allProducts` → `/products`; `navigation.allConsulting` → `/consulting`.
   - The "All products"/"Consulting overview" GRID ENTRIES are removed (the left column replaces them).
2. **Right zone** (`pl-8`, grid `grid-cols-1 lg:grid-cols-2 gap-x-8`): link rows. Each row is a `NavigationMenuLink` (asChild → `Link`) with `flex-col items-start` override:
   - Row 1: product logo icon (20px, products only) + title `text-sm font-semibold text-foreground`; for AI Consulting additionally a `consultingPage.flagshipLabel` tag in `text-xs text-primary` (the panel's only blue).
   - Row 2: description `text-sm text-muted-foreground`, no clamp collisions (full width of the row).
   - Row padding `p-4`, min height 48px, hover/focus = `bg-muted`, no per-cell borders, active route = `bg-muted`.

**Content:** Products menu → VantumIQP, FaberPDF. Consulting menu → AI Consulting (+ flagship tag), Software Development, Digital Modernization. All labels/descriptions from existing `navigation.*` keys — NO new message keys, so no translation work.

**Untouched:** MobileNav, Blog/About plain links, LanguageSwitcher, Contact button, all pages.

## Files

- `components/layout/Header.tsx` — dropdown markup replaced with mega-menu panel composition.
- `components/ui/navigation-menu.tsx` — only if needed for full-width viewport positioning (className overrides preferred; edit the ui file only where a wrapper hardcodes centering/width).

## Verification

- `bun run build` + `bun run lint` pass.
- Visual: 1280px and 1584px+ (panel spans full width, inner content aligns with nav container), 768px (still desktop nav), <768px (hamburger unaffected). No overlap between title and description. No shadow, no rounding.
- Keyboard: Tab into trigger, Enter/Space opens, arrows traverse links, Escape closes (Radix defaults intact).
- Spot-check /sr and /de — all strings come from existing translated keys.

## Out of Scope

- MobileNav changes; new message keys; any page content.
