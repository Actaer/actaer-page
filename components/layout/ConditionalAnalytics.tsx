"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { useCookieConsentSafe } from "@/lib/cookie-consent";

export function ConditionalAnalytics() {
  const context = useCookieConsentSafe();
  const hasAnalyticsConsent = context?.consent.analytics ?? false;
  const hasMarketingConsent = context?.consent.marketing ?? false;

  useEffect(() => {
    if (hasAnalyticsConsent && typeof window !== "undefined") {
      // Check if Clarity is already loaded
      if ((window as unknown as { clarity?: unknown }).clarity) return;

      const script = document.createElement("script");
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "v6etznvrst");
      `;
      document.head.appendChild(script);
    }
  }, [hasAnalyticsConsent]);

  // Apollo.io website visitor tracking for lead generation
  useEffect(() => {
    const apolloId = process.env.NEXT_PUBLIC_APOLLO_TRACKING_ID;
    let inlineScript: HTMLScriptElement | null = null;

    if (typeof window !== "undefined" && hasMarketingConsent && apolloId) {
      const w = window as unknown as { at?: unknown };
      // Sanitize the tracking ID to prevent injection
      const sanitizedId = apolloId.replace(/[^a-zA-Z0-9_-]/g, "");
      if (sanitizedId && !w.at) {
        inlineScript = document.createElement("script");
        inlineScript.innerHTML = `
          !function(t,e,n,s,a,c,i,o,p){
            t.ApolloCB=a,t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)},
            t[a].l=1*new Date,i=e.createElement(n),o=e.getElementsByTagName(n)[0],
            i.async=1,i.src=s,o.parentNode.insertBefore(i,o)
          }(window,document,"script","https://assets.apollo.io/micro/website-tracker/tracker.iife.js","at");
          at("init", "${sanitizedId}");
          at("track", "page_view");
        `;
        document.head.appendChild(inlineScript);
      }
    }

    return () => {
      if (typeof window === "undefined") return;

      // Attempt to disable Apollo tracking if available
      const win = window as unknown as { at?: unknown };
      const atFn =
        typeof win.at === "function"
          ? (win.at as (cmd: string, ...args: unknown[]) => void)
          : null;
      if (atFn) {
        try {
          atFn("disable");
        } catch {
          // Ignore errors from Apollo disable call
        }
      }

      // Remove the inline loader script we added, if any
      if (inlineScript && inlineScript.parentNode) {
        inlineScript.parentNode.removeChild(inlineScript);
      }

      // Remove the external Apollo tracker script if it exists
      const trackerScript = document.head.querySelector<HTMLScriptElement>(
        'script[src*="assets.apollo.io/micro/website-tracker/tracker.iife.js"]',
      );
      if (trackerScript && trackerScript.parentNode) {
        trackerScript.parentNode.removeChild(trackerScript);
      }

      // Remove the global Apollo tracker reference so it can be re-initialized cleanly
      delete (win as { at?: unknown }).at;
    };
  }, [hasMarketingConsent]);

  // Only render Vercel Analytics if analytics consent is given
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <Analytics />;
}
