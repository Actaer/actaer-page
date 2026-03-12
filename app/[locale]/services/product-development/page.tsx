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
import { ArrowRight, CheckCircle } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
  generateHowToJsonLd,
  generateFaqJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

interface ProductDevPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ProductDevPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productDevPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/services/product-development`,
    locale,
    path: "/services/product-development",
  });
}

export default async function ProductDevelopmentPage({
  params,
}: ProductDevPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("productDevPage");
  const tServices = await getTranslations("services");

  const phases = [
    {
      number: "01",
      title: t("phase1Title"),
      description: t("phase1Description"),
      deliverables: [
        t("phase1Deliverable1"),
        t("phase1Deliverable2"),
        t("phase1Deliverable3"),
        t("phase1Deliverable4"),
      ],
    },
    {
      number: "02",
      title: t("phase2Title"),
      description: t("phase2Description"),
      deliverables: [
        t("phase2Deliverable1"),
        t("phase2Deliverable2"),
        t("phase2Deliverable3"),
        t("phase2Deliverable4"),
      ],
    },
    {
      number: "03",
      title: t("phase3Title"),
      description: t("phase3Description"),
      deliverables: [
        t("phase3Deliverable1"),
        t("phase3Deliverable2"),
        t("phase3Deliverable3"),
        t("phase3Deliverable4"),
      ],
    },
    {
      number: "04",
      title: t("phase4Title"),
      description: t("phase4Description"),
      deliverables: [
        t("phase4Deliverable1"),
        t("phase4Deliverable2"),
        t("phase4Deliverable3"),
        t("phase4Deliverable4"),
      ],
    },
    {
      number: "05",
      title: t("phase5Title"),
      description: t("phase5Description"),
      deliverables: [
        t("phase5Deliverable1"),
        t("phase5Deliverable2"),
        t("phase5Deliverable3"),
        t("phase5Deliverable4"),
      ],
    },
    {
      number: "06",
      title: t("phase6Title"),
      description: t("phase6Description"),
      deliverables: [
        t("phase6Deliverable1"),
        t("phase6Deliverable2"),
        t("phase6Deliverable3"),
        t("phase6Deliverable4"),
      ],
    },
  ];

  // JSON-LD schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: tServices("badge"), url: `${siteConfig.url}/${locale}/services` },
    {
      name: t("pageTitle"),
      url: `${siteConfig.url}/${locale}/services/product-development`,
    },
  ]);

  const serviceJsonLd = generateServiceJsonLd({
    name: t("pageTitle"),
    description: t("pageDescription"),
    serviceType: "Product Development",
    url: `${siteConfig.url}/${locale}/services/product-development`,
  });

  // HowTo schema for product development process - great for AI understanding
  const howToJsonLd = generateHowToJsonLd({
    name: "How to Build a Successful Software Product",
    description:
      "A comprehensive guide to product development from conceptualization to launch and ongoing support.",
    totalTime: "P3M",
    steps: phases.map((phase) => ({
      name: phase.title,
      text: phase.description,
    })),
  });

  // FAQ for AI crawlers (in English for SEO)
  const faqJsonLd = generateFaqJsonLd([
    {
      question: "How long does product development take?",
      answer:
        "Product development timelines vary based on complexity. A typical MVP can be delivered in 2-3 months, while full-featured products may take 6-12 months. We work in agile sprints to deliver value incrementally.",
    },
    {
      question: "What is included in MVP development?",
      answer:
        "MVP (Minimum Viable Product) development includes core feature implementation, scalable architecture, basic analytics integration, and deployment infrastructure. This allows you to validate your product idea with real users quickly.",
    },
    {
      question: "Does Actaer provide ongoing support after launch?",
      answer:
        "Yes, we offer comprehensive post-launch support including 24/7 monitoring, bug fixes and updates, security patches, and feature enhancements to ensure your product continues to evolve with your business.",
    },
    {
      question:
        "What is the difference between MVP and full product development?",
      answer:
        "An MVP focuses on the minimum set of features to validate your idea with real users, typically delivered in 2-3 months. Full product development builds on the validated MVP with additional features, integrations, and scaling, spanning 6-12 months.",
    },
    {
      question: "How does agile development reduce risk?",
      answer:
        "Agile development reduces risk by delivering working software in short sprints (1-2 weeks), gathering user feedback early and often, and allowing you to pivot or adjust priorities based on real data rather than assumptions.",
    },
  ]);

  const speakableJsonLd = generateSpeakableJsonLd({
    url: `${siteConfig.url}/${locale}/services/product-development`,
  });

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
          __html: JSON.stringify(howToJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableJsonLd).replace(/</g, "\\u003c"),
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
              <p className="text-lg md:text-xl text-muted-foreground mb-4">
                {t("heroDescription")}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: January 2026.
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

        {/* Development Phases */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("processTitle")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("processDescription")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phases.map((phase, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <span className="text-4xl font-bold text-primary/30 font-mono">
                      {phase.number}
                    </span>
                    <CardTitle className="text-xl font-heading">
                      {phase.title}
                    </CardTitle>
                    <CardDescription>{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                      {t("deliverables")}
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  {t("whyChooseTitle")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("whyChooseDescription")}
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("reason1Title")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("reason1Description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("reason2Title")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("reason2Description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("reason3Title")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("reason3Description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t("reason4Title")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("reason4Description")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 p-1">
                  <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl md:text-8xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                        MVP
                      </div>
                      <p className="text-muted-foreground">{t("mvpTagline")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Quote & Stats */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto mb-12">
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4">
                &ldquo;It doesn&apos;t matter how good your engineering team is
                if they are not given something worthwhile to build.&rdquo;
                <footer className="text-sm mt-2 not-italic">
                  &mdash; Marty Cagan, Inspired: How to Create Tech Products
                  Customers Love (2018)
                </footer>
              </blockquote>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-lg border bg-card">
                <div className="text-4xl font-bold text-primary mb-2">
                  30-50%
                </div>
                <p className="text-sm text-muted-foreground">
                  faster time-to-market with agile development vs. waterfall
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border bg-card">
                <div className="text-4xl font-bold text-primary mb-2">90%</div>
                <p className="text-sm text-muted-foreground">
                  of startups fail — but those that validate with MVPs reduce
                  risk significantly
                </p>
              </div>
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
