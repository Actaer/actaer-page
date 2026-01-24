export const locales = ["en", "sr", "de", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sr: "Srpski",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  sr: "🇷🇸",
  de: "🇩🇪",
  es: "🇪🇸",
  pt: "🇵🇹",
};
