import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { baseMetadata, viewport as baseViewport } from "@/lib/metadata";
import {
  generateEnhancedOrganizationJsonLd,
  generateWebsiteWithSearchJsonLd,
} from "@/lib/seo";
import { locales } from "@/i18n/config";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { ConditionalAnalytics } from "@/components/layout";
import { getLocale } from "next-intl/server";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

// Enhanced JSON-LD for AI discoverability
const organizationJsonLd = generateEnhancedOrganizationJsonLd();
const websiteJsonLd = generateWebsiteWithSearchJsonLd();

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external links */}
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Structured Data - Enhanced for AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${plexSans.variable} font-sans antialiased`}>
        <CookieConsentProvider>
          {children}
          <ConditionalAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
