import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, CtaBanner } from "@/components/carbon";
import { ProductsShowcase } from "@/components/sections";
import { constructMetadata, localizedUrl } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/products",
    canonical: localizedUrl(locale, "/products"),
  });
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");
  const tHome = await getTranslations("home");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: localizedUrl(locale) },
    { name: "Products", url: localizedUrl(locale, "/products") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")} />
        <ProductsShowcase />
        <CtaBanner
          title={tHome("cta.title")}
          description={tHome("cta.description")}
          ctaLabel={tHome("cta.button")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
