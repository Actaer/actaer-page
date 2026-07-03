import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section } from "@/components/carbon";
import { BlogCard } from "@/components/blog";
import { getAllPosts } from "@/lib/blog";
import { constructMetadata, siteConfig, localizedUrl } from "@/lib/metadata";
import { generateBreadcrumbJsonLd, generateBlogListJsonLd } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: localizedUrl(locale, "/blog"),
    locale,
    path: "/blog",
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await getAllPosts(locale);

  // JSON-LD schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: t("pageTitle"), url: localizedUrl(locale, "/blog") },
  ]);

  const blogListJsonLd = generateBlogListJsonLd(
    posts.map((post) => ({
      title: post.title,
      description: post.description,
      url: localizedUrl(locale, `/blog/${post.slug}`),
      date: post.date,
    })),
  );

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
          __html: JSON.stringify(blogListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <PageHero
          eyebrow={t("badge")}
          title={t("title")}
          description={t("description")}
        />

        {/* Blog Posts Grid */}
        <Section band="muted">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-reveal-group="">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-body-lg text-muted-foreground">
                {t("noPostsDescription")}
              </p>
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
