import { siteConfig } from "./metadata";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate breadcrumb JSON-LD schema
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate service JSON-LD schema for professional services
 */
export function generateServiceJsonLd({
  name,
  description,
  serviceType,
  url,
}: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url,
    name,
    description,
    serviceType,
    url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.1367,
        longitude: 20.5168,
      },
      geoRadius: "5000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            description,
          },
        },
      ],
    },
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article JSON-LD for blog list page
 */
export function generateBlogListJsonLd(
  posts: { title: string; description: string; url: string; date: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description:
      "Insights, tutorials, and updates on software development, IT consulting, and technology trends.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: post.url,
      datePublished: post.date,
    })),
  };
}

/**
 * Generate ItemList JSON-LD for service listings
 */
export function generateServiceListJsonLd(
  services: { name: string; description: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services",
    description: "Professional software development and IT consulting services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      description: service.description,
      url: service.url,
    })),
  };
}

/**
 * Generate Speakable JSON-LD schema for voice assistants
 */
export function generateSpeakableJsonLd({
  url,
  cssSelectors = ["h1", ".hero-description", "article"],
}: {
  url: string;
  cssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/**
 * Generate HowTo JSON-LD schema for process pages
 */
export function generateHowToJsonLd({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate comprehensive Organization JSON-LD with additional AI-friendly properties
 */
export function generateEnhancedOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: "Actaer",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    foundingDate: "2015",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
      addressRegion: "Sandžak",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.links.phone,
        email: siteConfig.links.email,
        contactType: "customer service",
        availableLanguage: ["English", "Serbian"],
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.links.email,
        contactType: "sales",
        availableLanguage: ["English", "Serbian"],
      },
    ],
    sameAs: [siteConfig.links.linkedin, siteConfig.links.twitter],
    knowsAbout: [
      "Software Development",
      "IT Consulting",
      "Digital Transformation",
      "Enterprise Resource Planning",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Mobile App Development",
      "Cloud Computing",
      "DevOps",
      "Agile Methodology",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "IT Consulting",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Digital Transformation Strategy",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Technical Due Diligence",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Software Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Software Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI & Machine Learning Solutions",
              },
            },
          ],
        },
      ],
    },
    slogan: "Your Success, Engineered",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.1367,
        longitude: 20.5168,
      },
      geoRadius: "10000000",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 15,
      maxValue: 25,
    },
  };
}

/**
 * Generate About Page JSON-LD with detailed company information
 */
export function generateAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}/about`,
    name: `About ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} - a full-service tech consulting firm transforming businesses into agile, software-powered innovators.`,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@id": `${siteConfig.url}/#organization`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteConfig.url}/about`,
        },
      ],
    },
  };
}

/**
 * Generate WebSite JSON-LD with search action for AI assistants
 */
export function generateWebsiteWithSearchJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate ContactPage JSON-LD
 */
export function generateContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact`,
    name: `Contact ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. Let's discuss your software development, IT consulting, or product development needs.`,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * Generate CollectionPage JSON-LD for services/blog listing pages
 */
export function generateCollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}
