"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsentSafe } from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Cookie, Settings2 } from "lucide-react";
import { CookiePreferences } from "./CookiePreferences";

export function CookieBanner() {
  const t = useTranslations("cookieConsent");
  const context = useCookieConsentSafe();

  // Don't render anything if context is not available (during SSR)
  if (!context) {
    return null;
  }

  const { consent, acceptAll, rejectAll, openPreferences, isPreferencesOpen } =
    context;

  // Don't show banner if user has already consented
  if (consent.hasConsented && !isPreferencesOpen) {
    return <CookiePreferences />;
  }

  return (
    <>
      <CookiePreferences />

      {/* Banner - only show when not consented */}
      {!consent.hasConsented && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
          <Card className="mx-auto max-w-4xl border shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                {/* Icon and Content */}
                <div className="flex flex-1 gap-4">
                  <div className="hidden shrink-0 md:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Cookie className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-semibold">
                      {t("banner.title")}
                    </h3>
                    <CardDescription className="text-xs leading-relaxed">
                      {t("banner.description")}{" "}
                      <Link
                        href="/cookies"
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        {t("banner.learnMore")}
                      </Link>
                    </CardDescription>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row md:shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openPreferences}
                    className="order-3 sm:order-1"
                  >
                    <Settings2 className="mr-2 h-4 w-4" />
                    {t("banner.customize")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rejectAll}
                    className="order-2"
                  >
                    {t("banner.rejectAll")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="order-1 sm:order-3"
                  >
                    {t("banner.acceptAll")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
