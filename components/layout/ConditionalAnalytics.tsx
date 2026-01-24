"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { useCookieConsentSafe } from "@/lib/cookie-consent";

export function ConditionalAnalytics() {
  const context = useCookieConsentSafe();
  const hasAnalyticsConsent = context?.consent.analytics ?? false;
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

  // Only render Vercel Analytics if analytics consent is given
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <Analytics />;
}
