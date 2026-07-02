# Actaer Carbon Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild actaer.com as a product-first company site (VantumIQP + FaberPDF, AI consulting secondary) on the IBM Carbon design system defined in `DESIGN.md`, light-only, in all 6 locales.

**Architecture:** In-place rebuild of a Next.js 16 App Router site. Existing infrastructure (next-intl, MDX blog, SEO/JSON-LD, cookie consent, Formspree) stays. We replace the theme tokens, typography, shadcn button chrome, header/footer, all marketing pages, and copy. New pages compose a small set of shared Carbon primitives (`components/carbon/`).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui, next-intl 4, IBM Plex Sans via `next/font/google`, MDX blog (untouched).

**Spec:** `docs/superpowers/specs/2026-07-02-actaer-redesign-design.md`
**Design system source of truth:** `DESIGN.md` (repo root)

## Global Constraints

- Package manager is **bun** (`bun install`, `bun add`, `bunx`). Never npm/yarn/pnpm.
- Verification command for every task: `bun run build` must pass and `bun run lint` must pass. There is no unit-test suite; the build IS the test.
- **Carbon rules (from DESIGN.md) apply to every component:** 0px corners everywhere; no drop shadows (hierarchy via 1px `border-border` hairlines and canvas↔`bg-muted` surface change); IBM Blue `#0f62fe` is the ONLY accent (links, primary CTA, CTA banner, focus); display headlines (42–76px) at font-weight **300**; body at 400 with `letter-spacing: 0.16px`; eyebrows are sentence case 14px (never all-caps tracked); the footer is the only dark (`#161616`) surface.
- Light-only. No `next-themes`, no `.dark` styles, no mode toggle anywhere.
- All user-facing strings go through next-intl (`useTranslations` / `getTranslations`) — never hardcode copy in components. Locales: en, sr, de, es, pt, pl.
- External product URLs: `https://www.vantumiqp.com` and `https://www.faberpdf.com` (open in new tab, `rel="noopener noreferrer"`).
- Commit after every task with a `feat:`/`chore:`/`refactor:` message ending in `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Locale list regex for redirects: `(en|sr|de|es|pt|pl)`.

---

### Task 1: Update Next.js, shadcn, and dependencies

**Files:**
- Modify: `package.json` (via bun commands, not hand-editing)

**Interfaces:**
- Produces: up-to-date dependency tree that all later tasks build on.

- [ ] **Step 1: Update pinned framework packages to latest**

```bash
bun add next@latest react@latest react-dom@latest shadcn@latest
bun add -d eslint-config-next@latest @types/react@latest @types/react-dom@latest
```

- [ ] **Step 2: Update remaining dependencies within/beyond ranges**

```bash
bun update
bun add next-intl@latest @next/mdx@latest tailwind-merge@latest lucide-react@latest
```

- [ ] **Step 3: Verify build passes**

Run: `bun run build`
Expected: build completes with no errors. If next-intl or MDX plugin APIs changed in the new majors, fix call sites in `next.config.ts` / `i18n/request.ts` per the migration notes the build error points to.

Run: `bun run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: update next, shadcn and dependencies to latest"
```

---

### Task 2: Carbon theme foundation (tokens, fonts, light-only, buttons)

**Files:**
- Modify: `app/globals.css` (full rewrite)
- Modify: `app/layout.tsx`
- Modify: `components/ui/button.tsx`
- Modify: `lib/metadata.ts:22-30` (viewport themeColor)
- Delete: `components/theme-provider.tsx`, `components/mode-toggle.tsx`

**Interfaces:**
- Produces: CSS variables (`--primary` #0f62fe, `--foreground` #161616, `--muted` #f4f4f4, `--border` #e0e0e0, radius 0); typography utility classes `text-display-xl`, `text-display-lg`, `text-display-md`, `text-headline`, `text-card-title`, `text-subhead`, `text-body-lg`, `text-body-tracked`, `text-eyebrow`; Button variants `default` (blue), `secondary` (charcoal), `outline` (tertiary: white + blue border), `ghost`, `destructive`, `link` with sizes `default` (48px), `sm` (40px), `lg`, `icon`, `icon-sm`, `xs`. All later tasks consume these.

- [ ] **Step 1: Rewrite `app/globals.css`**

Replace the whole file with:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-heading: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  /* Carbon: flat-square everywhere. Kill Tailwind's radius scale. */
  --radius-xs: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
  --radius-4xl: 0px;
}

:root {
  /* Carbon palette — DESIGN.md colors block */
  --background: #ffffff;
  --foreground: #161616;
  --card: #ffffff;
  --card-foreground: #161616;
  --popover: #ffffff;
  --popover-foreground: #161616;
  --primary: #0f62fe;
  --primary-foreground: #ffffff;
  --secondary: #161616;
  --secondary-foreground: #ffffff;
  --muted: #f4f4f4;
  --muted-foreground: #525252;
  --accent: #f4f4f4;
  --accent-foreground: #161616;
  --destructive: #da1e28;
  --border: #e0e0e0;
  --input: #f4f4f4;
  --ring: #0f62fe;
  --radius: 0rem;
  --sidebar: #f4f4f4;
  --sidebar-foreground: #161616;
  --sidebar-primary: #0f62fe;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #e0e0e0;
  --sidebar-accent-foreground: #161616;
  --sidebar-border: #e0e0e0;
  --sidebar-ring: #0f62fe;
  /* Carbon extras used by components */
  --ink-subtle: #8c8c8c;
  --blue-hover: #0050e6;
  --blue-pressed: #002d9c;
  --inverse-surface-1: #262626;
  --inverse-ink-muted: #c6c6c6;
}

/* Carbon type scale — DESIGN.md typography block */
@utility text-display-xl {
  font-size: clamp(2.625rem, 1.5rem + 4.5vw, 4.75rem); /* 42 → 76px */
  font-weight: 300;
  line-height: 1.17;
  letter-spacing: -0.5px;
}
@utility text-display-lg {
  font-size: clamp(2.25rem, 1.5rem + 3vw, 3.75rem); /* 36 → 60px */
  font-weight: 300;
  line-height: 1.17;
  letter-spacing: -0.4px;
}
@utility text-display-md {
  font-size: clamp(1.75rem, 1.35rem + 1.6vw, 2.625rem); /* 28 → 42px */
  font-weight: 300;
  line-height: 1.2;
}
@utility text-headline {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.25;
}
@utility text-card-title {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.33;
}
@utility text-subhead {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.4;
}
@utility text-body-lg {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5;
}
@utility text-body-tracked {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.16px;
}
@utility text-eyebrow {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.29;
  letter-spacing: 0.16px;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html,
  body {
    @apply overflow-x-hidden;
  }
  body {
    @apply bg-background text-foreground;
    letter-spacing: 0.16px; /* Carbon body tracking — do not remove */
  }
}
```

Note: the `.dark { ... }` block, `@custom-variant dark`, and chart variables are intentionally gone. Existing `dark:` classes elsewhere become inert (no `.dark` ancestor ever exists) and get cleaned up when each file is touched.

- [ ] **Step 2: Rewrite `app/layout.tsx` — IBM Plex Sans, drop ThemeProvider**

Replace the font imports and body with:

```tsx
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { baseMetadata, viewport as baseViewport } from "@/lib/metadata";
import {
  generateEnhancedOrganizationJsonLd,
  generateWebsiteWithSearchJsonLd,
} from "@/lib/seo";
import { locales } from "@/i18n/config";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { ConditionalAnalytics } from "@/components/layout";
import { getLocale } from "next-intl/server";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sans",
});
```

