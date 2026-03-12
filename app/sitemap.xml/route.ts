import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { locales, defaultLocale, Locale } from "@/i18n/config";

// Fixed dates for static pages (update these when content changes)
const STATIC_LAST_MODIFIED = new Date("2026-01-25");

// Static page paths
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  {
    path: "/services/it-consulting",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/services/software-development",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/services/product-development",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
  alternates: Record<string, string>;
}

// Generate alternates for each locale
function generateAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = `${siteConfig.url}/${locale}${path}`;
  }
  return alternates;
}

async function generateSitemapEntries(): Promise<SitemapEntry[]> {
  const baseUrl = siteConfig.url;
  const entries: SitemapEntry[] = [];

  // Generate entries for each locale for static pages
  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: page.changeFrequency,
        priority:
          locale === defaultLocale ? page.priority : page.priority * 0.9,
        alternates: generateAlternates(page.path),
      });
    }
  }

  // Dynamic blog posts for each locale
  for (const locale of locales) {
    const posts = await getAllPosts(locale as Locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: locale === defaultLocale ? 0.6 : 0.5,
        alternates: generateAlternates(`/blog/${post.slug}`),
      });
    }
  }

  return entries;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateXml(entries: SitemapEntry[]): string {
  const urlElements = entries
    .map((entry) => {
      const alternateLinks = Object.entries(entry.alternates)
        .map(
          ([lang, url]) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(url)}" />`,
        )
        .join("\n");

      return `<url>
<loc>${escapeXml(entry.url)}</loc>
${alternateLinks}
<lastmod>${entry.lastModified.toISOString()}</lastmod>
<changefreq>${entry.changeFrequency}</changefreq>
<priority>${entry.priority}</priority>
</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>`;
}

export async function GET() {
  const entries = await generateSitemapEntries();
  const xml = generateXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
