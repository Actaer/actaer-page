import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { constructMetadata, siteConfig } from "@/lib/metadata";
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
    canonical: `${siteConfig.url}/${locale}/blog/${slug}`,
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
  try {
    const module = await import(`@/content/blog/${locale}/${slug}.mdx`);
    Content = module.default;
  } catch {
    // Fallback to English
    const module = await import(`@/content/blog/${defaultLocale}/${slug}.mdx`);
    Content = module.default;
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/blog` },
    { name: post.title, url: `${siteConfig.url}/${locale}/blog/${slug}` },
  ]);

  // Map locale to language code
  const localeToLang: Record<string, string> = {
    en: "en-US",
    sr: "sr-RS",
    de: "de-DE",
    es: "es-ES",
    pt: "pt-PT",
  };

  // BlogPosting JSON-LD
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
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
      "@id": `${siteConfig.url}/${locale}/blog/${slug}`,
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
      <Header />
      <main className="pt-24">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            {/* Back button */}
            <div className="max-w-3xl mx-auto mb-8">
              <Button asChild variant="ghost" className="group">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {t("backToBlog")}
                </Link>
              </Button>
            </div>

            {/* Post header */}
            <header className="max-w-3xl mx-auto mb-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date, locale)}
                </span>
              </div>
            </header>

            <Separator className="max-w-3xl mx-auto mb-12" />

            {/* Post content */}
            <div className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary max-w-3xl mx-auto">
              <Content />
            </div>

            <Separator className="max-w-3xl mx-auto my-12" />

            {/* Post footer */}
            <footer className="max-w-3xl mx-auto text-center">
              <p className="text-muted-foreground mb-6">
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
