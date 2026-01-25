import { type Locale, defaultLocale } from "@/i18n/config";

export function formatDate(
  dateString: string,
  locale: Locale = defaultLocale,
): string {
  const date = new Date(dateString);
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    sr: "sr-Latn-RS",
    de: "de-DE",
    es: "es-ES",
    pt: "pt-PT",
    pl: "pl-PL",
  };

  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
