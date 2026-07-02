# Cookie consent: Clarity GDPR withdrawal fix + configurable ID

**Date:** 2026-07-03
**Status:** Approved

## Context

The site already has a complete cookie consent system: a four-category provider
(`lib/cookie-consent.tsx` — essential, functional, analytics, marketing), a banner
(`components/layout/CookieBanner.tsx`), a preferences sheet
(`components/layout/CookiePreferences.tsx`), a footer "Cookie Settings" entry point,
translations in all six locales, and consent-gated loading of Vercel Analytics and
Microsoft Clarity (`components/layout/ConditionalAnalytics.tsx`).

Live verification (2026-07-03) confirmed everything works except one gap: when a user
withdraws analytics consent after previously granting it, Clarity keeps recording until
the next page load, and its first-party cookies (`_clck`, `_clsk`) are never deleted.
Additionally, the Clarity project ID (`v6etznvrst`) is hardcoded.

## Changes

### 1. Stop Clarity and purge its cookies on consent withdrawal

In `ConditionalAnalytics.tsx`, extend the existing effect that watches analytics consent:

- When consent is granted and Clarity is already loaded, call `window.clarity("start")`
  (resumes tracking if it was previously stopped; harmless otherwise).
- When the user has responded to the banner (`hasConsented`) and analytics consent is
  absent: call `window.clarity("stop")` if Clarity is loaded, and delete the `_clck` and
  `_clsk` cookies. Deletion covers the bare path, the current hostname, the dot-prefixed
  hostname, and the dot-prefixed apex domain, because Clarity sets them on the top-level
  domain.
- Deleting cookies whenever consent is explicitly rejected (not only when Clarity is
  loaded in the current page) also cleans up leftover Clarity cookies from earlier site
  versions that loaded Clarity unconditionally.

Vercel Analytics needs no cleanup: the component unmounts without consent and it sets no
cookies.

### 2. Clarity ID from environment

- Read `NEXT_PUBLIC_CLARITY_ID`, falling back to the current production ID so nothing
  breaks before the Vercel env var is configured.
- Add `.env.example` documenting the variable.

## Out of scope

Banner UI, categories, translations, the cookies/privacy pages, and the consent provider
itself — all verified working.

## Verification

- `npm run build` passes.
- Live browser check: accept → Clarity + Vercel load; withdraw via Reject All →
  `_clck`/`_clsk` deleted and recording stopped; re-accept → tracking resumes.
