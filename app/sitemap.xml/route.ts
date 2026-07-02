import { localizedUrl } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

// Update when static page content meaningfully changes — Google only trusts
// lastmod when it is consistently accurate, so never set this to build time.
const STATIC_LAST_MODIFIED = "2026-07-02";

const staticPaths = [
  "",
  "/products",
  "/products/vantumiqp",
  "/products/faberpdf",
  "/consulting",
  "/consulting/ai-consulting",
  "/consulting/software-development",
  "/consulting/digital-modernization",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/cookies",
];

interface SitemapEntry {
  url: string;
  lastModified: string;
  // hreflang → absolute URL, repeated identically for every locale variant
  alternates: Record<string, string>;
}

function buildAlternates(
  path: string,
  availableLocales: readonly Locale[],
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of availableLocales) {
    alternates[locale] = localizedUrl(locale, path);
  }
  if (availableLocales.includes(defaultLocale)) {
    alternates["x-default"] = localizedUrl(defaultLocale, path);
  }
  return alternates;
}

async function generateSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  for (const path of staticPaths) {
    const alternates = buildAlternates(path, locales);
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: STATIC_LAST_MODIFIED,
        alternates,
      });
    }
  }

  // Blog posts — only link alternates for locales where the translation exists
  const postsByLocale = new Map<Locale, { slug: string; date: string }[]>();
  for (const locale of locales) {
    postsByLocale.set(locale, await getAllPosts(locale));
  }
  const slugLocales = new Map<string, Locale[]>();
  for (const [locale, posts] of postsByLocale) {
    for (const post of posts) {
      slugLocales.set(post.slug, [...(slugLocales.get(post.slug) ?? []), locale]);
    }
  }

  for (const [locale, posts] of postsByLocale) {
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: new Date(post.date).toISOString().slice(0, 10),
        alternates: buildAlternates(path, slugLocales.get(post.slug) ?? []),
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
<lastmod>${entry.lastModified}</lastmod>
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
