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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Package,
  ShoppingCart,
  Truck,
  Brain,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateSoftwareAppJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { type Locale } from "@/i18n/config";
import { setRequestLocale, getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vantumErpPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/products/vantum-erp`,
    locale,
    path: "/products/vantum-erp",
  });
}

// JSON-LD for the product
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vantum ERP",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Modern distribution ERP for wholesalers, distributors, and retail chains. Features inventory management, sales orders, purchasing, and AI-powered replenishment.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Contact for pricing",
  },
  creator: {
    "@type": "Organization",
    name: "Actaer",
    url: siteConfig.url,
  },
  featureList: [
    "Inventory Management",
    "Sales Order Processing",
    "Purchase Order Management",
    "AI-Powered Replenishment",
    "Multi-warehouse Support",
    "Real-time Analytics",
  ],
};

// Breadcrumb JSON-LD
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Products", url: `${siteConfig.url}/products` },
  { name: "Vantum ERP", url: `${siteConfig.url}/products/vantum-erp` },
]);

// FAQ for AI crawlers - ERP specific questions
const faqJsonLd = generateFaqJsonLd([
  {
    question: "What is Vantum ERP?",
    answer:
      "Vantum ERP is a modern distribution ERP system designed for wholesalers, distributors, and retail chains. It features AI-powered smart replenishment, real-time inventory management across multiple warehouses, sales order processing, and purchase order management. Built with .NET 10, React 19, and PostgreSQL.",
  },
  {
    question: "How is Vantum ERP different from legacy ERP systems?",
    answer:
      "Unlike legacy ERPs that take 6-18 months to implement and charge per-seat fees, Vantum ERP can be implemented in weeks, offers unlimited users, features a modern user interface, uses cloud-native modular architecture, and provides continuous deployment updates.",
  },
  {
    question: "What industries is Vantum ERP designed for?",
    answer:
      "Vantum ERP is specifically designed for distribution businesses including wholesalers, distributors, retail chains, and 3PL (third-party logistics) providers who need modern inventory management and order processing capabilities.",
  },
  {
    question: "Does Vantum ERP support multiple warehouses?",
    answer:
      "Yes, Vantum ERP provides real-time stock visibility across unlimited warehouses with features like lot tracking, serial numbers, and bin location management.",
  },
  {
    question: "What is AI-powered replenishment in Vantum ERP?",
    answer:
      "Vantum ERP's Smart Replenishment module uses AI to calculate optimal reorder points, automatically generate purchase orders based on sales velocity, make seasonal adjustments, and maintain safety stock calculations.",
  },
]);

export default async function VantumERPPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "vantumErpPage" });

  const modules = [
    {
      icon: Package,
      title: t("modules.inventory.title"),
      description: t("modules.inventory.description"),
      features: [
        t("modules.inventory.features.multiWarehouse"),
        t("modules.inventory.features.lotTracking"),
        t("modules.inventory.features.binLocation"),
        t("modules.inventory.features.realTimeStock"),
        t("modules.inventory.features.adjustments"),
      ],
    },
    {
      icon: ShoppingCart,
      title: t("modules.sales.title"),
      description: t("modules.sales.description"),
      features: [
        t("modules.sales.features.quoteManagement"),
        t("modules.sales.features.orderProcessing"),
        t("modules.sales.features.realTimeAvailability"),
        t("modules.sales.features.autoReservations"),
        t("modules.sales.features.shippingIntegration"),
      ],
    },
    {
      icon: Truck,
      title: t("modules.purchasing.title"),
      description: t("modules.purchasing.description"),
      features: [
        t("modules.purchasing.features.vendorManagement"),
        t("modules.purchasing.features.purchaseOrders"),
        t("modules.purchasing.features.leadTimeTracking"),
        t("modules.purchasing.features.costAnalysis"),
        t("modules.purchasing.features.receivingWorkflow"),
      ],
    },
    {
      icon: Brain,
      title: t("modules.replenishment.title"),
      description: t("modules.replenishment.description"),
      features: [
        t("modules.replenishment.features.aiForecasting"),
        t("modules.replenishment.features.reorderOptimization"),
        t("modules.replenishment.features.autoPoGeneration"),
        t("modules.replenishment.features.seasonalAdjustments"),
        t("modules.replenishment.features.safetyStock"),
      ],
    },
  ];

  const comparison = [
    {
      feature: t("comparison.implementationTime"),
      legacy: t("comparison.legacyImplementation"),
      vantum: t("comparison.vantumImplementation"),
    },
    {
      feature: t("comparison.licensingModel"),
      legacy: t("comparison.legacyLicensing"),
      vantum: t("comparison.vantumLicensing"),
    },
    {
      feature: t("comparison.customization"),
      legacy: t("comparison.legacyCustomization"),
      vantum: t("comparison.vantumCustomization"),
    },
    {
      feature: t("comparison.userExperience"),
      legacy: t("comparison.legacyUx"),
      vantum: t("comparison.vantumUx"),
    },
    {
      feature: t("comparison.architecture"),
      legacy: t("comparison.legacyArchitecture"),
      vantum: t("comparison.vantumArchitecture"),
    },
    {
      feature: t("comparison.updates"),
      legacy: t("comparison.legacyUpdates"),
      vantum: t("comparison.vantumUpdates"),
    },
  ];

  const techStack = [
    { name: ".NET 10", category: t("techStack.backend") },
    { name: "React 19", category: t("techStack.frontend") },
    { name: "PostgreSQL", category: t("techStack.database") },
    { name: "Kafka", category: t("techStack.events") },
    { name: "Redis", category: t("techStack.caching") },
    { name: "REST API", category: t("techStack.integration") },
  ];

  const techFeatures = [
    {
      title: t("techStack.features.subSecond.title"),
      description: t("techStack.features.subSecond.description"),
    },
    {
      title: t("techStack.features.security.title"),
      description: t("techStack.features.security.description"),
    },
    {
      title: t("techStack.features.api.title"),
      description: t("techStack.features.api.description"),
    },
  ];

  const metrics = [
    { value: "10x", label: t("metrics.fasterImplementation") },
    { value: "100%", label: t("metrics.apiCoverage") },
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
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
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
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("heroTitle")}
                </span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                  {t("heroSubtitle")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a
                    href="https://vantumerp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("visitVantum")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{t("requestDemo")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8">
              {metrics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Modules */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("modules.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("modules.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {modules.map((module, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-heading">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("comparison.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("comparison.description")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">
                          {t("comparison.feature")}
                        </th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">
                          {t("comparison.legacyErp")}
                        </th>
                        <th className="text-center p-4 font-semibold text-primary">
                          {t("comparison.vantumErp")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((row, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-4 font-medium">{row.feature}</td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <XCircle className="w-4 h-4 text-destructive" />
                              {row.legacy}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              {row.vantum}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {t("techStack.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("techStack.description")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-background border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium">{tech.name}</span>
                  <span className="text-muted-foreground ml-2 text-sm">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              {techFeatures.map((item, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">
                  {t("faq.badge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  {t("faq.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("faq.description")}
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("faq.q1.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q1.answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("faq.q2.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q2.answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("faq.q3.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q3.answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>{t("faq.q4.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q4.answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>{t("faq.q5.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q5.answer")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>{t("faq.q6.question")}</AccordionTrigger>
                  <AccordionContent>{t("faq.q6.answer")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {t("cta.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a
                    href="https://vantumerp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("cta.learnMore")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    {t("cta.contactSales")}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
