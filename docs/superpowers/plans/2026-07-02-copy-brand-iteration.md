# Copy & Brand Iteration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all site copy with Apple-style storytelling + SEO keyword map, add the Actaer wordmark to the nav, integrate product logos and VantumIQP screenshots, and refresh both blog posts — in all 6 locales.

**Architecture:** Content-first iteration on the merged Carbon redesign. Copy changes flow through `messages/*.json` and MDX; structural changes are limited to the wordmark (Header/MobileNav/Footer), a `media` slot on `PageHero`, logo placements, and one new showcase section on the VantumIQP page.

**Tech Stack:** Next.js 16 App Router, next-intl, next/image, MDX blog.

**Spec:** `docs/superpowers/specs/2026-07-02-copy-brand-iteration-design.md` — its **Voice** rules, **story arc**, and **SEO keyword map** bind every copy decision in this plan.

## Global Constraints

- Package manager **bun**; verification per task = `bun run build` + `bun run lint` (no unit-test suite; the build is the test).
- **Voice (spec §1):** short sentences; benefit-first; second person; sell the outcome; no hype words (revolutionary/game-changing/cutting-edge), no exclamation marks, no all-caps; display headlines ≤ ~8 words.
- **SEO rules (spec §1):** one primary keyword per page (in H1 or first paragraph + pageTitle + pageDescription); pageTitles ≤ 60 chars (before the "| Actaer" template suffix); pageDescriptions 140–160 chars with a benefit and a call to action; no two pages share a primary keyword.
- Carbon rules still govern all visuals: 0px corners, no shadows, no gradients, IBM Blue #0f62fe the only brand accent. Product logos (cyan VantumIQP "V", black/white Faber "F") are third-party product marks — allowed as-is, never recolored.
- All user-facing strings via next-intl; locales en, sr, de, es, pt, pl. Non-en placeholder = English value; full translation lands in Task 7.
- Every `<Image>` has explicit `width`/`height` and descriptive `alt`.
- Commits end with: Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>

---

### Task 1: Move assets + navbar wordmark

**Files:**
- Create: `public/images/products/` (from repo-root scratch folders)
- Delete: `vantumiqp/`, `faber_assets/` (repo root)
- Modify: `components/layout/Header.tsx`, `components/layout/MobileNav.tsx`, `components/layout/Footer.tsx`

**Interfaces:**
- Produces: asset paths used by Tasks 2–3: `/images/products/vantumiqp-logo.png`, `/images/products/faberpdf-logo-black.png`, `/images/products/faberpdf-logo-white.png`, `/images/products/vantumiqp-dashboard.png`, `/images/products/vantumiqp-sql-editor.jpg`, `/images/products/vantumiqp-visualize.jpg`.

- [ ] **Step 1: Move and rename assets**

```bash
mkdir -p public/images/products
cp vantumiqp/vantumiqp_logo.png        public/images/products/vantumiqp-logo.png
cp vantumiqp/dashboard-screenshot.png  public/images/products/vantumiqp-dashboard.png
cp vantumiqp/sql-editor.jpg            public/images/products/vantumiqp-sql-editor.jpg
cp vantumiqp/make-visual.jpg           public/images/products/vantumiqp-visualize.jpg
cp faber_assets/faber_logo_black.png   public/images/products/faberpdf-logo-black.png
cp faber_assets/faber_logo_white.png   public/images/products/faberpdf-logo-white.png
rm -rf vantumiqp faber_assets
```

The decorative avifs (`hero-aurora`, `*-sea`, `gold-horizon`), `dashboard-2/3.jpg`, `vantumiqp_favicon.ico`, and `faber_logo_bg_black.png` are intentionally not copied (spec §4/§5).

- [ ] **Step 2: Wordmark in Header**

In `components/layout/Header.tsx`, replace the logo `<Link>` contents:

```tsx
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-dark.png"
              alt="Actaer logo"
              width={120}
              height={40}
              className="h-7 w-auto"
              priority
            />
            <span className="text-lg font-semibold tracking-[0.16px] text-foreground">
              Actaer
            </span>
          </Link>
```

- [ ] **Step 3: Wordmark in MobileNav and Footer**

`components/layout/MobileNav.tsx`: find the sheet-header logo (if the Sheet shows one) and apply the same pattern (dark logo + `<span className="text-lg font-semibold tracking-[0.16px] text-foreground">Actaer</span>`). If MobileNav has no logo, skip and say so in the report.

`components/layout/Footer.tsx`: the logo `<Link>` becomes:

```tsx
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <Image src="/images/logo-light.png" alt="Actaer logo" width={120} height={40} className="h-7 w-auto" />
              <span className="text-lg font-semibold tracking-[0.16px] text-background">Actaer</span>
            </Link>
```

