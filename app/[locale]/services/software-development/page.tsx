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

interface SoftwareDevPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: SoftwareDevPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "softwareDevPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/services/software-development`,
    locale,
    path: "/services/software-development",
  });
}

export default async function SoftwareDevelopmentPage({
  params,
}: SoftwareDevPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("softwareDevPage");
  const tServices = await getTranslations("services");

  const developmentServices = [
    {
      id: "fullstack",
      title: t("fullstackTitle"),
      description: t("fullstackDescription"),
      benefits: [
        t("fullstackBenefit1"),
        t("fullstackBenefit2"),
        t("fullstackBenefit3"),
        t("fullstackBenefit4"),
        t("fullstackBenefit5"),
      ],
    },
    {
      id: "ai-ml",
      title: t("aiMlTitle"),
      description: t("aiMlDescription"),
      benefits: [
        t("aiMlBenefit1"),
        t("aiMlBenefit2"),
        t("aiMlBenefit3"),
        t("aiMlBenefit4"),
        t("aiMlBenefit5"),
      ],
    },
    {
      id: "agentic",
      title: t("agenticTitle"),
      description: t("agenticDescription"),
      benefits: [
        t("agenticBenefit1"),
        t("agenticBenefit2"),
        t("agenticBenefit3"),
        t("agenticBenefit4"),
        t("agenticBenefit5"),
      ],
    },
    {
      id: "realtime",
      title: t("realtimeTitle"),
      description: t("realtimeDescription"),
      benefits: [
        t("realtimeBenefit1"),
        t("realtimeBenefit2"),
        t("realtimeBenefit3"),
        t("realtimeBenefit4"),
        t("realtimeBenefit5"),
      ],
    },
    {
      id: "enterprise",
      title: t("enterpriseTitle"),
      description: t("enterpriseDescription"),
      benefits: [
        t("enterpriseBenefit1"),
        t("enterpriseBenefit2"),
        t("enterpriseBenefit3"),
        t("enterpriseBenefit4"),
        t("enterpriseBenefit5"),
      ],
    },
  ];

  // JSON-LD schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: tServices("badge"), url: `${siteConfig.url}/${locale}/services` },
    {
      name: t("pageTitle"),
      url: `${siteConfig.url}/${locale}/services/software-development`,
    },
  ]);

  const serviceJsonLd = generateServiceJsonLd({
    name: t("pageTitle"),
    description: t("pageDescription"),
    serviceType: "Software Development",
    url: `${siteConfig.url}/${locale}/services/software-development`,
  });

  // FAQ for AI crawlers (in English for SEO)
  const faqJsonLd = generateFaqJsonLd([
    {
      question: "What software development services does Actaer provide?",
      answer:
        "Actaer provides full-stack engineering (React, Vue.js, Node.js, .NET), AI & Machine Learning development, Enterprise Solutions (ERP, CRM, data platforms), and Real-Time Communications (VoIP, video conferencing, collaboration platforms).",
    },
    {
      question: "What programming languages and frameworks does Actaer use?",
      answer:
        "Actaer works with modern React, Angular, Vue.js frontends; Node.js, .NET, Java backends; GraphQL and RESTful APIs; microservices architecture; and implements CI/CD pipelines for automated deployment.",
    },
    {
      question: "Does Actaer offer AI and Machine Learning development?",
      answer:
        "Yes, Actaer offers custom ML model development, Natural Language Processing (NLP), computer vision solutions, predictive analytics, and AI integration services to help businesses automate processes and gain insights.",
    },
    {
      question: "What enterprise solutions does Actaer build?",
      answer:
        "Actaer builds ERP system implementations, custom CRM solutions, business process automation, data warehouse solutions, and enterprise integration platforms tailored to specific business needs.",
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
            <Tabs defaultValue="fullstack" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-8">
                {developmentServices.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {developmentServices.map((service) => (
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
                      <h4 className="font-semibold mb-4">
                        {t("whatWeDeliver")}
                      </h4>
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

        {/* Tech Stack */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("techStackTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("techStackDescription")}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t("techFrontend")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Angular", "TypeScript"].map(
                      (tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t("techBackend")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", ".NET", "Python", "Java"].map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t("techDatabase")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"].map(
                      (tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{t("techDevOps")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "AWS", "Azure"].map(
                      (tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ),
                    )}
                  </div>
                </CardContent>
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