Keep `metadata`, `viewport`, JSON-LD constants, `generateStaticParams`, and the `<head>` block exactly as they are. Replace `<body>`:

```tsx
      <body className={`${plexSans.variable} font-sans antialiased`}>
        <CookieConsentProvider>
          {children}
          <ConditionalAnalytics />
        </CookieConsentProvider>
      </body>
```

Remove the `ThemeProvider` import and wrapper entirely.

- [ ] **Step 3: Remove next-themes from the codebase**

```bash
rm components/theme-provider.tsx components/mode-toggle.tsx
grep -rln "next-themes\|mode-toggle\|ModeToggle" app components lib
```

For every hit (known: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, possibly `MobileNav.tsx`): remove the `useTheme` import/usage — always render the dark logo `/images/logo-dark.png` (dark logo on white canvas) and delete `<ModeToggle />` usages. Header and Footer get fully rewritten in Task 3, so a minimal compile-fix here is fine. Then:

```bash
bun remove next-themes
```

- [ ] **Step 4: Rewrite Button variants in `components/ui/button.tsx`**

Replace `buttonVariants` with Carbon chrome (keep the `Button` function component as-is):

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border border-transparent text-sm font-normal tracking-[0.16px] transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-(--blue-hover) active:bg-(--blue-pressed)",
        secondary:
          "bg-foreground text-background hover:bg-(--inverse-surface-1)",
        outline:
          "border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-muted",
        destructive: "bg-destructive text-white hover:bg-[#ba1b23]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 gap-2 px-4",
        xs: "h-8 gap-1 px-3 text-xs",
        sm: "h-10 gap-2 px-4",
        lg: "h-12 gap-2 px-6",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

- [ ] **Step 5: Fix viewport themeColor in `lib/metadata.ts`**

Replace the `themeColor` array with the single light value:

```ts
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
```

- [ ] **Step 6: Verify**

Run: `bun run build && bun run lint`
Expected: passes. `grep -rn "next-themes" app components lib package.json` returns nothing.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: Carbon theme foundation — IBM Plex Sans, flat-square tokens, light-only, Carbon buttons"
```

---

### Task 3: Shared Carbon primitives + Header/MobileNav/Footer

**Files:**
- Create: `components/carbon/section.tsx`, `components/carbon/eyebrow.tsx`, `components/carbon/page-hero.tsx`, `components/carbon/cta-banner.tsx`, `components/carbon/arrow-link.tsx`, `components/carbon/index.ts`
- Modify: `components/layout/Header.tsx` (full rewrite), `components/layout/MobileNav.tsx`, `components/layout/Footer.tsx` (full rewrite)
- Modify: `messages/en.json` (`navigation` + `footer` namespaces)

**Interfaces:**
- Consumes: theme tokens and typography utilities from Task 2.
- Produces:
  - `Section({ band?: "canvas" | "muted" | "inverse", className?, children, id? })` — full-width band with hairline top border and a `max-w-[1584px] mx-auto px-4 md:px-8 py-16 md:py-24` inner container.
  - `Eyebrow({ children })` — sentence-case 14px `text-muted-foreground` label with a 32px blue rule above.
  - `PageHero({ eyebrow?, title, description?, children? })` — page opener: Eyebrow, `<h1 className="text-display-lg">`, `text-body-lg text-muted-foreground` description, CTA slot.
  - `CtaBanner({ title, description?, ctaLabel, ctaHref })` — full-bleed `bg-primary text-primary-foreground` panel, 48px padding, `text-headline` title, white `outline`-style button.
  - `ArrowLink({ href, children, external? })` — Carbon ghost link: `text-primary text-sm` + `ArrowRight` icon, no underline until hover.
  - New `navigation.*` and `footer.*` message keys (listed in Step 4).

- [ ] **Step 1: Create the Carbon primitives**

`components/carbon/section.tsx`:

```tsx
import { cn } from "@/lib/utils";

type Band = "canvas" | "muted" | "inverse";

const bandClasses: Record<Band, string> = {
  canvas: "bg-background",
  muted: "bg-muted",
  inverse: "bg-foreground text-background",
};

