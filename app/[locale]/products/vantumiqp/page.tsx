import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow, CtaBanner } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { constructMetadata, localizedUrl } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateSoftwareApplicationJsonLd,
} from "@/lib/seo";

const EXTERNAL_URL = "https://www.vantumiqp.com";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vantumiqpPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/products/vantumiqp",
    canonical: localizedUrl(locale, "/products/vantumiqp"),
  });
}

export default async function VantumIqpPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vantumiqpPage");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: localizedUrl(locale) },
    { name: "Products", url: localizedUrl(locale, "/products") },
    { name: "VantumIQP", url: localizedUrl(locale, "/products/vantumiqp") },
  ]);
  const features = ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSoftwareApplicationJsonLd("vantumiqp")).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <PageHero
          media={
            <Image src="/images/products/vantumiqp-logo.png" alt="VantumIQP logo" width={48} height={48} className="h-12 w-auto" />
          }
          eyebrow={t("heroEyebrow")}
          title={t("heroTitle")}
          description={t("heroDescription")}
        >
          <Button asChild size="lg">
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
              {t("heroCta")}
              <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="-ml-px">
            <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
              {t("heroSecondaryCta")}
            </a>
          </Button>
        </PageHero>

        <Section>
          <div className="mb-12 space-y-4" data-reveal="">
            <Eyebrow>{t("featuresEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("featuresTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="">
            {features.map((f) => (
              <div key={f} className="-mt-px space-y-2 border border-border p-6 sm:-ml-px sm:mt-0">
                <h3 className="text-body-lg font-semibold">{t(`${f}Title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`${f}Description`)}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section band="muted">
          <div className="mb-12 space-y-4" data-reveal="">
            <Eyebrow>{t("showcaseEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("showcaseTitle")}</h2>
          </div>
          <div className="space-y-8">
            <div className="border border-border bg-background p-2">
              <Image
                src="/images/products/vantumiqp-dashboard.png"
                alt={t("showcaseDashboardAlt")}
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2" data-reveal-group="">
              <div className="border border-border bg-background p-2">
                <Image
                  src="/images/products/vantumiqp-sql-editor.jpg"
                  alt={t("showcaseSqlAlt")}
                  width={1280}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
              <div className="border border-border bg-background p-2">
                <Image
                  src="/images/products/vantumiqp-visualize.jpg"
                  alt={t("showcaseVisualAlt")}
                  width={1280}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl space-y-4" data-reveal="">
            <Eyebrow>{t("audienceEyebrow")}</Eyebrow>
            <h2 className="text-display-md">{t("audienceTitle")}</h2>
            <p className="text-body-lg text-muted-foreground">{t("audienceDescription")}</p>
          </div>
        </Section>

        <CtaBanner
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          ctaLabel={t("ctaButton")}
          ctaHref={EXTERNAL_URL}
          external
        />
      </main>
      <Footer />
    </>
  );
}
