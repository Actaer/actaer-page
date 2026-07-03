import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow, CtaBanner } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { constructMetadata, localizedUrl } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "digitalModernizationPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/consulting/digital-modernization",
    canonical: localizedUrl(locale, "/consulting/digital-modernization"),
  });
}

export default async function DigitalModernizationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("digitalModernizationPage");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: localizedUrl(locale) },
    { name: "Consulting", url: localizedUrl(locale, "/consulting") },
    { name: "Digital Modernization", url: localizedUrl(locale, "/consulting/digital-modernization") },
  ]);
  const offerings = ["offering1", "offering2", "offering3", "offering4"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <PageHero eyebrow={t("heroEyebrow")} title={t("heroTitle")} description={t("heroDescription")}>
          <Button asChild size="lg">
            <Link href="/contact">
              {t("heroCta")}
              <ArrowRight />
            </Link>
          </Button>
        </PageHero>

        <Section>
          <div className="mb-12 space-y-4" data-reveal="">
            <Eyebrow>{t("offeringsEyebrow")}</Eyebrow>
            <h2 className="text-display-md max-w-3xl">{t("offeringsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" data-reveal-group="">
            {offerings.map((o) => (
              <div key={o} className="-mt-px space-y-2 border border-border p-8 sm:-ml-px sm:mt-0">
                <h3 className="text-card-title">{t(`${o}Title`)}</h3>
                <p className="text-body-tracked text-muted-foreground">{t(`${o}Description`)}</p>
              </div>
            ))}
          </div>
        </Section>

        <CtaBanner
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          ctaLabel={t("ctaButton")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
