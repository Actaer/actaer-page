import type { Metadata } from "next";

export const siteConfig = {
  name: "Actaer",
  description:
    "Full-service tech consulting firm transforming businesses into agile, software-powered innovators. IT consulting, custom software development, and enterprise solutions.",
  url: "https://actaer.com",
  ogImage: "/images/og-image.png",
  links: {
    email: "office@actaer.com",
    phone: "+381 649055722",
    linkedin: "https://linkedin.com/company/actaer",
    github: "https://github.com/actaer",
  },
  address: {
    city: "Novi Pazar",
    country: "Serbia",
  },
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
  ],
  authors: [{ name: "Actaer", url: siteConfig.url }],
  creator: "Actaer",
  publisher: "Actaer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} & Partial<Metadata> = {}): Metadata {
  return {
    title: title,
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: image ? [{ url: image }] : undefined,
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
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
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
