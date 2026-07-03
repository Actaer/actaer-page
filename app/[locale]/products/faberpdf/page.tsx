import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { constructMetadata, localizedUrl } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateSoftwareApplicationJsonLd,
} from "@/lib/seo";

const EXTERNAL_URL = "https://www.faberpdf.com";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faberpdfPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/products/faberpdf",
    canonical: localizedUrl(locale, "/products/faberpdf"),
  });
}

export default async function FaberPdfPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faberpdfPage");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: localizedUrl(locale) },
    { name: "Products", url: localizedUrl(locale, "/products") },
    { name: "FaberPDF", url: localizedUrl(locale, "/products/faberpdf") },
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
          __html: JSON.stringify(generateSoftwareApplicationJsonLd("faberpdf")).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <PageHero
          media={
            <Image src="/images/products/faberpdf-logo-black.png" alt="FaberPDF logo" width={48} height={48} className="h-12 w-auto" />
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
          <div className="max-w-3xl space-y-4" data-reveal="">
            <Eyebrow>{t("privacyEyebrow")}</Eyebrow>
            <h2 className="text-display-md">{t("privacyTitle")}</h2>
            <p className="text-body-lg text-muted-foreground">{t("privacyDescription")}</p>
          </div>
        </Section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-[1584px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-headline">{t("ctaTitle")}</h2>
              <p className="text-body-tracked text-primary-foreground/80">{t("ctaDescription")}</p>
            </div>
            <Button
              asChild
              size="lg"
              className="border border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={EXTERNAL_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaButton")}
                <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
