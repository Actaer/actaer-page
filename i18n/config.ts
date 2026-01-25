export const locales = ["en", "sr", "de", "es", "pt", "pl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sr: "Srpski",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
  pl: "Polski",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  sr: "🇷🇸",
  de: "🇩🇪",
  es: "🇪🇸",
  pt: "🇵🇹",
  pl: "🇵🇱",
};
