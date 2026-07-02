"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { deleteCookie } from "cookies-next";
import { useCookieConsentSafe } from "@/lib/cookie-consent";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "v6etznvrst";

type ClarityWindow = Window & {
  clarity?: (...args: unknown[]) => void;
};

// Clarity sets its cookies on the top-level domain, so deletion has to
// cover the bare path, the current hostname, and the (dot-prefixed) apex.
function deleteClarityCookies() {
  const host = window.location.hostname;
  const apex = host.split(".").slice(-2).join(".");
  const domains = [undefined, host, `.${host}`, `.${apex}`];

  for (const name of ["_clck", "_clsk"]) {
    for (const domain of domains) {
      deleteCookie(name, { path: "/", domain });
    }
  }
}

export function ConditionalAnalytics() {
  const context = useCookieConsentSafe();
  const hasAnalyticsConsent = context?.consent.analytics ?? false;
  const hasConsented = context?.consent.hasConsented ?? false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as ClarityWindow;

    if (hasAnalyticsConsent) {
      if (w.clarity) {
        // Resume if tracking was stopped after an earlier withdrawal
        w.clarity("start");
        return;
      }

      const script = document.createElement("script");
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `;
      document.head.appendChild(script);
    } else if (hasConsented) {
      // Consent withdrawn (or rejected): stop tracking immediately and
      // purge Clarity cookies, including ones left by earlier site versions
      if (w.clarity) {
        w.clarity("stop");
      }
      deleteClarityCookies();
    }
  }, [hasAnalyticsConsent, hasConsented]);

  // Only render Vercel Analytics if analytics consent is given
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <Analytics />;
}
