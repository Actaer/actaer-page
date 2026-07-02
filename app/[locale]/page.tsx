import { Header, Footer } from "@/components/layout";
import {
  HomeHero,
  ProductsShowcase,
  ConsultingOverview,
  WhyActaer,
  BlogTeaser,
} from "@/components/sections";
import { CtaBanner } from "@/components/carbon";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { constructMetadata, localizedUrl } from "@/lib/metadata";
import { generateBreadcrumbJsonLd, generateSpeakableJsonLd } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    ...constructMetadata({
      title: t("pageTitle"),
      description: t("pageDescription"),
      locale,
      path: "",
    }),
    // Homepage carries the full brand title — skip the "%s | Actaer" template
    title: { absolute: t("pageTitle") },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const url = localizedUrl(locale);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([{ name: "Home", url }]);
  const speakableJsonLd = generateSpeakableJsonLd({ url });

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
          __html: JSON.stringify(speakableJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <HomeHero />
        <ProductsShowcase />
        <ConsultingOverview />
        <WhyActaer />
        <BlogTeaser locale={locale} />
        <CtaBanner
          title={t("cta.title")}
          description={t("cta.description")}
          ctaLabel={t("cta.button")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
