import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { locales, defaultLocale, Locale } from "@/i18n/config";

// Fixed dates for static pages (update these when content changes)
const STATIC_LAST_MODIFIED = new Date("2026-01-24");

// Static page paths
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/services/it-consulting",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/services/software-development",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/services/product-development",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/products/vantum-erp",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

// Generate alternates for each locale
function generateAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = `${siteConfig.url}/${locale}${path}`;
  }
  return alternates;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale for static pages
  for (const locale of locales) {
    for (const page of staticPaths) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: page.changeFrequency,
        priority:
          locale === defaultLocale ? page.priority : page.priority * 0.9,
        alternates: {
          languages: generateAlternates(page.path),
        },
      });
    }
  }

  // Dynamic blog posts for each locale
  for (const locale of locales) {
    const posts = await getAllPosts(locale as Locale);
    for (const post of posts) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: locale === defaultLocale ? 0.6 : 0.5,
        alternates: {
          languages: generateAlternates(`/blog/${post.slug}`),
        },
      });
    }
  }

  return sitemapEntries;
}
