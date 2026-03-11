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
    if (hasMarketingConsent && apolloId && typeof window !== "undefined") {
      // Check if Apollo tracker is already loaded
      if ((window as unknown as { at?: unknown }).at) return;

      // Sanitize the tracking ID to prevent injection
      const sanitizedId = apolloId.replace(/[^a-zA-Z0-9_-]/g, "");
      if (!sanitizedId) return;

      const script = document.createElement("script");
      script.innerHTML = `
        !function(t,e,n,s,a,c,i,o,p){
          t.AppolloCB=a,t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)},
          t[a].l=1*new Date,i=e.createElement(n),o=e.getElementsByTagName(n)[0],
          i.async=1,i.src=s,o.parentNode.insertBefore(i,o)
        }(window,document,"script","https://assets.apollo.io/micro/website-tracker/tracker.iife.js","at");
        at("init", "${sanitizedId}");
        at("track", "page_view");
      `;
      document.head.appendChild(script);
    }
  }, [hasMarketingConsent]);

  // Only render Vercel Analytics if analytics consent is given
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <Analytics />;
}
