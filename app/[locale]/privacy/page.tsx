import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/privacy`,
    locale,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacyPage");

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/privacy` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">
              {t("lastUpdated", { date: "January 24, 2026" })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                {t("intro")}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.collect.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("sections.collect.description")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{t("sections.collect.items.contact")}</li>
                <li>{t("sections.collect.items.usage")}</li>
                <li>{t("sections.collect.items.device")}</li>
                <li>{t("sections.collect.items.cookies")}</li>
              </ul>
            </section>

            <Separator className="my-8" />

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.use.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("sections.use.description")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{t("sections.use.items.services")}</li>
                <li>{t("sections.use.items.communication")}</li>
                <li>{t("sections.use.items.improvement")}</li>
                <li>{t("sections.use.items.legal")}</li>
              </ul>
            </section>

            <Separator className="my-8" />

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.sharing.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.sharing.description")}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.rights.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("sections.rights.description")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{t("sections.rights.items.access")}</li>
                <li>{t("sections.rights.items.correction")}</li>
                <li>{t("sections.rights.items.deletion")}</li>
                <li>{t("sections.rights.items.objection")}</li>
                <li>{t("sections.rights.items.portability")}</li>
              </ul>
            </section>

            <Separator className="my-8" />

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.contact.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.contact.description")}{" "}
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {siteConfig.links.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
