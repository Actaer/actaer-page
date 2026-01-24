"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";
import { useCookieConsentSafe } from "@/lib/cookie-consent";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Twitter, Cookie } from "lucide-react";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations();
  const cookieContext = useCookieConsentSafe();
  const openPreferences = cookieContext?.openPreferences ?? (() => {});

  const footerLinks = {
    services: [
      { label: t("navigation.itConsulting"), href: "/services/it-consulting" },
      {
        label: t("navigation.softwareDevelopment"),
        href: "/services/software-development",
      },
      {
        label: t("navigation.productDevelopment"),
        href: "/services/product-development",
      },
    ],
    products: [
      { label: t("navigation.vantumErp"), href: "/products/vantum-erp" },
    ],
    company: [
      { label: t("navigation.about"), href: "/about" },
      { label: t("navigation.blog"), href: "/blog" },
      { label: t("navigation.contact"), href: "/contact" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/images/logo-light.png"
                    : "/images/logo-dark.png"
                }
                alt="Actaer"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              {t("footer.description")}
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.links.email}
              </a>
              <a
                href={`tel:${siteConfig.links.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.links.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {siteConfig.address.city}, {siteConfig.address.country}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold mb-4">{t("footer.services")}</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="font-semibold mb-4">{t("footer.products")}</p>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold mb-4">{t("footer.company")}</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal Links */}
            <p className="font-semibold mb-4 mt-6">{t("footer.legal")}</p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.cookiePolicy")}
                </Link>
              </li>
              <li>
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={openPreferences}
                >
                  <Cookie className="mr-1.5 h-3.5 w-3.5" />
                  {t("footer.cookieSettings")}
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
