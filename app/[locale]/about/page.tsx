import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
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
import { ArrowRight, Target, Heart, Zap, Users } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateAboutPageJsonLd,
  generateFaqJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
import { type Locale } from "@/i18n/config";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/about`,
    locale,
    path: "/about",
  });
}

const valueIcons = [Target, Heart, Zap, Users];

// JSON-LD schemas for AI discoverability
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "About", url: `${siteConfig.url}/about` },
]);

const aboutPageJsonLd = generateAboutPageJsonLd();

// FAQ for AI crawlers and featured snippets
const faqJsonLd = generateFaqJsonLd([
  {
    question: "What is Actaer?",
    answer:
      "We are a full-service technology consulting firm based in Serbia that specializes in IT consulting, custom software development, and product development. We transform businesses into agile, software-powered innovators.",
  },
  {
    question: "Where is Actaer located?",
    answer:
      "Our headquarters are in Novi Pazar, Serbia. We serve clients globally and offer fully remote engagement models.",
  },
  {
    question: "What services does the company offer?",
    answer:
      "We offer three main service categories: IT Consulting (digital transformation, technical due diligence, team augmentation), Custom Software Development (full-stack engineering, AI/ML solutions, enterprise systems), and Product Development (MVP development, UI/UX design, ongoing support).",
  },
  {
    question: "Why choose Actaer as a new consulting firm?",
    answer:
      "Although newly founded, our team consists of experienced engineers and consultants with proven track records in software development and IT consulting. We bring fresh perspectives, modern approaches, and dedicated focus to every client engagement.",
  },
  {
    question: "What is Vantum ERP?",
    answer:
      "Vantum ERP is our flagship product - a modern distribution ERP designed for wholesalers, distributors, and retail chains. It features AI-powered replenishment, real-time inventory management, and a modern cloud-native architecture.",
  },
]);

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const speakableJsonLd = generateSpeakableJsonLd({
    url: `${siteConfig.url}/${locale}/about`,
  });

  const values = [
    {
      icon: valueIcons[0],
      title: t("values.resultsDriven.title"),
      description: t("values.resultsDriven.description"),
    },
    {
      icon: valueIcons[1],
      title: t("values.clientCentric.title"),
      description: t("values.clientCentric.description"),
    },
    {
      icon: valueIcons[2],
      title: t("values.innovationFocused.title"),
      description: t("values.innovationFocused.description"),
    },
    {
      icon: valueIcons[3],
      title: t("values.collaborative.title"),
      description: t("values.collaborative.description"),
    },
  ];

  const services = [
    {
      title: t("whatWeDo.itConsulting.title"),
      description: t("whatWeDo.itConsulting.description"),
      href: `/${locale}/services/it-consulting`,
    },
    {
      title: t("whatWeDo.softwareDevelopment.title"),
      description: t("whatWeDo.softwareDevelopment.description"),
      href: `/${locale}/services/software-development`,
    },
    {
      title: t("whatWeDo.productDevelopment.title"),
      description: t("whatWeDo.productDevelopment.description"),
      href: `/${locale}/services/product-development`,
    },
  ];

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
          __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
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
                {t("heroTitle")}{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("heroHighlighted")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("heroDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  {t("story.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("story.paragraph1")}</p>
                  <p>{t("story.paragraph2")}</p>
                  <p>{t("story.paragraph3")}</p>
                  <p>{t("story.paragraph4")}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Founded in 2015. Last updated: January 2026.
                </p>
                <div className="mt-4 flex gap-4">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 text-sm"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 p-1">
                  <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl md:text-8xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                        A
                      </div>
                      <p className="text-xl font-semibold">Actaer</p>
                      <p className="text-muted-foreground">
                        {t("story.tagline")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("values.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("values.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {t("mission.description")}
              </p>
              <div className="inline-block p-8 rounded-2xl bg-background border">
                <blockquote className="text-lg italic">
                  &ldquo;{t("mission.quote")}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("whatWeDo.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("whatWeDo.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="p-0 group">
                      <Link href={service.href}>
                        {t("whatWeDo.learnMore")}
                        <span className="sr-only"> {service.title}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={`/${locale}/contact`}>
                    {t("cta.getInTouch")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/services`}>
                    {t("cta.exploreServices")}
                  </Link>
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
