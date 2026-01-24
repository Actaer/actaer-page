"use client";

import { useState, useEffect, startTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  useCookieConsentSafe,
  type ConsentPreferences,
} from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Shield, BarChart3, Megaphone, Settings } from "lucide-react";

interface CategoryConfig {
  key: keyof ConsentPreferences;
  icon: React.ReactNode;
  disabled?: boolean;
}

const categories: CategoryConfig[] = [
  { key: "essential", icon: <Shield className="h-4 w-4" />, disabled: true },
  { key: "functional", icon: <Settings className="h-4 w-4" /> },
  { key: "analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { key: "marketing", icon: <Megaphone className="h-4 w-4" /> },
];

export function CookiePreferences() {
  const t = useTranslations("cookieConsent");
  const context = useCookieConsentSafe();

  // Local state for preferences (before saving)
  const [localPreferences, setLocalPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Get values from context with safe defaults
  const consent = context?.consent ?? {
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    hasConsented: false,
    consentVersion: 0,
  };
  const isPreferencesOpen = context?.isPreferencesOpen ?? false;
  const closePreferences = context?.closePreferences ?? (() => {});
  const updatePreferences = context?.updatePreferences ?? (() => {});
  const acceptAll = context?.acceptAll ?? (() => {});
  const rejectAll = context?.rejectAll ?? (() => {});

  // Sync local state when consent changes or sheet opens
  useEffect(() => {
    if (isPreferencesOpen) {
      startTransition(() => {
        setLocalPreferences({
          essential: true,
          functional: consent.functional,
          analytics: consent.analytics,
          marketing: consent.marketing,
        });
      });
    }
  }, [
    isPreferencesOpen,
    consent.functional,
    consent.analytics,
    consent.marketing,
  ]);

  const handleToggle = (key: keyof ConsentPreferences, checked: boolean) => {
    if (key === "essential") return; // Essential is always on
    setLocalPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
  };

  return (
    <Sheet
      open={isPreferencesOpen}
      onOpenChange={(open) => !open && closePreferences()}
    >
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("preferences.title")}</SheetTitle>
          <SheetDescription>
            {t("preferences.description")}{" "}
            <Link
              href="/privacy"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {t("preferences.privacyPolicy")}
            </Link>
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4 space-y-4">
          {categories.map((category, index) => (
            <div key={category.key}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    {category.icon}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor={`cookie-${category.key}`}
                      className="text-sm font-medium"
                    >
                      {t(`categories.${category.key}.title`)}
                      {category.disabled && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({t("preferences.required")})
                        </span>
                      )}
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(`categories.${category.key}.description`)}
                    </p>
                  </div>
                </div>
                <Switch
                  id={`cookie-${category.key}`}
                  checked={localPreferences[category.key]}
                  onCheckedChange={(checked) =>
                    handleToggle(category.key, checked)
                  }
                  disabled={category.disabled}
                  aria-label={t(`categories.${category.key}.title`)}
                />
              </div>
              {index < categories.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>

        <SheetFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={rejectAll}
            className="w-full sm:w-auto"
          >
            {t("banner.rejectAll")}
          </Button>
          <Button
            variant="outline"
            onClick={acceptAll}
            className="w-full sm:w-auto"
          >
            {t("banner.acceptAll")}
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            {t("preferences.save")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
