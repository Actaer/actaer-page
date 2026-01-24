import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Lightbulb, Code2, Rocket } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd, generateServiceListJsonLd } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

interface ServicesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/services`,
    locale,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const tServices = await getTranslations("services");

  const services = [
    {
      icon: Lightbulb,
      title: tServices("itConsulting.title"),
      description: tServices("itConsulting.description"),
      features: [
        tServices("itConsulting.features.digitalTransformation"),
        tServices("itConsulting.features.technicalDueDiligence"),
        tServices("itConsulting.features.teamAugmentation"),
        tServices("itConsulting.features.dataDriven"),
      ],
      href: "/services/it-consulting",
    },
    {
      icon: Code2,
      title: tServices("softwareDevelopment.title"),
      description: tServices("softwareDevelopment.description"),
      features: [
        tServices("softwareDevelopment.features.fullStack"),
        tServices("softwareDevelopment.features.aiMl"),
        tServices("softwareDevelopment.features.enterprise"),
        tServices("softwareDevelopment.features.realTime"),
      ],
      href: "/services/software-development",
    },
    {
      icon: Rocket,
      title: tServices("productDevelopment.title"),
      description: tServices("productDevelopment.description"),
      features: [
        tServices("productDevelopment.features.prototyping"),
        tServices("productDevelopment.features.userCentric"),
        tServices("productDevelopment.features.agile"),
        tServices("productDevelopment.features.launch"),
      ],
      href: "/services/product-development",
    },
  ];

  // JSON-LD schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/services` },
  ]);

  const serviceListJsonLd = generateServiceListJsonLd(
    services.map((service) => ({
      name: service.title,
      description: service.description,
      url: `${siteConfig.url}/${locale}${service.href}`,
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
          __html: JSON.stringify(serviceListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {tServices("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                {t.raw("heroTitle").split("{highlighted}")[0]}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("heroHighlighted")}
                </span>
                {t.raw("heroTitle").split("{highlighted}")[1] || ""}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:gap-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <CardHeader className="pb-0 md:pb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-heading">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg mt-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 md:pt-6">
                      <h4 className="font-semibold mb-4">
                        {tServices("keyOfferings")}
                      </h4>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="group">
                        <Link href={service.href}>
                          {tServices("learnMore")}
                          <span className="sr-only"> {service.title}</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">
                  {t("faqBadge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  {t("faqTitle")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("faqDescription")}
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("faq1Question")}</AccordionTrigger>
                  <AccordionContent>{t("faq1Answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("faq2Question")}</AccordionTrigger>
                  <AccordionContent>{t("faq2Answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("faq3Question")}</AccordionTrigger>
                  <AccordionContent>{t("faq3Answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>{t("faq4Question")}</AccordionTrigger>
                  <AccordionContent>{t("faq4Answer")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("ctaDescription")}
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
      </main>
      <Footer />
    </>
  );
}
