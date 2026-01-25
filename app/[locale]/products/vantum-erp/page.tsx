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
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "Vantum ERP - Distribution ERP, Reimagined",
    description:
      "Modern distribution ERP for wholesalers, distributors, and retail chains. Inventory management, sales orders, purchasing, and AI-powered replenishment.",
    canonical: `${siteConfig.url}/${locale}/products/vantum-erp`,
    locale,
    path: "/products/vantum-erp",
  });
}

const modules = [
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time stock visibility across unlimited warehouses with lot tracking, serial numbers, and bin locations.",
    features: [
      "Multi-warehouse support",
      "Lot and serial tracking",
      "Bin location management",
      "Real-time stock levels",
      "Inventory adjustments",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Sales Orders",
    description:
      "Complete quote-to-cash workflow with real-time availability checks and automatic inventory reservation.",
    features: [
      "Quote management",
      "Order processing",
      "Real-time availability",
      "Automatic reservations",
      "Shipping integration",
    ],
  },
  {
    icon: Truck,
    title: "Purchasing",
    description:
      "Streamlined vendor management with PO automation, lead time tracking, and cost analysis.",
    features: [
      "Vendor management",
      "Purchase orders",
      "Lead time tracking",
      "Cost analysis",
      "Receiving workflow",
    ],
  },
  {
    icon: Brain,
    title: "Smart Replenishment",
    description:
      "AI-assisted reorder point calculations with automatic PO generation based on sales velocity.",
    features: [
      "AI demand forecasting",
      "Reorder point optimization",
      "Auto PO generation",
      "Seasonal adjustments",
      "Safety stock calculations",
    ],
  },
];

const comparison = [
  {
    feature: "Implementation Time",
    legacy: "6-18 months",
    vantum: "Weeks, not months",
  },
  {
    feature: "Licensing Model",
    legacy: "Per-seat fees",
    vantum: "Unlimited users",
  },
  {
    feature: "Customization",
    legacy: "Consultants required",
    vantum: "Self-service config",
  },
  {
    feature: "User Experience",
    legacy: "Decade-old UX",
    vantum: "Modern interface",
  },
  {
    feature: "Architecture",
    legacy: "Monolithic",
    vantum: "Modular, cloud-native",
  },
  {
    feature: "Updates",
    legacy: "Annual releases",
    vantum: "Continuous deployment",
  },
];

const techStack = [
  { name: ".NET 10", category: "Backend" },
  { name: "React 19", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Kafka", category: "Events" },
  { name: "Redis", category: "Caching" },
  { name: "REST API", category: "Integration" },
];

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
                Enterprise Product
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Vantum ERP
                </span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                  Distribution ERP, Reimagined
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                ERP without the legacy baggage. Built for modern wholesalers,
                distributors, retail chains, and 3PL providers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a
                    href="https://vantumerp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Vantum ERP
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10x", label: "Faster Implementation" },
                { value: "100%", label: "API Coverage" },
                { value: "0", label: "Hidden Fees" },
                { value: "∞", label: "Users Included" },
              ].map((stat, index) => (
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
                Four Powerful Modules
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to manage your distribution business, in one
                integrated platform.
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
                Legacy ERP vs Vantum
              </h2>
              <p className="text-lg text-muted-foreground">
                See why modern businesses are choosing Vantum over traditional
                ERP systems.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold text-muted-foreground">
                          Legacy ERP
                        </th>
                        <th className="text-center p-4 font-semibold text-primary">
                          Vantum ERP
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
                Enterprise-Grade Architecture
              </h2>
              <p className="text-lg text-muted-foreground">
                Built on modern, proven technologies for reliability,
                performance, and security.
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
              {[
                {
                  title: "Sub-second Response",
                  description:
                    "Optimized queries and caching for blazing-fast performance.",
                },
                {
                  title: "Enterprise Security",
                  description:
                    "RBAC, audit logging, and encryption at rest and in transit.",
                },
                {
                  title: "100% API Coverage",
                  description:
                    "Full REST API access for seamless integrations.",
                },
              ].map((item, index) => (
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
                  FAQ
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about Vantum ERP
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Vantum ERP?</AccordionTrigger>
                  <AccordionContent>
                    Vantum ERP is a modern distribution ERP system designed
                    specifically for wholesalers, distributors, retail chains,
                    and 3PL providers. It features AI-powered inventory
                    replenishment, real-time analytics, and 100% API
                    coverage—all without the complexity of legacy ERP systems.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How is Vantum ERP different from traditional ERP systems?
                  </AccordionTrigger>
                  <AccordionContent>
                    Unlike legacy ERPs that require extensive customization and
                    long implementation cycles, Vantum ERP is built with modern
                    cloud-native architecture. It offers 10x faster
                    implementation, unlimited users with no per-seat licensing,
                    zero hidden fees, and AI-native features out of the box.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What industries does Vantum ERP serve?
                  </AccordionTrigger>
                  <AccordionContent>
                    Vantum ERP is optimized for distribution-focused businesses
                    including wholesale distributors, retail chains with
                    multiple locations, 3PL (third-party logistics) providers,
                    and any business managing complex inventory across multiple
                    warehouses.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Does Vantum ERP include AI features?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! Vantum ERP includes AI-powered inventory replenishment
                    that analyzes sales patterns, seasonality, and lead times to
                    automatically generate optimal purchase suggestions. This
                    helps reduce stockouts while minimizing excess inventory.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How can I get started with Vantum ERP?
                  </AccordionTrigger>
                  <AccordionContent>
                    We&apos;re currently accepting enterprises for our 2026
                    pilot program. Visit{" "}
                    <a
                      href="https://vantumerp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      vantumerp.com
                    </a>{" "}
                    for more information or{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      contact our sales team
                    </Link>{" "}
                    to schedule a demo.
                  </AccordionContent>
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
                Limited Pilot Program
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Join the 2026 Pilot Program
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re accepting a limited number of enterprises for our
                pilot program. Get early access and shape the future of
                distribution ERP.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <a
                    href="https://vantumerp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More at vantumerp.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Contact Sales
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
