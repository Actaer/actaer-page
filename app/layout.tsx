import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { baseMetadata, viewport as baseViewport } from "@/lib/metadata";
import {
  generateEnhancedOrganizationJsonLd,
  generateWebsiteWithSearchJsonLd,
} from "@/lib/seo";
import { locales } from "@/i18n/config";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { ConditionalAnalytics } from "@/components/layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

// Enhanced JSON-LD for AI discoverability
const organizationJsonLd = generateEnhancedOrganizationJsonLd();
const websiteJsonLd = generateWebsiteWithSearchJsonLd();

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
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

        {/* AI/LLM discovery files */}
        <link rel="author" href="/llms.txt" />

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
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            {children}
            <ConditionalAnalytics />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