- [ ] **Step 4: Verify**

Run: `bun run build && bun run lint` — pass. Dev-render `/en`: wordmark appears beside the mark in header and footer; `ls public/images/products` shows the 6 files; repo root has no `vantumiqp/` / `faber_assets/`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: product assets in public/images, Actaer wordmark in nav and footer"
```

---

### Task 2: Product logos in cards, heroes, and nav dropdown

**Files:**
- Modify: `components/carbon/page-hero.tsx`, `components/sections/ProductsShowcase.tsx`, `components/layout/Header.tsx`, `app/[locale]/products/vantumiqp/page.tsx`, `app/[locale]/products/faberpdf/page.tsx`

**Interfaces:**
- Consumes: asset paths from Task 1.
- Produces: `PageHero` gains optional `media?: React.ReactNode` rendered above the eyebrow. `ProductsShowcase` product entries gain `logo: string` + `logoAlt: string`.

- [ ] **Step 1: `media` slot on PageHero**

`components/carbon/page-hero.tsx` — add the prop and render it first:

```tsx
export function PageHero({
  media,
  eyebrow,
  title,
  description,
  children,
}: {
  media?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="max-w-4xl space-y-6">
        {media ? <div className="pb-2">{media}</div> : null}
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

- [ ] **Step 2: Logos on ProductsShowcase cards**

In `components/sections/ProductsShowcase.tsx`, extend the module-level array and card header:

```tsx
import Image from "next/image";

const products = [
  {
    key: "vantumiqp",
    name: "VantumIQP",
    href: "/products/vantumiqp",
    logo: "/images/products/vantumiqp-logo.png",
    logoAlt: "VantumIQP logo",
  },
  {
    key: "faberpdf",
    name: "FaberPDF",
    href: "/products/faberpdf",
    logo: "/images/products/faberpdf-logo-black.png",
    logoAlt: "FaberPDF logo",
  },
] as const;
```

and inside the `<article>`, replace the name heading block with:

```tsx
            <div className="flex items-center gap-3">
              <Image src={product.logo} alt={product.logoAlt} width={32} height={32} className="h-8 w-auto" />
              <h3 className="text-card-title">{product.name}</h3>
            </div>
```

(The `text-eyebrow` category line stays above this block.)

- [ ] **Step 3: Logos in the Header products dropdown**

In `components/layout/Header.tsx`, add `icon` to the products array (`/images/products/vantumiqp-logo.png`, `/images/products/faberpdf-logo-black.png`; the "All products" entry gets no icon) and render in the dropdown item title row:

```tsx
                  <div className="flex items-center gap-2 text-sm font-semibold leading-none">
                    {item.icon ? (
                      <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-auto" />
                    ) : null}
                    {item.title}
                  </div>
```

Type the nav item as `{ title: string; href: string; description: string; icon?: string }` so the consulting dropdown (no icons) reuses the same renderer unchanged.

- [ ] **Step 4: Logos on the two product page heroes**

Both product pages pass `media` to their existing `PageHero`:

`app/[locale]/products/vantumiqp/page.tsx`:
```tsx
        <PageHero
          media={
            <Image src="/images/products/vantumiqp-logo.png" alt="VantumIQP logo" width={48} height={48} className="h-12 w-auto" />
          }
          eyebrow={t("heroEyebrow")}
          ...
```
`faberpdf/page.tsx` mirrors it with `/images/products/faberpdf-logo-black.png` and alt "FaberPDF logo". Add `import Image from "next/image";` to both pages.

- [ ] **Step 5: Verify + commit**

Run: `bun run build && bun run lint` — pass. Dev-render: logos on home cards, /products cards, both product heroes, and the Products dropdown; no layout shift (explicit dims), no new rounded/shadow classes.

```bash
git add -A
git commit -m "feat: product logos on cards, heroes and nav dropdown"
```

---

### Task 3: VantumIQP screenshot showcase

**Files:**
- Modify: `app/[locale]/products/vantumiqp/page.tsx`, `messages/en.json` (+ same keys as English placeholders in sr/de/es/pt/pl)

**Interfaces:**
- Consumes: `Section`, `Eyebrow`; screenshot assets from Task 1.
- Produces: `vantumiqpPage.showcase*` message keys (final values — Task 4's namespace rewrite includes these same values).

- [ ] **Step 1: Add showcase keys to `messages/en.json`** (inside `vantumiqpPage`)

```json
"showcaseEyebrow": "See it working",
"showcaseTitle": "Real dashboards. Real SQL. No mockups.",
"showcaseDashboardAlt": "VantumIQP governed dashboard built on Apache Superset",
"showcaseSqlAlt": "SQL editor in VantumIQP with every chart traceable to its query",
"showcaseVisualAlt": "Chart builder in the VantumIQP business intelligence workspace"
```

Mirror the same 5 keys verbatim into sr/de/es/pt/pl (English placeholders; Task 7 translates).

- [ ] **Step 2: Insert the showcase section**

In `app/[locale]/products/vantumiqp/page.tsx`, between the features `Section` and the audience `Section band="muted"`:

```tsx
        <Section band="muted">
          <div className="mb-12 space-y-4">
            <Eyebrow>{t("showcaseEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("showcaseTitle")}</h2>
          </div>
          <div className="space-y-8">
            <div className="border border-border bg-background p-2">
              <Image
                src="/images/products/vantumiqp-dashboard.png"
                alt={t("showcaseDashboardAlt")}
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="border border-border bg-background p-2">
                <Image
                  src="/images/products/vantumiqp-sql-editor.jpg"
                  alt={t("showcaseSqlAlt")}
                  width={1200}
                  height={750}
                  className="h-auto w-full"
                />
              </div>
              <div className="border border-border bg-background p-2">
                <Image
                  src="/images/products/vantumiqp-visualize.jpg"
                  alt={t("showcaseVisualAlt")}
                  width={1200}
                  height={750}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Section>
```

Check the real intrinsic dimensions first (`sips -g pixelWidth -g pixelHeight public/images/products/vantumiqp-*.{png,jpg}`) and use those width/height values instead of the guesses above if they differ (aspect ratio must be true to the file). The audience band that follows was `band="muted"` — flip it to a plain `<Section>` so the alternation stays canvas → muted → canvas → blue CTA.

- [ ] **Step 3: Verify + commit**

Run: `bun run build && bun run lint` — pass. Dev-render `/en/products/vantumiqp`: showcase renders, images lazy-load (no `priority`), hairline frames, band rhythm alternates.

```bash
git add -A
git commit -m "feat: VantumIQP screenshot showcase section"
```

---

### Task 4: Copy rewrite A — home, products, metadata, navigation, footer (verbatim)

**Files:**
- Modify: `messages/en.json` only (values; key names/counts unchanged except where noted)

**Interfaces:**
- Consumes: key structure as-is; `vantumiqpPage` includes Task 3's showcase keys (values below repeat them — identical).
- Produces: final English copy for Task 7 to translate.

- [ ] **Step 1: `metadata`, `navigation` descriptions, `footer.description`**

```json
"metadata": {
  "title": "Actaer - Software Products & AI Consulting",
  "titleTemplate": "{title} | Actaer",
  "description": "Actaer builds VantumIQP and FaberPDF — and helps companies put AI to work. Software product company from Serbia. See what we can do for you."
}
```

`navigation` — update only the description values (labels stay):

```json
"allProductsDescription": "Everything we build and stand behind.",
"vantumiqpDescription": "Your data has a story. Finally see it.",
"faberpdfDescription": "The PDF editor that never uploads your files.",
"allConsultingDescription": "How we work with client teams.",
"aiConsultingDescription": "AI at work in your business — not in a slide deck.",
"softwareDevelopmentDescription": "Custom software, built like a product.",
"digitalModernizationDescription": "Off the spreadsheets, one confident step at a time."
```

`footer.description`: `"Actaer builds VantumIQP and FaberPDF — and helps companies put AI to work. Novi Pazar, Serbia."`

- [ ] **Step 2: `home` namespace (full replacement of values, same keys)**

```json
"home": {
  "hero": {
    "eyebrow": "Software products and AI consulting",
    "title": "Software that works the way you wish it did.",
    "description": "We build tools that respect your data, your time, and your budget — and we help your company put AI to work. No hype. Just working software.",
    "primaryCta": "See our products",
    "secondaryCta": "Put AI to work"
  },
  "products": {
    "eyebrow": "Our products",
    "title": "Built because we needed them too",
    "vantumiqp": {
      "category": "Business intelligence",
      "tagline": "Your data has a story. Finally see it.",
      "description": "Ask a question, explore the answer in SQL, and publish a dashboard your whole company can trust — one governed workspace, built on Apache Superset.",
      "feature1": "Every chart traceable to its query",
      "feature2": "40+ visualizations, one workspace",
      "feature3": "Access control your auditors will love",
      "cta": "Meet VantumIQP"
    },
    "faberpdf": {
      "category": "Document tools",
      "tagline": "Your documents are your business. Keep them that way.",
      "description": "Sign, edit, and validate PDFs right on your desktop. No uploads. No subscription that reads your contracts. Your files never leave your machine.",
      "feature1": "Sign and annotate in seconds",
      "feature2": "Fix text without leaving the file",
      "feature3": "Free during beta — Windows and Linux",
      "cta": "Meet FaberPDF"
    }
  },
  "consulting": {
    "eyebrow": "Consulting",
    "title": "You don't need more advice. You need it running.",
    "description": "Most consultancies hand you a deck and leave. We build products for a living — so when we consult, you get working systems and a team that knows how to keep them working.",
    "aiTitle": "AI Consulting",
    "aiDescription": "Our flagship. We find where AI actually pays off in your business, build the automation, and train your people to own it.",
    "softwareTitle": "Software Development",
    "softwareDescription": "Custom software delivered like a product: engineered, documented, and supported long after launch.",
    "modernizationTitle": "Digital Modernization",
    "modernizationDescription": "Off the spreadsheets, off the paper — one confident step at a time, with your team learning as we go.",
    "cta": "See how we work"
  },
  "why": {
    "eyebrow": "Why Actaer",
    "title": "We use what we build. Every day.",
    "point1Title": "Skin in the game",
    "point1Description": "Our advice is backed by products we build, sell, and support ourselves.",
    "point2Title": "Senior engineers only",
    "point2Description": "The people who scope your project are the people who build it.",
    "point3Title": "AI without the hype",
    "point3Description": "We deploy AI where it earns its keep — and tell you where it won't.",
    "point4Title": "European base, global reach",
    "point4Description": "Based in Serbia, working across EU time zones, remote-first."
  },
  "blog": {
    "eyebrow": "Insights",
    "title": "What we're learning",
    "cta": "All articles",
    "readMore": "Read article"
  },
  "cta": {
    "title": "Tell us what's slowing you down.",
    "description": "A demo, an AI roadmap, or a second opinion — you'll hear back from an engineer within one business day.",
    "button": "Start the conversation"
  }
}
```

- [ ] **Step 3: `productsPage`, `vantumiqpPage`, `faberpdfPage` (full value replacement)**

```json
"productsPage": {
  "pageTitle": "Software Products — VantumIQP BI & FaberPDF Editor",
  "pageDescription": "Two products, one promise: software that respects your data and your time. Explore VantumIQP business intelligence and the FaberPDF local-first editor.",
  "heroEyebrow": "Our products",
  "heroTitle": "Tools we wanted. So we built them.",
  "heroDescription": "Every Actaer product starts as a problem we couldn't stand anymore. Then we fix it — properly."
},
"vantumiqpPage": {
  "pageTitle": "VantumIQP — Business Intelligence Platform",
  "pageDescription": "Governed dashboards, SQL reporting, and 40+ charts on Apache Superset. VantumIQP turns data questions into answers your company can trust. Book a demo.",
  "heroEyebrow": "VantumIQP · Business intelligence",
  "heroTitle": "Your data has a story. Finally see it.",
  "heroDescription": "You have the data. What you need are answers — governed, traceable, ready to share. VantumIQP is the business intelligence platform that gets you there, built on Apache Superset.",
  "heroCta": "Request a demo",
  "heroSecondaryCta": "Visit vantumiqp.com",
  "featuresEyebrow": "Capabilities",
  "featuresTitle": "From question to answer, without the detours",
  "feature1Title": "40+ chart types",
  "feature1Description": "From bar charts to sankeys — every answer gets the visualization it deserves.",
  "feature2Title": "SQL you can see",
  "feature2Description": "Explore in SQL without switching tools. Every chart stays traceable to its query.",
  "feature3Title": "Governance built in",
  "feature3Description": "Role-aware dashboards with row-level access. The right people see the right data.",
  "feature4Title": "Curated datasets",
  "feature4Description": "Reusable, documented datasets — the whole company answers from one source of truth.",
  "feature5Title": "Analysis or reporting",
  "feature5Description": "Exploration stays exploratory. Reports stay reliable. VantumIQP keeps them apart.",
  "feature6Title": "Superset, refined",
  "feature6Description": "All the power of Apache Superset. None of the rough edges.",
  "showcaseEyebrow": "See it working",
  "showcaseTitle": "Real dashboards. Real SQL. No mockups.",
  "showcaseDashboardAlt": "VantumIQP governed dashboard built on Apache Superset",
  "showcaseSqlAlt": "SQL editor in VantumIQP with every chart traceable to its query",
  "showcaseVisualAlt": "Chart builder in the VantumIQP business intelligence workspace",
  "audienceEyebrow": "Who it's for",
  "audienceTitle": "For teams tired of babysitting their BI tool",
  "audienceDescription": "If stakeholders keep asking what the numbers mean — or where they came from — VantumIQP is for you. Demo access only for now: we start with your use case, not a checkout page.",
  "ctaTitle": "See VantumIQP on your own data",
  "ctaDescription": "Bring one real reporting problem to the demo. Leave with it solved.",
  "ctaButton": "Request a demo"
},
"faberpdfPage": {
  "pageTitle": "FaberPDF — Local-First PDF Editor for Windows & Linux",
  "pageDescription": "Sign, edit, and validate PDFs without uploading them anywhere. FaberPDF is the offline PDF editor that keeps documents on your desktop. Free during beta.",
  "heroEyebrow": "FaberPDF · Document tools",
  "heroTitle": "Your documents are your business.",
  "heroDescription": "Every 'free' online PDF tool has a price: your contracts on someone else's server. FaberPDF signs, edits, and validates PDFs entirely on your desktop. No uploads. Ever.",
  "heroCta": "Download the beta",
  "heroSecondaryCta": "Visit faberpdf.com",
  "featuresEyebrow": "Capabilities",
  "featuresTitle": "Everything you send PDFs to the cloud for. Minus the cloud.",
  "feature1Title": "Sign in seconds",
  "feature1Description": "Contracts and forms, signed on your machine — not on a stranger's server.",
  "feature2Title": "Annotate at desktop speed",
  "feature2Description": "Mark up, comment, highlight. Reviews that keep pace with your thinking.",
  "feature3Title": "Fix the typo",
  "feature3Description": "Edit text directly in the PDF. Small corrections shouldn't need a round-trip.",
  "feature4Title": "Trust the file",
  "feature4Description": "Validate integrity and standards conformance before you hit send.",
  "feature5Title": "Windows and Linux",
  "feature5Description": "Native desktop builds. No browser tab pretending to be an app.",
  "feature6Title": "Free during beta",
  "feature6Description": "Version 0.1.0 is free to try — and your feedback shapes what ships next.",
  "privacyEyebrow": "Why local-first",
  "privacyTitle": "The safest upload is the one that never happens",
  "privacyDescription": "Invoices, contracts, medical records — the PDFs you handle are exactly the files that should never touch a third-party server. FaberPDF does the work where your files already live: on your desktop.",
  "ctaTitle": "Try FaberPDF today",
  "ctaDescription": "Free during beta, for Windows and Linux. Your documents will thank you.",
  "ctaButton": "Download the beta"
}
```

- [ ] **Step 4: Verify + commit**

Run: `bun run build && bun run lint` — pass (non-en locales untouched this task; keys unchanged, so no missing-message risk). Dev-render `/en` and both product pages; check no headline overflows its container at 375px.

```bash
git add messages/en.json
git commit -m "feat: storytelling copy for home and product surfaces (en)"
```

---

### Task 5: Copy rewrite B — consulting, about, contact, blog chrome + JSON-LD/llms.txt sync

**Files:**
- Modify: `messages/en.json`, `lib/seo.ts`, `public/llms.txt`

**Interfaces:**
- Consumes: existing key structures (aboutPage/contact listed below — preserve every key name).
- Produces: final English copy for Task 7.

- [ ] **Step 1: Consulting namespaces (full value replacement)**

```json
"consultingPage": {
  "pageTitle": "Consulting — AI, Software & Modernization",
  "pageDescription": "Consulting from a company that ships its own software: AI strategy, working systems, and teams trained to own them. Talk to an engineer today.",
  "heroEyebrow": "Consulting",
  "heroTitle": "You don't need more advice. You need it running.",
  "heroDescription": "Decks don't ship. We're a product company — when we consult, you get working systems, honest trade-offs, and a team that stays until yours can take over.",
  "heroCta": "Talk to an engineer",
  "flagshipLabel": "Flagship service"
},
"aiConsultingPage": {
  "pageTitle": "AI Consulting — Strategy, Adoption & Automation",
  "pageDescription": "Find where AI pays off in your business. AI strategy, adoption, and automation from engineers who deploy it daily. Book a session — leave with next steps.",
  "heroEyebrow": "Consulting · Flagship",
  "heroTitle": "AI that earns its keep",
  "heroDescription": "Everyone's selling AI strategy. We build the part that actually runs — automation, agents, and integrations deployed in your business, with your team trained to own them.",
  "heroCta": "Start the conversation",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "From 'we should use AI' to AI in production",
  "offering1Title": "Strategy & roadmap",
  "offering1Description": "Where AI creates value in your business, what to build versus buy, and a sequenced plan your board can approve.",
  "offering2Title": "Adoption & integration",
  "offering2Description": "Model and vendor selection, integration with the systems you already run, and evaluation that outlasts the demo.",
  "offering3Title": "Automation & agents",
  "offering3Description": "Agentic workflows for documents, reporting, and operations — deployed with guardrails, not press releases.",
  "offering4Title": "Enablement & training",
  "offering4Description": "Workshops that leave your engineers and operators able to run, extend, and trust what we built together.",
  "whyEyebrow": "Why us",
  "whyTitle": "We deploy AI in our own products first",
  "whyDescription": "VantumIQP and FaberPDF keep us honest. We live with data governance, deployment, and support every single day — so the advice you get has already survived contact with production.",
  "ctaTitle": "Make AI concrete",
  "ctaDescription": "Book a working session. Leave with next steps, not a pitch.",
  "ctaButton": "Contact us"
},
"softwareDevelopmentPage": {
  "pageTitle": "Custom Software Development — Built Like a Product",
  "pageDescription": "Custom software development by a product company: full-stack engineering, enterprise integrations, and support that doesn't end at launch. Scope it with us.",
  "heroEyebrow": "Consulting · Software development",
  "heroTitle": "Software built like we'd have to live with it",
  "heroDescription": "Because we do. The team behind VantumIQP and FaberPDF builds your system the same way: engineered, documented, and supported long after launch.",
  "heroCta": "Discuss your project",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "End to end, no hand-offs",
  "offering1Title": "Full-stack engineering",
  "offering1Description": "Web and desktop applications in modern stacks — TypeScript, React, .NET, and the cloud you already use.",
  "offering2Title": "Enterprise integrations",
  "offering2Description": "We connect the systems you have — ERP, BI, documents — instead of selling you replacements.",
  "offering3Title": "Real-time platforms",
  "offering3Description": "Dashboards, pipelines, and operational tools that keep up with your business.",
  "offering4Title": "Long-term support",
  "offering4Description": "Monitoring, maintenance, iteration. We don't ship and vanish.",
  "ctaTitle": "Have a system in mind?",
  "ctaDescription": "Tell us what you need. We'll scope it together — honestly.",
  "ctaButton": "Contact us"
},
"digitalModernizationPage": {
  "pageTitle": "Digital Modernization — Without the Big-Bang Rewrite",
  "pageDescription": "Legacy modernization and digital transformation that sticks: process digitization, tool adoption, and coaching until your team owns it. Start with an assessment.",
  "heroEyebrow": "Consulting · Digital modernization",
  "heroTitle": "Modernize without betting the company",
  "heroDescription": "Big-bang rewrites fail. We move you off paper, spreadsheets, and legacy systems step by step — with your team learning at every one.",
  "heroCta": "Plan your first step",
  "offeringsEyebrow": "What we do",
  "offeringsTitle": "Change your team actually keeps",
  "offering1Title": "Legacy assessment",
  "offering1Description": "An honest map of what you run, what it costs you, and what to change first.",
  "offering2Title": "Process digitization",
  "offering2Description": "Manual workflows become digital ones your staff actually want to use.",
  "offering3Title": "Technology adoption",
  "offering3Description": "The right tools — BI, documents, automation — rolled out without shelfware.",
  "offering4Title": "Coaching & handover",
  "offering4Description": "We work beside your people, so the capability stays when we leave.",
  "ctaTitle": "Start where you are",
  "ctaDescription": "One day of assessment usually reveals the first three moves.",
  "ctaButton": "Contact us"
}
```

- [ ] **Step 2: `aboutPage` (values only; every key name preserved)**

Binding values for the story spine; remaining keys (values.*, whatWeDo.*, cta.*) are rewritten by you IN THE SAME VOICE, benefit-first, referencing products where natural — keep whatWeDo card titles aligned with their destinations (AI Consulting / Software Development / Digital Modernization):

```json
"pageTitle": "About Actaer — Software Company from Novi Pazar, Serbia",
"pageDescription": "Actaer builds VantumIQP and FaberPDF and helps companies put AI to work. Meet the software company from Novi Pazar, Serbia. Founded 2025.",
"badge": "About us",
"heroTitle": "We got tired of software that fights you",
"heroDescription": "So we started building our own. Actaer is a software product company from Novi Pazar, Serbia — and the engineering team behind VantumIQP and FaberPDF.",
"story.title": "Our story",
"story.paragraph1": "Every tool we used seemed to work against us. BI platforms that needed a babysitter. PDF editors that wanted our contracts in their cloud. Consultants who left decks instead of systems.",
"story.paragraph2": "So we built Actaer to do it differently: build products we'd want to use, and consult the way we'd want to be consulted — with working software, not promises.",
"story.paragraph3": "Today that means VantumIQP, our governed business intelligence workspace, and FaberPDF, our local-first PDF editor — plus a consulting practice that puts AI to work in real companies.",
"story.paragraph4": "We're small, senior, and deliberate. That's not a limitation. It's the product.",
"story.tagline": "Software you can trust. People you can call.",
"mission.quote": "We build software we stand behind — and help others do the same.",
"founded": "Founded in 2025."
```

(`pageTitle` is 56 chars — within limit.)

- [ ] **Step 3: `contact` and `blog` chrome (values only; form/field/error keys untouched)**

```json
"contact.pageTitle": "Contact — Talk to an Engineer",
"contact.pageDescription": "Questions about VantumIQP, FaberPDF, or AI consulting? You'll hear back from an engineer within one business day. No sales gauntlet — just answers.",
"contact.badge": "Contact",
"contact.title": "Tell us what's slowing you down",
"contact.subtitle": "A demo, a roadmap, or a second opinion — the person reading this is an engineer, and you'll hear back within one business day.",
"blog.pageTitle": "Blog — Software Products, AI & Engineering Insights",
"blog.title": "What we're learning",
"blog.pageDescription": "Notes from building VantumIQP and FaberPDF — and from putting AI to work in real companies. Practical, tested, hype-free. Read the latest."
```

Rewrite `contact.getInTouch`/`getInTouchDescription`/`reachUs`/`formTitle`/`formDescription` in the same voice (short, second-person). If `blog` has a `description`/hero key rendered on the page, align it with `pageDescription`'s message.

- [ ] **Step 4: Sync `lib/seo.ts` + `public/llms.txt`**

- `lib/seo.ts`: organization `description` and `slogan` → `"We build software we stand behind — and help others do the same."` for slogan; AboutPage/BlogList JSON-LD descriptions updated to match the new aboutPage/blog copy (same sentences, trimmed to one line).
- `public/llms.txt`: hero one-liners per product updated to the new taglines ("Your data has a story. Finally see it." / "Your documents are your business."); FAQ answers re-checked against new copy.

- [ ] **Step 5: Verify + commit**

Run: `bun run build && bun run lint` — pass. Spot-check titles ≤ 60 chars: `python3 -c "import json;d=json.load(open('messages/en.json'));print({k:len(v['pageTitle']) for k,v in d.items() if isinstance(v,dict) and 'pageTitle' in v})"` — all values ≤ 60.

```bash
git add messages/en.json lib/seo.ts public/llms.txt
git commit -m "feat: storytelling copy for consulting, about, contact and blog chrome (en)"
```

---

### Task 6: Blog refresh (en) + SVG covers

**Files:**
- Modify: `content/blog/en/welcome-to-actaer.mdx`, `content/blog/en/ai-agents-enterprise-software.mdx`
- Create: `public/images/covers/welcome-to-actaer.svg`, `public/images/covers/ai-agents.svg`
- Delete: `public/images/ChatGPT-Image-*.avif` (3 files, after confirming no other refs)

**Interfaces:**
- Produces: final English MDX for Task 7 to translate; cover paths used by all locales' MDX.

- [ ] **Step 1: Rewrite `welcome-to-actaer.mdx` (en)**

Keep the existing `export const metadata`/`schemas` structure. New metadata:
- title: "Why We Started Actaer" — description: "We got tired of software that fights you — BI that needs babysitting, PDF tools that want your contracts in their cloud. So we built our own. Here's the story." — date unchanged, lastUpdated: "2026-07-02", tags: ["Actaer", "Products", "Company"], image: "/images/covers/welcome-to-actaer.svg".

Body (write in the spec voice, ~600–800 words) MUST follow this outline:
1. H2 "The problem we couldn't unsee" — the founding frustration (tools working against users; consultants leaving decks)
2. H2 "So we built our own" — VantumIQP (link `/products/vantumiqp`) and FaberPDF (link `/products/faberpdf`), one paragraph each: problem → product → who it's for
3. H2 "And we consult — differently" — AI Consulting flagship (link `/consulting/ai-consulting`), products-keep-us-honest argument
4. H2 "What you can expect from us" — small/senior/deliberate; close with an invitation to `/contact`

FAQ schema rewritten to 3 questions: "What does Actaer build?" / "Does Actaer still offer consulting?" / "Where is Actaer based?" — answers consistent with the new copy (products first, AI consulting flagship, Novi Pazar Serbia, founded 2025).

- [ ] **Step 2: Refresh `ai-agents-enterprise-software.mdx` (en)**

Content edits (not a rewrite): fix any claims that aged badly, tighten intro to the spec voice, add ONE new closing H2 "Putting agents to work in your company" with 2–3 sentences linking to `/consulting/ai-consulting`. Metadata: lastUpdated: "2026-07-02", image: "/images/covers/ai-agents.svg". Keep the FAQ schema, verify its answers still match the body.

- [ ] **Step 3: Create the two SVG covers**

`public/images/covers/welcome-to-actaer.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="12" fill="#0f62fe"/>
  <g fill="#161616">
    <polygon points="180,420 300,210 420,420"/>
    <polygon points="420,420 540,210 660,420"/>
  </g>
  <polygon points="660,420 780,210 900,420" fill="#0f62fe"/>
  <rect x="180" y="470" width="240" height="8" fill="#e0e0e0"/>
</svg>
```

`public/images/covers/ai-agents.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="12" fill="#0f62fe"/>
  <g fill="none" stroke="#161616" stroke-width="4">
    <circle cx="380" cy="315" r="90"/>
    <circle cx="700" cy="200" r="56"/>
    <circle cx="740" cy="440" r="56"/>
    <line x1="465" y1="280" x2="648" y2="215"/>
    <line x1="460" y1="355" x2="688" y2="425"/>
  </g>
  <circle cx="380" cy="315" r="34" fill="#0f62fe"/>
  <rect x="180" y="540" width="240" height="8" fill="#e0e0e0"/>
</svg>
```

- [ ] **Step 4: Retire old covers**

```bash
grep -rn "ChatGPT-Image" content app components messages public --include="*" | grep -v node_modules
```
Every hit must be updated to the new cover paths (the non-en MDX files will still reference the old images — update their `image:` metadata fields to the new SVG paths now, content translation happens in Task 7). Then:
```bash
rm public/images/ChatGPT-Image-*.avif
```
Re-run the grep — zero hits.

- [ ] **Step 5: Verify + commit**

Run: `bun run build && bun run lint` — pass. Dev-render `/en/blog` (new covers render, no broken images) and both articles.

```bash
git add -A
git commit -m "feat: product-first blog refresh with Carbon SVG covers (en)"
```

---

### Task 7: Translations — sr, de, es, pt, pl (messages + blog MDX)

**Files:**
- Modify: `messages/sr.json`, `messages/de.json`, `messages/es.json`, `messages/pt.json`, `messages/pl.json`
- Modify: `content/blog/{sr,de,es,pt,pl}/welcome-to-actaer.mdx` and `.../ai-agents-enterprise-software.mdx`

**Interfaces:**
- Consumes: final English copy from Tasks 3–6.

- [ ] **Step 1: Messages**

Every value changed in Tasks 3–5 must be retranslated (diff `messages/en.json` against git ref before Task 3 — `git diff <task2-head> -- messages/en.json` — to enumerate changed keys). Rules (same as the previous translation pass): product names + Apache Superset untouched; taglines localized naturally keeping the story beat; registers per file (de Sie, es tú, pt European, pl Ty, sr vi/latinica); ICU placeholders intact; no English placeholder left (byte-identical check, excluding legit identicals).

- [ ] **Step 2: Blog MDX**

For each of the 5 locales: rewrite `welcome-to-actaer.mdx` from the new English version (translate faithfully, same outline, same internal links, localized metadata title/description, image path = SVG cover); apply the same refresh edits to `ai-agents-enterprise-software.mdx` (updated intro, new closing section with `/consulting/ai-consulting` link, lastUpdated, cover path). FAQ schemas translated per locale.

- [ ] **Step 3: Verify + commit**

Key-diff script (from the previous plan, Task 9 Step 1): `missing: 0, stale: 0` all locales. Byte-identical audit returns only legit identicals. `bun run build && bun run lint` — pass. Dev spot-check `/sr`, `/de` home + one product page + one blog article.

```bash
git add messages content
git commit -m "feat: translate storytelling copy and refreshed blog posts into sr, de, es, pt, pl"
```

---

### Task 8: Final verification

**Files:** none (fixes only if issues found)

- [ ] **Step 1: Gates**

```bash
bun run build && bun run lint
grep -rn "ChatGPT-Image" . --include="*.mdx" --include="*.json" --include="*.tsx" | grep -v node_modules   # zero
ls vantumiqp faber_assets 2>&1   # both "No such file or directory"
python3 -c "import json;d=json.load(open('messages/en.json'));bad={k:len(v['pageTitle']) for k,v in d.items() if isinstance(v,dict) and 'pageTitle' in v and len(v['pageTitle'])>60};print(bad or 'titles OK')"
```

- [ ] **Step 2: Visual + voice pass**

At 1280px and 375px: `/en`, `/en/products`, both product pages (showcase section!), `/en/consulting` + 3 subpages, `/en/about`, `/en/contact`, `/en/blog` + both articles, `/sr`, `/de` home. Checks: wordmark in header/footer; logos on cards/heroes/dropdown; no layout shift on images; headlines don't wrap awkwardly at 375px; no exclamation marks or hype words in rendered copy (`grep -rniE "revolutionary|game.chang|cutting.edge" messages content` → zero; `grep -rn '!"' messages/en.json` → review each hit).

- [ ] **Step 3: Commit fixes (if any) and finish**

```bash
git add -A
git commit -m "fix: copy iteration conformance pass"
```

Then superpowers:finishing-a-development-branch.
