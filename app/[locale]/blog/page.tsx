import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog";
import { getAllPosts } from "@/lib/blog";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateBlogListJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
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
    canonical: `${siteConfig.url}/${locale}/blog`,
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
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/blog` },
  ]);

  const blogListJsonLd = generateBlogListJsonLd(
    posts.map((post) => ({
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                {t.raw("title").split("{highlighted}")[0]}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("highlighted")}
                </span>
                {t.raw("title").split("{highlighted}")[1] || ""}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("description")}
              </p>
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {posts.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Published Articles
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <p className="text-sm text-muted-foreground">
                    Topic Categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {t("noPostsDescription")}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
