import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

interface ITConsultingPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ITConsultingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "itConsultingPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/services/it-consulting`,
    locale,
    path: "/services/it-consulting",
  });
}

export default async function ITConsultingPage({
  params,
}: ITConsultingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("itConsultingPage");
  const tServices = await getTranslations("services");

  const consultingServices = [
    {
      id: "strategy",
      title: t("strategyTitle"),
      description: t("strategyDescription"),
      benefits: [
        t("strategyBenefit1"),
        t("strategyBenefit2"),
        t("strategyBenefit3"),
        t("strategyBenefit4"),
        t("strategyBenefit5"),
      ],
    },
    {
      id: "planning",
      title: t("planningTitle"),
      description: t("planningDescription"),
      benefits: [
        t("planningBenefit1"),
        t("planningBenefit2"),
        t("planningBenefit3"),
        t("planningBenefit4"),
        t("planningBenefit5"),
      ],
    },
    {
      id: "due-diligence",
      title: t("dueDiligenceTitle"),
      description: t("dueDiligenceDescription"),
      benefits: [
        t("dueDiligenceBenefit1"),
        t("dueDiligenceBenefit2"),
        t("dueDiligenceBenefit3"),
        t("dueDiligenceBenefit4"),
        t("dueDiligenceBenefit5"),
      ],
    },
    {
      id: "augmentation",
      title: t("augmentationTitle"),
      description: t("augmentationDescription"),
      benefits: [
        t("augmentationBenefit1"),
        t("augmentationBenefit2"),
        t("augmentationBenefit3"),
        t("augmentationBenefit4"),
        t("augmentationBenefit5"),
      ],
    },
    {
      id: "data",
      title: t("dataTitle"),
      description: t("dataDescription"),
      benefits: [
        t("dataBenefit1"),
        t("dataBenefit2"),
        t("dataBenefit3"),
        t("dataBenefit4"),
        t("dataBenefit5"),
      ],
    },
  ];

  // JSON-LD schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: tServices("badge"), url: `${siteConfig.url}/${locale}/services` },
    {
      name: t("pageTitle"),
      url: `${siteConfig.url}/${locale}/services/it-consulting`,
    },
  ]);

  const serviceJsonLd = generateServiceJsonLd({
    name: t("pageTitle"),
    description: t("pageDescription"),
    serviceType: "IT Consulting",
    url: `${siteConfig.url}/${locale}/services/it-consulting`,
  });

  // FAQ for AI crawlers (in English for SEO)
  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What IT consulting services does Actaer offer?",
      answer:
        "Actaer offers comprehensive IT consulting including Digital Transformation Strategy, Project Specification & Planning, Technical Due Diligence, Team Augmentation, and Data-Driven Consulting services.",
    },
    {
      question: "What is technical due diligence?",
      answer:
        "Technical due diligence is an in-depth assessment of a company's technology stack, typically performed before mergers, acquisitions, or major investments. It includes code quality review, security vulnerability assessment, scalability analysis, technical debt evaluation, and team capability assessment.",
    },
    {
      question: "Does Actaer offer team augmentation services?",
      answer:
        "Yes, Actaer provides team augmentation services with senior developers and architects, specialized skill sets on demand, flexible engagement models, knowledge transfer, and managed onboarding processes.",
    },
  ]);

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
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                {t.raw("heroTitle").split("{highlighted}")[0]}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("heroHighlighted")}
                </span>
                {t.raw("heroTitle").split("{highlighted}")[1] || ""}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("heroDescription")}
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  {t("ctaButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="strategy" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-8">
                {consultingServices.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {consultingServices.map((service) => (
                <TabsContent key={service.id} value={service.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl md:text-3xl font-heading">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-4">{t("whatYouGet")}</h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("whyChooseTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("whyChooseDescription")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{t("reason1Title")}</CardTitle>
                  <CardDescription>{t("reason1Description")}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{t("reason2Title")}</CardTitle>
                  <CardDescription>{t("reason2Description")}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{t("reason3Title")}</CardTitle>
                  <CardDescription>{t("reason3Description")}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("ctaDescription")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    {t("ctaButtonPrimary")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">{t("ctaButtonSecondary")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