export function Section({
  band = "canvas",
  className,
  innerClassName,
  id,
  children,
}: {
  band?: Band;
  className?: string;
  innerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("border-t border-border", bandClasses[band], className)}>
      <div className={cn("mx-auto max-w-[1584px] px-4 py-16 md:px-8 md:py-24", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
```

`components/carbon/eyebrow.tsx`:

```tsx
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow text-muted-foreground before:mb-3 before:block before:h-0.5 before:w-8 before:bg-primary before:content-['']">
      {children}
    </p>
  );
}
```

`components/carbon/page-hero.tsx`:

```tsx
import { Eyebrow } from "./eyebrow";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="max-w-4xl space-y-6">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="text-display-lg text-balance">{title}</h1>
        {description ? (
          <p className="text-body-lg max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
        {children ? <div className="flex flex-wrap gap-0 pt-4">{children}</div> : null}
      </div>
    </div>
  );
}
```

`components/carbon/cta-banner.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function CtaBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1584px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-headline">{title}</h2>
          {description ? <p className="text-body-tracked text-primary-foreground/80">{description}</p> : null}
        </div>
        <Button
          asChild
          className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary border"
          size="lg"
        >
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
```

`components/carbon/arrow-link.tsx`:

```tsx
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  external = false,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "inline-flex items-center gap-2 text-sm tracking-[0.16px] text-primary hover:underline underline-offset-4",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowRight className="size-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
```

`components/carbon/index.ts`:

```ts
export { Section } from "./section";
export { Eyebrow } from "./eyebrow";
export { PageHero } from "./page-hero";
export { CtaBanner } from "./cta-banner";
export { ArrowLink } from "./arrow-link";
```

- [ ] **Step 2: Rewrite `components/layout/Header.tsx` as a Carbon top-nav**

White sticky bar, 48px tall, 1px bottom hairline, flat. No GSAP, no floating pill, no theme logic:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = useTranslations("navigation");

  const products = [
    { title: "VantumIQP", href: "/products/vantumiqp", description: t("vantumiqpDescription") },
    { title: "FaberPDF", href: "/products/faberpdf", description: t("faberpdfDescription") },
    { title: t("allProducts"), href: "/products", description: t("allProductsDescription") },
  ];

  const consulting = [
    { title: t("aiConsulting"), href: "/consulting/ai-consulting", description: t("aiConsultingDescription") },
    { title: t("softwareDevelopment"), href: "/consulting/software-development", description: t("softwareDevelopmentDescription") },
    { title: t("digitalModernization"), href: "/consulting/digital-modernization", description: t("digitalModernizationDescription") },
    { title: t("allConsulting"), href: "/consulting", description: t("allConsultingDescription") },
  ];

  const navItems = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  const dropdown = (label: string, rootHref: string, items: typeof products) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn(pathname.startsWith(rootHref) && "text-primary")}>
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-100 gap-0 p-0 md:w-125 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.href} className="border border-border -ml-px -mt-px">
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "block space-y-1 p-4 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
                    pathname === item.href && "bg-muted",
                  )}
                >
                  <div className="text-sm font-semibold leading-none">{item.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-12 max-w-[1584px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-dark.png"
              alt="Actaer"
              width={120}
              height={40}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {dropdown(t("products"), "/products", products)}
              {dropdown(t("consulting"), "/consulting", consulting)}
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.href && "text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <Button asChild size="sm">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-foreground md:hidden"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">{t("openMenu")}</span>
          </Button>
        </div>
      </header>
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
```

- [ ] **Step 3: Update `components/layout/MobileNav.tsx`**

Read the file first. Apply the same nav structure: top-level links **Products** (→ `/products`), **Consulting** (→ `/consulting`), sub-links for the 2 products and 3 consulting services, then Blog, About, Contact. Remove any theme-toggle/`next-themes` usage and any `rounded-*` classes. Keep the existing Sheet mechanics and `LanguageSwitcher`.

- [ ] **Step 4: Rewrite `components/layout/Footer.tsx` — charcoal Carbon footer**

Structure: `bg-foreground` (#161616), light logo (`/images/logo-light.png`), 4 link columns + contact block, `text-[#c6c6c6]` body with white column headings, hairlines in `#262626`:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";
import { useCookieConsentSafe } from "@/lib/cookie-consent";

export function Footer() {
  const t = useTranslations();
  const cookieContext = useCookieConsentSafe();
  const openPreferences = cookieContext?.openPreferences ?? (() => {});

  const columns = [
    {
      heading: t("footer.products"),
      links: [
        { label: "VantumIQP", href: "/products/vantumiqp" },
        { label: "FaberPDF", href: "/products/faberpdf" },
        { label: t("navigation.allProducts"), href: "/products" },
      ],
    },
    {
      heading: t("footer.consulting"),
      links: [
        { label: t("navigation.aiConsulting"), href: "/consulting/ai-consulting" },
        { label: t("navigation.softwareDevelopment"), href: "/consulting/software-development" },
        { label: t("navigation.digitalModernization"), href: "/consulting/digital-modernization" },
      ],
    },
    {
      heading: t("footer.company"),
      links: [
        { label: t("navigation.about"), href: "/about" },
        { label: t("navigation.blog"), href: "/blog" },
        { label: t("navigation.contact"), href: "/contact" },
      ],
    },
    {
      heading: t("footer.legal"),
      links: [
        { label: t("footer.privacyPolicy"), href: "/privacy" },
        { label: t("footer.cookiePolicy"), href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-(--inverse-ink-muted)">
      <div className="mx-auto max-w-[1584px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/logo-light.png" alt="Actaer" width={120} height={40} className="h-7 w-auto" />
            </Link>
            <p className="mb-6 max-w-xs text-sm">{t("footer.description")}</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${siteConfig.links.email}`} className="block hover:text-background">
                {siteConfig.links.email}
              </a>
              <a href={`tel:${siteConfig.links.phone}`} className="block hover:text-background">
                {siteConfig.links.phone}
              </a>
              <p>
                {siteConfig.address.city}, {siteConfig.address.country}
              </p>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-sm font-semibold text-background">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === t("footer.legal") ? (
                  <li>
                    <button onClick={openPreferences} className="text-sm transition-colors hover:text-background">
                      {t("footer.cookieSettings")}
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-(--inverse-surface-1) pt-8 md:flex-row md:items-center">
          <p className="text-sm">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-6 text-sm">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-background">
              LinkedIn
            </a>
            <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-background">
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Update `messages/en.json` — `navigation` and `footer` namespaces**

Replace the `navigation` object with:

```json
"navigation": {
  "products": "Products",
  "allProducts": "All products",
  "allProductsDescription": "Everything we build and ship.",
  "vantumiqpDescription": "Business intelligence workspace built on Apache Superset.",
  "faberpdfDescription": "Local-first desktop PDF editor. No cloud round-trips.",
  "consulting": "Consulting",
  "allConsulting": "Consulting overview",
  "allConsultingDescription": "How we work with client teams.",
  "aiConsulting": "AI Consulting",
  "aiConsultingDescription": "AI strategy, adoption and automation for your business.",
  "softwareDevelopment": "Software Development",
  "softwareDevelopmentDescription": "Custom software built by a team that ships its own products.",
  "digitalModernization": "Digital Modernization",
  "digitalModernizationDescription": "We teach companies how to modernize and adopt technology.",
  "about": "About",
  "blog": "Blog",
  "contact": "Contact",
  "openMenu": "Open menu"
}
```

In `footer`, keep existing keys (`description`, `company`, `legal`, `privacyPolicy`, `cookiePolicy`, `cookieSettings`, `copyright`) but update `description` to `"Software product company from Novi Pazar, Serbia. We build VantumIQP and FaberPDF, and help companies put AI to work."`, remove `services`, and add `"products": "Products"` and `"consulting": "Consulting"`.

The other 5 locale files will temporarily miss these keys — next-intl falls back per its config; full translations land in Task 9. Add the same keys to `messages/sr.json` etc. only if the build fails on missing messages.

- [ ] **Step 6: Verify**

Run: `bun run build && bun run lint` — expected: pass.
Run: `bun run dev` and load `http://localhost:3000/en` — header renders as flat white 48px bar with hairline; footer is charcoal. (Old homepage sections still show old copy — fine, they're replaced in Task 4.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: Carbon primitives, top-nav header and charcoal footer"
```

---

### Task 4: New homepage

**Files:**
- Create: `components/sections/HomeHero.tsx`, `components/sections/ProductsShowcase.tsx`, `components/sections/ConsultingOverview.tsx`, `components/sections/WhyActaer.tsx`, `components/sections/BlogTeaser.tsx`
- Delete: `components/sections/Hero.tsx`, `components/sections/About.tsx`, `components/sections/ServicesGrid.tsx`, `components/sections/TechStack.tsx`, `components/sections/Workflow.tsx`, `components/sections/CtaSection.tsx`
- Modify: `components/sections/index.ts`, `app/[locale]/page.tsx`, `messages/en.json` (new `home` namespace; delete `hero`, `about` (home-section one), `services` namespaces)

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `CtaBanner`, `ArrowLink` from `components/carbon`; Button; `getAllPosts(locale)` from `lib/blog.ts` (returns posts with `slug`, `title`, `description`, `date`).
- Produces: `HomeHero`, `ProductsShowcase`, `ConsultingOverview`, `WhyActaer` (server components, no props), `BlogTeaser` (async server component taking `{ locale: Locale }`).

- [ ] **Step 1: Add the `home` namespace to `messages/en.json`**

```json
"home": {
  "hero": {
    "eyebrow": "Software products and AI consulting",
    "title": "We build software products. And we help companies put AI to work.",
    "description": "Actaer is a product company. We build and ship VantumIQP and FaberPDF — and we bring the same engineering discipline to companies that want to modernize with AI.",
    "primaryCta": "Explore our products",
    "secondaryCta": "AI consulting"
  },
  "products": {
    "eyebrow": "Our products",
    "title": "Software we build and stand behind",
    "vantumiqp": {
      "category": "Business intelligence",
      "tagline": "Open your data. See the story. Share the answer.",
      "description": "A governed BI workspace built on Apache Superset — dashboards, SQL exploration and decision-ready reports in one place.",
      "feature1": "40+ chart types",
      "feature2": "SQL exploration without tool-switching",
      "feature3": "Role-aware dashboards with governance",
      "cta": "Learn more"
    },
    "faberpdf": {
      "category": "Document tools",
      "tagline": "The modern local-first PDF editor.",
      "description": "Sign, annotate, edit and validate PDFs entirely on your desktop. No uploads, no cloud round-trips — documents never leave your machine.",
      "feature1": "Sign and annotate locally",
      "feature2": "Edit text and validate files",
      "feature3": "Windows and Linux, free during beta",
      "cta": "Learn more"
    }
  },
  "consulting": {
    "eyebrow": "Consulting",
    "title": "AI consulting from people who ship software",
    "description": "We are not analysts with slide decks. We build products for a living — and we help your teams adopt AI, modernize systems and ship with confidence.",
    "aiTitle": "AI Consulting",
    "aiDescription": "Our flagship service. AI strategy and roadmaps, model and vendor selection, agentic automation, and hands-on enablement for your teams.",
    "softwareTitle": "Software Development",
    "softwareDescription": "Custom software delivered end to end — full-stack engineering, enterprise integrations and real-time platforms.",
    "modernizationTitle": "Digital Modernization",
    "modernizationDescription": "We teach organizations how to modernize: legacy assessment, process digitization and technology adoption that sticks.",
    "cta": "How we work"
  },
  "why": {
    "eyebrow": "Why Actaer",
    "title": "Product DNA, consulting discipline",
    "point1Title": "We ship our own products",
    "point1Description": "Advice backed by software we build, sell and operate ourselves.",
    "point2Title": "Engineering first",
    "point2Description": "Senior engineers on every engagement — no hand-offs to a bench.",
    "point3Title": "Practical AI",
    "point3Description": "We deploy AI where it earns its keep, not where it demos well.",
    "point4Title": "Based in Serbia, serving Europe",
    "point4Description": "Novi Pazar roots, EU time zone, remote-first delivery."
  },
  "blog": {
    "eyebrow": "Insights",
    "title": "Latest from the blog",
    "cta": "All articles",
    "readMore": "Read article"
  },
  "cta": {
    "title": "Let's talk about your next move",
    "description": "A product demo, an AI roadmap, or a modernization plan — tell us what you need and we'll get back within one business day.",
    "button": "Contact us"
  }
}
```

Delete the now-unused `hero`, `about` (the home-section namespace — keep any `aboutPage` namespace used by `/about`), and `services` namespaces from `messages/en.json` only after Step 4 removes the components that consume them. Mirror the deletions in the other 5 locale files.

- [ ] **Step 2: Create the five section components**

`components/sections/HomeHero.tsx` (server component — no GSAP):

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/carbon";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  const t = useTranslations("home.hero");
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-40 md:pb-24">
      <div className="max-w-5xl space-y-6">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-display-xl text-balance">{t("title")}</h1>
        <p className="text-body-lg max-w-2xl text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap pt-4">
          <Button asChild size="lg">
            <Link href="/products">
              {t("primaryCta")}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="-ml-px">
            <Link href="/consulting/ai-consulting">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

`components/sections/ProductsShowcase.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";

const products = [
  { key: "vantumiqp", name: "VantumIQP", href: "/products/vantumiqp" },
  { key: "faberpdf", name: "FaberPDF", href: "/products/faberpdf" },
] as const;

export function ProductsShowcase() {
  const t = useTranslations("home.products");
  return (
    <Section id="products">
      <div className="mb-12 space-y-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{t("title")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.key} className="-mt-px flex flex-col gap-4 border border-border p-8 md:-ml-px md:mt-0">
            <p className="text-eyebrow text-muted-foreground">{t(`${product.key}.category`)}</p>
            <h3 className="text-card-title">{product.name}</h3>
            <p className="text-subhead">{t(`${product.key}.tagline`)}</p>
            <p className="text-body-tracked text-muted-foreground">{t(`${product.key}.description`)}</p>
            <ul className="mt-2 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <li>{t(`${product.key}.feature1`)}</li>
              <li>{t(`${product.key}.feature2`)}</li>
              <li>{t(`${product.key}.feature3`)}</li>
            </ul>
            <div className="mt-auto pt-4">
              <ArrowLink href={product.href}>{t(`${product.key}.cta`)}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

`components/sections/ConsultingOverview.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";

export function ConsultingOverview() {
  const t = useTranslations("home.consulting");
  const services = [
    { key: "ai", href: "/consulting/ai-consulting", flagship: true },
    { key: "software", href: "/consulting/software-development", flagship: false },
    { key: "modernization", href: "/consulting/digital-modernization", flagship: false },
  ];
  return (
    <Section band="muted">
      <div className="mb-12 space-y-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{t("title")}</h2>
        <p className="text-body-lg max-w-2xl text-muted-foreground">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.key}
            className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 md:-ml-px md:mt-0"
          >
            <h3 className="text-card-title">{t(`${s.key}Title`)}</h3>
            <p className="text-body-tracked text-muted-foreground">{t(`${s.key}Description`)}</p>
            <div className="mt-auto pt-4">
              <ArrowLink href={s.href}>{t("cta")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

`components/sections/WhyActaer.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/carbon";

export function WhyActaer() {
  const t = useTranslations("home.why");
  const points = ["point1", "point2", "point3", "point4"];
  return (
    <Section>
      <div className="mb-12 space-y-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{t("title")}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p} className="-mt-px space-y-2 border border-border p-6 sm:-ml-px sm:mt-0">
            <h3 className="text-body-lg font-semibold">{t(`${p}Title`)}</h3>
            <p className="text-sm text-muted-foreground">{t(`${p}Description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

`components/sections/BlogTeaser.tsx` (async server component):

```tsx
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";
import { formatDate } from "@/lib/date";

export async function BlogTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.blog");
  const posts = (await getAllPosts(locale)).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Section band="muted">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-display-md">{t("title")}</h2>
        </div>
        <ArrowLink href="/blog">{t("cta")}</ArrowLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 md:-ml-px md:mt-0">
            <p className="text-xs tracking-[0.32px] text-muted-foreground">{formatDate(post.date, locale)}</p>
            <h3 className="text-body-lg font-semibold">{post.title}</h3>
            <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-auto pt-2">
              <ArrowLink href={`/blog/${post.slug}`}>{t("readMore")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

Check `lib/date.ts` for the actual `formatDate` signature and `lib/blog.ts` for post field names before wiring; adjust the two call sites if names differ.

- [ ] **Step 3: Update `components/sections/index.ts` and `app/[locale]/page.tsx`**

`index.ts` exports only the five new sections. In `app/[locale]/page.tsx`, keep the JSON-LD scripts, Header and Footer, and replace `<main>`:

```tsx
      <main>
        <HomeHero />
        <ProductsShowcase />
        <ConsultingOverview />
        <WhyActaer />
        <BlogTeaser locale={locale} />
        <CtaBanner
          title={t("cta.title")}
          description={t("cta.description")}
          ctaLabel={t("cta.button")}
          ctaHref="/contact"
        />
      </main>
```

where `const t = await getTranslations("home");` (import `getTranslations` from `next-intl/server` and `CtaBanner` from `@/components/carbon`).

- [ ] **Step 4: Delete the six old section components + their message namespaces**

```bash
rm components/sections/Hero.tsx components/sections/About.tsx components/sections/ServicesGrid.tsx components/sections/TechStack.tsx components/sections/Workflow.tsx components/sections/CtaSection.tsx
grep -rn "TechStack\|ServicesGrid\|Workflow\|CtaSection" app components
```

Fix any remaining importers. Then remove the `hero`, `about` (home-section) and `services` namespaces from all 6 `messages/*.json` files — but first `grep -rn '"services\.\|useTranslations("services' app components` to confirm no retained page uses them (the services PAGES are deleted in Task 6; if they still reference these keys, defer the namespace deletion to Task 6).

- [ ] **Step 5: Verify**

Run: `bun run build && bun run lint` — pass.
Run `bun run dev`, check `http://localhost:3000/en`: hero at display-xl weight 300, two product tiles with hairlines, gray consulting band, why-grid, blog teaser, blue CTA banner, charcoal footer. No rounded corners, no shadows.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: product-first Carbon homepage"
```

---

### Task 5: Product pages

**Files:**
- Create: `app/[locale]/products/page.tsx`, `app/[locale]/products/vantumiqp/page.tsx`, `app/[locale]/products/faberpdf/page.tsx`
- Delete: `app/[locale]/products/vantum-erp/page.tsx` (entire directory)
- Modify: `messages/en.json` (new `productsPage`, `vantumiqpPage`, `faberpdfPage` namespaces)

**Interfaces:**
- Consumes: `PageHero`, `Section`, `Eyebrow`, `CtaBanner`, `ArrowLink`, Button; `constructMetadata` from `lib/metadata.ts`; `generateBreadcrumbJsonLd` from `lib/seo.ts`.
- Produces: routes `/[locale]/products`, `/[locale]/products/vantumiqp`, `/[locale]/products/faberpdf`.

- [ ] **Step 1: Add message namespaces to `messages/en.json`**

```json
"productsPage": {
  "pageTitle": "Products — VantumIQP & FaberPDF",
  "pageDescription": "Software products built by Actaer: VantumIQP, a governed BI workspace, and FaberPDF, a local-first desktop PDF editor.",
  "heroEyebrow": "Our products",
  "heroTitle": "Built, shipped and supported by Actaer",
  "heroDescription": "Two products, one principle: software should respect your data and your time."
},
"vantumiqpPage": {
  "pageTitle": "VantumIQP — Business Intelligence Workspace",
  "pageDescription": "VantumIQP is a governed BI workspace built on Apache Superset: dashboards, SQL exploration and decision-ready reports. Request a demo.",
  "heroEyebrow": "VantumIQP · Business intelligence",
  "heroTitle": "Open your data. See the story. Share the answer.",
  "heroDescription": "VantumIQP is a business intelligence workspace built on Apache Superset — a calmer path from data questions to shared answers, with governance built in.",
  "heroCta": "Request a demo",
  "heroSecondaryCta": "Visit vantumiqp.com",
  "featuresEyebrow": "Capabilities",
  "featuresTitle": "From query to published dashboard",
  "feature1Title": "40+ chart types",
  "feature1Description": "Bar to sankey — every visualization your reports need, ready out of the box.",
  "feature2Title": "SQL exploration",
  "feature2Description": "Explore data in SQL without switching tools; every chart stays traceable to its query.",
  "feature3Title": "Governed dashboards",
  "feature3Description": "Role-aware dashboards with row-level access and permission management.",
  "feature4Title": "Curated datasets",
  "feature4Description": "Reusable, documented datasets so teams answer questions from the same source of truth.",
  "feature5Title": "Analysis vs. reporting",
  "feature5Description": "A clean separation between exploratory analysis and formal, decision-ready reports.",
  "feature6Title": "Superset, refined",
  "feature6Description": "The power of Apache Superset with cleaner UX and guided workflows on top.",
  "audienceEyebrow": "Who it's for",
  "audienceTitle": "Teams that need governed answers, not another tool to babysit",
  "audienceDescription": "Organizations that want dashboards stakeholders actually understand — with the traceability and access control an enterprise expects. Demo access only for now: we start with your use case, not a checkout page.",
  "ctaTitle": "See VantumIQP on your own data",
  "ctaDescription": "Book a demo and we'll walk through your reporting workflow together.",
  "ctaButton": "Request a demo"
},
"faberpdfPage": {
  "pageTitle": "FaberPDF — Local-First PDF Editor",
  "pageDescription": "FaberPDF is a modern local-first desktop PDF editor for Windows and Linux. Sign, annotate, edit and validate PDFs without cloud uploads. Free during beta.",
  "heroEyebrow": "FaberPDF · Document tools",
  "heroTitle": "The modern local-first PDF editor",
  "heroDescription": "Signing a document, marking up a page, validating a file or fixing a small text issue should not require a cloud round-trip. FaberPDF keeps PDF work on your desktop.",
  "heroCta": "Download the beta",
  "heroSecondaryCta": "Visit faberpdf.com",
  "featuresEyebrow": "Capabilities",
  "featuresTitle": "Everything local. Nothing uploaded.",
  "feature1Title": "Sign documents",
  "feature1Description": "Add signatures to contracts and forms without sending them to a third-party server.",
  "feature2Title": "Annotate pages",
  "feature2Description": "Mark up, comment and highlight — review documents at desktop speed.",
  "feature3Title": "Edit text",
  "feature3Description": "Fix typos and make focused corrections directly in the PDF.",
  "feature4Title": "Validate files",
  "feature4Description": "Check PDF integrity and standards conformance before you send.",
  "feature5Title": "Windows & Linux",
  "feature5Description": "Native desktop builds for both platforms.",
  "feature6Title": "Free during beta",
  "feature6Description": "Version 0.1.0 is free to download and try — your feedback shapes the roadmap.",
  "privacyEyebrow": "Why local-first",
  "privacyTitle": "Your documents never leave your machine",
  "privacyDescription": "Browser-based PDF tools mean uploading contracts, invoices and personal documents to someone else's server. FaberPDF does the work on your desktop, so sensitive files stay exactly where they belong.",
  "ctaTitle": "Try FaberPDF today",
  "ctaDescription": "Free during beta, for Windows and Linux.",
  "ctaButton": "Download the beta"
}
```

- [ ] **Step 2: Create `app/[locale]/products/page.tsx`**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, CtaBanner } from "@/components/carbon";
import { ProductsShowcase } from "@/components/sections";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/products",
    canonical: `${siteConfig.url}/${locale}/products`,
  });
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");
  const tHome = await getTranslations("home");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Products", url: `${siteConfig.url}/${locale}/products` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")} />
        <ProductsShowcase />
        <CtaBanner
          title={tHome("cta.title")}
          description={tHome("cta.description")}
          ctaLabel={tHome("cta.button")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Create the two product detail pages**

Both follow the identical template; here is `app/[locale]/products/vantumiqp/page.tsx` in full — `faberpdf/page.tsx` is the same file with `vantumiqpPage` → `faberpdfPage`, external URL `https://www.vantumiqp.com` → `https://www.faberpdf.com`, path `/products/vantumiqp` → `/products/faberpdf`, breadcrumb name `VantumIQP` → `FaberPDF`, and the mid-band namespace keys `audience*` → `privacy*`:

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

const EXTERNAL_URL = "https://www.vantumiqp.com";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vantumiqpPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/products/vantumiqp",
    canonical: `${siteConfig.url}/${locale}/products/vantumiqp`,
  });
}

export default async function VantumIqpPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vantumiqpPage");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Products", url: `${siteConfig.url}/${locale}/products` },
    { name: "VantumIQP", url: `${siteConfig.url}/${locale}/products/vantumiqp` },
  ]);
  const features = ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")}>
          <Button asChild size="lg">
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
              {t("heroCta")}
              <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="-ml-px">
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
              {t("heroSecondaryCta")}
            </a>
          </Button>
        </PageHero>

        <Section>
          <div className="mb-12 space-y-4">
            <Eyebrow>{t("featuresEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("featuresTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f} className="-mt-px space-y-2 border border-border p-6 sm:-ml-px sm:mt-0">
                <h3 className="text-body-lg font-semibold">{t(`${f}Title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`${f}Description`)}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section band="muted">
          <div className="max-w-3xl space-y-4">
            <Eyebrow>{t("audienceEyebrow")}</Eyebrow>
            <h2 className="text-display-md">{t("audienceTitle")}</h2>
            <p className="text-body-lg text-muted-foreground">{t("audienceDescription")}</p>
          </div>
        </Section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-[1584px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-headline">{t("ctaTitle")}</h2>
              <p className="text-body-tracked text-primary-foreground/80">{t("ctaDescription")}</p>
            </div>
            <Button
              asChild
              size="lg"
              className="border border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaButton")}
                <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

(The final CTA links externally, so it inlines the banner markup instead of using `CtaBanner`, which routes internally.)

- [ ] **Step 4: Delete the old ERP page**

```bash
rm -rf "app/[locale]/products/vantum-erp"
grep -rn "vantum-erp" app components messages lib
```

Remove leftover references (message namespaces for the ERP page in all 6 locale files, any links). The `next.config.ts` redirect entries mentioning `vantum-erp` get rewritten in Task 8 — leave them for now.

- [ ] **Step 5: Verify**

Run: `bun run build && bun run lint` — pass. In dev, check `/en/products`, `/en/products/vantumiqp`, `/en/products/faberpdf` render with hero, 6-feature hairline grid, gray band, blue CTA.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: product pages for VantumIQP and FaberPDF, drop vantum-erp"
```

---

### Task 6: Consulting pages

**Files:**
- Create: `app/[locale]/consulting/page.tsx`, `app/[locale]/consulting/ai-consulting/page.tsx`, `app/[locale]/consulting/software-development/page.tsx`, `app/[locale]/consulting/digital-modernization/page.tsx`
- Delete: `app/[locale]/services/` (entire directory)
- Modify: `messages/en.json` (new `consultingPage`, `aiConsultingPage`, `softwareDevelopmentPage`, `digitalModernizationPage`; delete `servicesPage`, `itConsultingPage`, and the old per-service page namespaces from all locales)

**Interfaces:**
- Consumes: same primitives as Task 5.
- Produces: routes `/[locale]/consulting` + 3 sub-routes.

- [ ] **Step 1: Add message namespaces to `messages/en.json`**

```json
"consultingPage": {
  "pageTitle": "Consulting — AI Strategy, Software & Modernization",
  "pageDescription": "AI consulting from a product company: AI strategy and adoption, custom software development, and digital modernization for companies that want to move faster.",
  "heroEyebrow": "Consulting",
  "heroTitle": "AI consulting from people who ship software",
  "heroDescription": "We build products for a living. When we consult, you get the same senior engineers, the same standards, and advice we would follow ourselves.",
  "heroCta": "Talk to us",
  "flagshipLabel": "Flagship service"
},
"aiConsultingPage": {
  "pageTitle": "AI Consulting — Strategy, Adoption & Automation",
  "pageDescription": "AI strategy and roadmaps, model selection, agentic automation and team enablement. Practical AI consulting from a company that builds software products.",
  "heroEyebrow": "Consulting · Flagship",
  "heroTitle": "Put AI to work where it earns its keep",
  "heroDescription": "We help companies move from AI curiosity to AI in production — strategy, pilots, automation and the training your teams need to keep it running.",
  "heroCta": "Start the conversation",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "From roadmap to running system",
  "offering1Title": "AI strategy & roadmap",
  "offering1Description": "Where AI creates value in your business, what to build vs. buy, and a sequenced plan your board can sign off on.",
  "offering2Title": "Adoption & integration",
  "offering2Description": "Model and vendor selection, integration with your existing systems, and evaluation that goes beyond the demo.",
  "offering3Title": "Automation & agents",
  "offering3Description": "Agentic workflows for document processing, reporting and operations — deployed with guardrails, not hype.",
  "offering4Title": "Enablement & training",
  "offering4Description": "Hands-on workshops that leave your engineers and operators able to run and extend what we build.",
  "whyEyebrow": "Why us",
  "whyTitle": "Advice backed by products we ship",
  "whyDescription": "VantumIQP and FaberPDF keep us honest: we deal with data governance, deployment and support every day. That experience — not a methodology binder — is what we bring to your AI initiative.",
  "ctaTitle": "Ready to make AI concrete?",
  "ctaDescription": "Book a working session and leave with next steps, not a sales pitch.",
  "ctaButton": "Contact us"
},
"softwareDevelopmentPage": {
  "pageTitle": "Software Development — Custom Solutions",
  "pageDescription": "Custom software development by a product company: full-stack engineering, enterprise integrations and real-time platforms, delivered end to end.",
  "heroEyebrow": "Consulting · Software development",
  "heroTitle": "Custom software, built like a product",
  "heroDescription": "From requirements to running system — engineered by the team that builds VantumIQP and FaberPDF.",
  "heroCta": "Discuss your project",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "End-to-end delivery",
  "offering1Title": "Full-stack engineering",
  "offering1Description": "Web and desktop applications with modern stacks — TypeScript, React, .NET, and the cloud platform you already use.",
  "offering2Title": "Enterprise integrations",
  "offering2Description": "Connecting the systems you have — ERP, BI, document flows — instead of replacing them wholesale.",
  "offering3Title": "Real-time platforms",
  "offering3Description": "Dashboards, event pipelines and operational tooling that keep up with your business.",
  "offering4Title": "Long-term support",
  "offering4Description": "Maintenance, monitoring and iteration after launch — we don't ship and vanish.",
  "ctaTitle": "Have a system in mind?",
  "ctaDescription": "Tell us what you need built and we'll scope it together.",
  "ctaButton": "Contact us"
},
"digitalModernizationPage": {
  "pageTitle": "Digital Modernization — Adopt Technology That Sticks",
  "pageDescription": "We teach companies how to modernize: legacy assessment, process digitization and pragmatic technology adoption, guided by engineers who ship products.",
  "heroEyebrow": "Consulting · Digital modernization",
  "heroTitle": "Modernize without the big-bang rewrite",
  "heroDescription": "We help organizations move off spreadsheets, paper and legacy systems — step by step, with your team learning as we go.",
  "heroCta": "Plan your modernization",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "Modernization that your team owns",
  "offering1Title": "Legacy assessment",
  "offering1Description": "An honest map of what you run today, what it costs you, and what to change first.",
  "offering2Title": "Process digitization",
  "offering2Description": "Turning manual, paper-driven workflows into digital ones your staff actually adopt.",
  "offering3Title": "Technology adoption",
  "offering3Description": "Selecting and rolling out the right tools — BI, document management, automation — without shelfware.",
  "offering4Title": "Coaching & handover",
  "offering4Description": "We work alongside your people so the capability stays when the engagement ends.",
  "ctaTitle": "Start where you are",
  "ctaDescription": "A one-day assessment is often enough to see the first three moves.",
  "ctaButton": "Contact us"
}
```

- [ ] **Step 2: Create `app/[locale]/consulting/page.tsx`**

Same skeleton as `products/page.tsx` (Step 2 of Task 5): `generateMetadata` from `consultingPage` namespace with `path: "/consulting"`; body = `PageHero` (with a primary Button → `/contact` labeled `heroCta`) + the `ConsultingOverview` section from `@/components/sections` + `CtaBanner` fed from the `home.cta` keys. Breadcrumb: Home → Consulting.

- [ ] **Step 3: Create the three service pages**

All three use one template — here `app/[locale]/consulting/ai-consulting/page.tsx` in full; the other two swap the namespace (`softwareDevelopmentPage` / `digitalModernizationPage`), the `path`, and the breadcrumb name, and omit the `why*` band (only `aiConsultingPage` defines those keys):

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow, CtaBanner } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aiConsultingPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/consulting/ai-consulting",
    canonical: `${siteConfig.url}/${locale}/consulting/ai-consulting`,
  });
}

export default async function AiConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aiConsultingPage");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Consulting", url: `${siteConfig.url}/${locale}/consulting` },
    { name: "AI Consulting", url: `${siteConfig.url}/${locale}/consulting/ai-consulting` },
  ]);
  const offerings = ["offering1", "offering2", "offering3", "offering4"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")}>
          <Button asChild size="lg">
            <Link href="/contact">
              {t("heroCta")}
              <ArrowRight />
            </Link>
          </Button>
        </PageHero>

        <Section>
          <div className="mb-12 space-y-4">
            <Eyebrow>{t("offeringsEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("offeringsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {offerings.map((o) => (
              <div key={o} className="-mt-px space-y-2 border border-border p-8 sm:-ml-px sm:mt-0">
                <h3 className="text-card-title">{t(`${o}Title`)}</h3>
                <p className="text-body-tracked text-muted-foreground">{t(`${o}Description`)}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section band="muted">
          <div className="max-w-3xl space-y-4">
            <Eyebrow>{t("whyEyebrow")}</Eyebrow>
            <h2 className="text-display-md">{t("whyTitle")}</h2>
            <p className="text-body-lg text-muted-foreground">{t("whyDescription")}</p>
          </div>
        </Section>

        <CtaBanner
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          ctaLabel={t("ctaButton")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Delete `/services` pages and stale namespaces**

```bash
rm -rf "app/[locale]/services"
grep -rn '"/services' app components
```

Fix any remaining links (Header/Footer/MobileNav were already updated in Task 3). Remove `servicesPage`, `itConsultingPage`, `softwareDevelopmentPage` (old one — replaced above), `productDevelopmentPage` and the home `services` namespace (if deferred from Task 4) from all 6 locale files.

- [ ] **Step 5: Verify**

Run: `bun run build && bun run lint` — pass. In dev, check the 4 consulting routes and that `/en/services` now 404s (redirects come in Task 8).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: consulting pages with AI consulting flagship, remove services"
```

---

### Task 7: Restyle retained pages (about, contact, blog, privacy, cookies, not-found)

**Files:**
- Modify: `app/[locale]/about/page.tsx`, `app/[locale]/contact/page.tsx`, `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`, `app/[locale]/privacy/page.tsx`, `app/[locale]/cookies/page.tsx`, `app/[locale]/not-found.tsx`
- Modify: any components under `components/blog/`, `components/forms/` with rounded/dark styling
- Modify: `messages/en.json` (update `aboutPage` copy for product-first positioning)

**Interfaces:**
- Consumes: `PageHero`, `Section`, `Eyebrow`, `CtaBanner` from `components/carbon`.
- Produces: nothing new — same routes, Carbon chrome.

- [ ] **Step 1: Mechanical Carbon sweep**

Read each file listed above, then apply these transformations everywhere they occur:

1. Replace page-top hero markup (badges, gradient text, `<highlighted>` spans, centered layouts) with `<PageHero eyebrow={...} title={...} description={...} />`. Titles lose rich-text markup — update the corresponding message keys to plain strings in ALL 6 locale files (the `{highlighted}`/`<highlighted>` interpolations go away).
2. Delete every `dark:*` class, every `shadow-*` class, every `rounded-*` class (except none survive — `rounded-none` may simply be dropped), every gradient (`bg-gradient-*`, `from-*`, `via-*`, `to-*`).
3. Wrap alternating page sections in `<Section>` / `<Section band="muted">`.
4. Badges (e.g. shadcn `Badge`) become `Eyebrow` or plain `text-eyebrow` paragraphs.
5. Blog cards / list items become hairline tiles: `border border-border p-6 bg-background`, title `text-body-lg font-semibold`, meta `text-xs tracking-[0.32px] text-muted-foreground` — same recipe as `BlogTeaser` tiles in Task 4.
6. Blog article page: keep the MDX `prose` styling but constrain to `max-w-3xl mx-auto` and check `mdx-components.tsx` for rounded/shadow styles on images and code blocks (`rounded-lg` on pre/img → remove).
7. Contact form inputs: shadcn `Input`/`Textarea` already inherit radius 0 from tokens; give them Carbon field chrome by adding `bg-muted border-0 border-b border-(--ink-subtle) focus-visible:border-b-2 focus-visible:border-primary rounded-none px-4` via className at the usage sites in `components/forms/` (Carbon input: gray fill, bottom rule, blue focus underline).
8. `not-found.tsx`: `text-display-lg` heading, primary Button home link.

- [ ] **Step 2: Refresh `aboutPage` copy**

Update the `aboutPage` namespace in `messages/en.json` so the story matches the new positioning — company intro paragraph becomes:

```json
"intro": "Actaer is a software product company from Novi Pazar, Serbia. We build VantumIQP, a governed business-intelligence workspace, and FaberPDF, a local-first PDF editor — and we help other companies put AI and modern technology to work through our consulting practice."
```

Keep the rest of the about keys but reword any sentence that calls Actaer a "consulting firm" to "product company with a consulting practice". Check the actual key names in the file first and preserve them (only values change), so the other locales keep working until Task 9 retranslates.

- [ ] **Step 3: Verify**

Run: `bun run build && bun run lint` — pass.
In dev, click through `/en/about`, `/en/contact` (submit disabled state ok), `/en/blog`, one blog article, `/en/privacy`, `/en/cookies`, and a bogus URL for the 404. Confirm: no rounded corners, no shadows, no dark sections except footer, blue only on links/CTAs.

```bash
grep -rn "dark:" app/\[locale\] components/blog components/forms components/sections components/carbon
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: Carbon restyle for about, contact, blog, legal and 404 pages"
```

---

### Task 8: Redirects, SEO, structured data

**Files:**
- Modify: `next.config.ts:57-95` (redirects), `lib/metadata.ts` (siteConfig, keywords), `lib/seo.ts` (SoftwareApplication schemas), `app/sitemap.xml/route.ts:9-30` (staticPaths), `public/llms.txt`
- Modify: `app/[locale]/products/vantumiqp/page.tsx`, `app/[locale]/products/faberpdf/page.tsx` (embed product JSON-LD)

**Interfaces:**
- Consumes: routes from Tasks 5–6.
- Produces: `generateSoftwareApplicationJsonLd(product: "vantumiqp" | "faberpdf")` in `lib/seo.ts`.

- [ ] **Step 1: Replace the redirects block in `next.config.ts`**

```ts
  async redirects() {
    const legacyMap = [
      { from: "/services", to: "/consulting" },
      { from: "/services/it-consulting", to: "/consulting/ai-consulting" },
      { from: "/services/software-development", to: "/consulting/software-development" },
      { from: "/services/product-development", to: "/consulting/digital-modernization" },
      { from: "/products/vantum-erp", to: "/products/vantumiqp" },
    ];
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/service/:slug", destination: "/consulting", permanent: true },
      ...legacyMap.flatMap(({ from, to }) => [
        { source: from, destination: to, permanent: true },
        {
          source: `/:locale(en|sr|de|es|pt|pl)${from}`,
          destination: `/:locale${to}`,
          permanent: true,
        },
      ]),
    ];
  },
```

- [ ] **Step 2: Update `lib/metadata.ts` siteConfig + keywords**

```ts
export const siteConfig = {
  name: "Actaer",
  description:
    "Software product company building VantumIQP and FaberPDF, with AI consulting, software development and digital modernization services.",
  url: "https://actaer.com",
  ogImage: "/opengraph-image",
  links: {
    email: "office@actaer.com",
    phone: "+381 649055722",
    linkedin: "https://linkedin.com/company/actaer",
    twitter: "https://x.com/actaerco",
    vantumiqp: "https://www.vantumiqp.com",
    faberpdf: "https://www.faberpdf.com",
  },
  address: {
    city: "Novi Pazar",
    country: "Serbia",
  },
};
```

In `baseMetadata`: default title → `` `${siteConfig.name} - Software Products & AI Consulting` ``; keywords → `["AI consulting", "business intelligence platform", "Apache Superset", "PDF editor", "local-first software", "software development", "digital modernization", "digital transformation", "VantumIQP", "FaberPDF", "Serbia", "enterprise software"]`. Also update the `metadata.title`/`metadata.description` keys in `messages/en.json` to match.

- [ ] **Step 3: Add product schemas to `lib/seo.ts`**

Read `lib/seo.ts` first to match its export style, then append:

```ts
const productSchemas = {
  vantumiqp: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VantumIQP",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.vantumiqp.com",
    description:
      "Governed business intelligence workspace built on Apache Superset: dashboards, SQL exploration and decision-ready reports.",
    publisher: { "@type": "Organization", name: "Actaer", url: siteConfig.url },
  },
  faberpdf: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FaberPDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows, Linux",
    url: "https://www.faberpdf.com",
    description:
      "Modern local-first desktop PDF editor: sign, annotate, edit and validate PDFs without cloud uploads.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Free during beta" },
    publisher: { "@type": "Organization", name: "Actaer", url: siteConfig.url },
  },
} as const;

export function generateSoftwareApplicationJsonLd(product: keyof typeof productSchemas) {
  return productSchemas[product];
}
```

Also extend the organization schema (in `generateEnhancedOrganizationJsonLd` or `organizationJsonLd`, wherever the org object is built) with:

```ts
  owns: [
    { "@type": "SoftwareApplication", name: "VantumIQP", url: "https://www.vantumiqp.com" },
    { "@type": "SoftwareApplication", name: "FaberPDF", url: "https://www.faberpdf.com" },
  ],
```

Embed the product schema in each product detail page next to the breadcrumb script:

```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSoftwareApplicationJsonLd("vantumiqp")).replace(/</g, "\\u003c"),
        }}
      />
```

- [ ] **Step 4: Update `app/sitemap.xml/route.ts` staticPaths**

```ts
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/vantumiqp", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/faberpdf", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consulting/ai-consulting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consulting/software-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consulting/digital-modernization", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];
```

Also bump `STATIC_LAST_MODIFIED` to `new Date("2026-07-02")`.

- [ ] **Step 5: Rewrite `public/llms.txt`**

Read the existing file for format, keep the structure, and replace the positioning content: Actaer is a software product company building VantumIQP (governed BI workspace on Apache Superset, https://www.vantumiqp.com) and FaberPDF (local-first desktop PDF editor for Windows/Linux, https://www.faberpdf.com), offering AI consulting (flagship), software development and digital modernization services. Update any listed URLs from `/services/*` to `/consulting/*` and `/products/*`.

- [ ] **Step 6: Verify**

Run: `bun run build && bun run lint` — pass. In dev:

```bash
curl -sI http://localhost:3000/en/services | grep -i "location"        # → /en/consulting
curl -sI http://localhost:3000/products/vantum-erp | grep -i "location" # → /products/vantumiqp
curl -s http://localhost:3000/sitemap.xml | grep -c "consulting"        # ≥ 24 (4 paths × 6 locales)
```

View source of `/en/products/vantumiqp` and confirm the SoftwareApplication JSON-LD script is present.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: redirects, product structured data and refreshed SEO metadata"
```

---

### Task 9: Translations for sr, de, es, pt, pl

**Files:**
- Modify: `messages/sr.json`, `messages/de.json`, `messages/es.json`, `messages/pt.json`, `messages/pl.json`

**Interfaces:**
- Consumes: the final `messages/en.json` key set from Tasks 3–8.

- [ ] **Step 1: Diff key sets**

```bash
for f in sr de es pt pl; do
  bun -e "
    const en = require('./messages/en.json'); const other = require('./messages/$f.json');
    const flat = (o, p='') => Object.entries(o).flatMap(([k,v]) => typeof v === 'object' ? flat(v, p+k+'.') : [p+k]);
    const e = new Set(flat(en)), o = new Set(flat(other));
    console.log('$f missing:', [...e].filter(k => !o.has(k)).length, ' stale:', [...o].filter(k => !e.has(k)).length);
  "
done
```

- [ ] **Step 2: Translate**

For each locale file: remove stale keys (namespaces deleted in Tasks 4–6) and translate every missing key from the English source. Rules:
- Product names (VantumIQP, FaberPDF, Actaer, Apache Superset) and the VantumIQP tagline sentence structure stay recognizable; translate the tagline naturally per language.
- Serbian uses latinica (matching the existing sr.json).
- Keep ICU placeholders (`{year}`) intact.
- Match the register of the existing translations in each file (German Sie-form if the existing file uses Sie, etc.).

- [ ] **Step 3: Verify**

Re-run the Step 1 diff — expected `missing: 0, stale: 0` for all 5 locales. Run `bun run build` — pass. In dev, spot-check `/sr`, `/de` homepages render translated copy with no `MISSING_MESSAGE` console errors.

- [ ] **Step 4: Commit**

```bash
git add messages
git commit -m "feat: translate redesigned site copy into sr, de, es, pt, pl"
```

---

### Task 10: Final verification pass

**Files:** none (fixes only if issues found)

- [ ] **Step 1: Full build + lint**

Run: `bun run build && bun run lint` — pass with zero warnings introduced by this work.

- [ ] **Step 2: Visual pass on every route**

With `bun run dev` running, use the preview/browser tooling to screenshot and check at **1280px** and **375px** widths:
`/en`, `/en/products`, `/en/products/vantumiqp`, `/en/products/faberpdf`, `/en/consulting`, `/en/consulting/ai-consulting`, `/en/consulting/software-development`, `/en/consulting/digital-modernization`, `/en/about`, `/en/blog`, one blog article, `/en/contact`, `/en/privacy`, `/en/cookies`, `/sr`, `/de`.

Carbon conformance checklist per page: flat 0px corners; no shadows; display type weight 300; blue only on links/CTAs/banner; footer the only dark surface; mobile nav opens and contains all routes; 48px touch targets on mobile buttons.

- [ ] **Step 3: Grep gates**

```bash
grep -rn "next-themes\|ModeToggle" app components lib        # no output
grep -rn "rounded-\(full\|lg\|md\|xl\)" app components | grep -v node_modules  # review each hit — only intentional 0-radius survivors allowed
grep -rn "/services" app components messages                  # no output
```

- [ ] **Step 4: Commit any fixes and finish**

```bash
git add -A
git commit -m "fix: final Carbon conformance pass"
```

Then use the superpowers:finishing-a-development-branch skill to decide merge/PR.
