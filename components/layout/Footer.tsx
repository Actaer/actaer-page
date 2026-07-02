"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";
import { useCookieConsentSafe } from "@/lib/cookie-consent";

export function Footer() {
  const t = useTranslations();
  const cookieContext = useCookieConsentSafe();
  const openPreferences = cookieContext?.openPreferences ?? (() => {});

  const columns = [
    {
      heading: t("footer.products"),
      links: [
        { label: "VantumIQP", href: "/products/vantumiqp" },
        { label: "FaberPDF", href: "/products/faberpdf" },
        { label: t("navigation.allProducts"), href: "/products" },
      ],
    },
    {
      heading: t("footer.consulting"),
      links: [
        { label: t("navigation.aiConsulting"), href: "/consulting/ai-consulting" },
        { label: t("navigation.softwareDevelopment"), href: "/consulting/software-development" },
        { label: t("navigation.digitalModernization"), href: "/consulting/digital-modernization" },
      ],
    },
    {
      heading: t("footer.company"),
      links: [
        { label: t("navigation.about"), href: "/about" },
        { label: t("navigation.blog"), href: "/blog" },
        { label: t("navigation.contact"), href: "/contact" },
      ],
    },
    {
      heading: t("footer.legal"),
      links: [
        { label: t("footer.privacyPolicy"), href: "/privacy" },
        { label: t("footer.cookiePolicy"), href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-(--inverse-ink-muted)">
      <div className="mx-auto max-w-[1584px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/logo-light.png" alt="Actaer" width={120} height={40} className="h-7 w-auto" />
            </Link>
            <p className="mb-6 max-w-xs text-sm">{t("footer.description")}</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${siteConfig.links.email}`} className="block hover:text-background">
                {siteConfig.links.email}
              </a>
              <a href={`tel:${siteConfig.links.phone}`} className="block hover:text-background">
                {siteConfig.links.phone}
              </a>
              <p>
                {siteConfig.address.city}, {siteConfig.address.country}
              </p>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-sm font-semibold text-background">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === t("footer.legal") ? (
                  <li>
                    <button onClick={openPreferences} className="-my-3.5 py-3.5 text-sm transition-colors hover:text-background">
                      {t("footer.cookieSettings")}
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-(--inverse-surface-1) pt-8 md:flex-row md:items-center">
          <p className="text-sm">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex items-center gap-6 text-sm">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-background">
              LinkedIn
            </a>
            <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-background">
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
