import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { constructMetadata, siteConfig, localizedUrl } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale, locales, defaultLocale } from "@/i18n/config";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateStaticParams() {
  // Generate params for all locale/slug combinations
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) {
    return constructMetadata({ title: t("noPostsTitle") });
  }

  return constructMetadata({
    title: post.title,
    description: post.description,
    image: post.image,
    canonical: localizedUrl(locale, `/blog/${slug}`),
    locale,
    path: `/blog/${slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Dynamic import of the MDX content - try locale first, then fallback
  let Content;
  let postSchemas: object[] = [];
  try {
    const mdxModule = await import(`@/content/blog/${locale}/${slug}.mdx`);
    Content = mdxModule.default;
    postSchemas = mdxModule.schemas || [];
  } catch {
    // Fallback to English
    const mdxModule = await import(
      `@/content/blog/${defaultLocale}/${slug}.mdx`
    );
    Content = mdxModule.default;
    postSchemas = mdxModule.schemas || [];
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: t("pageTitle"), url: localizedUrl(locale, "/blog") },
    { name: post.title, url: localizedUrl(locale, `/blog/${slug}`) },
  ]);

  // Map locale to language code
  const localeToLang: Record<string, string> = {
    en: "en-US",
    sr: "sr-RS",
    de: "de-DE",
    es: "es-ES",
    pt: "pt-PT",
    pl: "pl-PL",
  };

  // BlogPosting JSON-LD
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localizedUrl(locale, `/blog/${slug}`),
    },
    keywords: post.tags.join(", "),
    articleSection: "Technology",
    inLanguage: localeToLang[locale] || "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {postSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <Header />
      <main>
        <article className="pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-[1584px] px-4 md:px-8">
            {/* Back button */}
            <div className="mx-auto mb-8 max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm tracking-[0.16px] text-primary underline-offset-4 hover:underline"
              >
                <ArrowLeft className="size-4" />
                {t("backToBlog")}
              </Link>
            </div>

            {/* Post header */}
            <header className="mx-auto mb-12 max-w-3xl">
              {post.tags.length > 0 && (
                <p className="text-eyebrow mb-4 text-muted-foreground">
                  {post.tags.join(" · ")}
                </p>
              )}
              <h1 className="text-display-md mb-6 text-balance">
                {post.title}
              </h1>
              <p className="text-body-lg mb-6 text-muted-foreground">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.32px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="size-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {t("published")} {formatDate(post.date, locale)}
                  {post.lastUpdated && (
                    <>
                      {" "}
                      | {t("lastUpdated")}{" "}
                      {formatDate(post.lastUpdated, locale)}
                    </>
                  )}
                </span>
              </div>
            </header>

            <Separator className="mx-auto mb-12 max-w-3xl" />

            {/* Post content */}
            <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-a:text-primary mx-auto max-w-3xl">
              <Content />
            </div>

            <Separator className="mx-auto my-12 max-w-3xl" />

            {/* Post footer */}
            <footer className="mx-auto max-w-3xl">
              <p className="mb-6 text-muted-foreground">
                {t("thanksForReading")}
              </p>
              <Button asChild>
                <Link href="/contact">{t("getInTouch")}</Link>
              </Button>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
