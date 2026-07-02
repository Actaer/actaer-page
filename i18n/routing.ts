import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Never auto-redirect "/" by Accept-Language/cookie — crawlers must always
  // get real content at the root; users switch language via the picker.
  localeDetection: false,
});
