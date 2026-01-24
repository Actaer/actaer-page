import type { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "Actaer",
  description:
    "Full-service tech consulting firm transforming businesses into agile, software-powered innovators. IT consulting, custom software development, and enterprise solutions.",
  url: "https://actaer.com",
  ogImage: "/opengraph-image",
  links: {
    email: "office@actaer.com",
    phone: "+381 649055722",
    linkedin: "https://linkedin.com/company/actaer",
    twitter: "https://x.com/actaerco",
  },
  address: {
    city: "Novi Pazar",
    country: "Serbia",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Software Development & IT Consulting`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development",
    "IT consulting",
    "custom software",
    "enterprise solutions",
    "ERP",
    "Vantum ERP",
    "digital transformation",
    "AI solutions",
    "product development",
    "Serbia",
    "tech consulting",
    "software engineering",
    "web development",
    "mobile app development",
    "cloud solutions",
  ],
  authors: [{ name: "Actaer", url: siteConfig.url }],
  creator: "Actaer",
  publisher: "Actaer",
  category: "Technology",
  classification: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@actaer",
    site: "@actaer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} & Partial<Metadata> = {}): Metadata {
  return {
    title: title,
    description: description || siteConfig.description,
    alternates: {
      canonical: canonical,
      ...props.alternates,
    },
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: image ? [{ url: image }] : undefined,
      url: canonical,
      ...props.openGraph,
    },
    twitter: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: image ? [image] : undefined,
      ...props.twitter,
    },
    robots: noIndex ? { index: false, follow: false } : baseMetadata.robots,
    ...props,
  };
}

// Organization JSON-LD Schema
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.links.phone,
    email: siteConfig.links.email,
    contactType: "customer service",
  },
  sameAs: [siteConfig.links.linkedin, siteConfig.links.twitter],
};

// WebSite JSON-LD Schema
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
};
