import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, CtaBanner } from "@/components/carbon";
import { ConsultingOverview } from "@/components/sections";
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
  const t = await getTranslations({ locale, namespace: "consultingPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    locale,
    path: "/consulting",
    canonical: localizedUrl(locale, "/consulting"),
  });
}

export default async function ConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consultingPage");
  const tHome = await getTranslations("home");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: localizedUrl(locale) },
    { name: "Consulting", url: localizedUrl(locale, "/consulting") },
  ]);

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
        <ConsultingOverview />
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
