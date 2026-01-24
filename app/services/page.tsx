import { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = constructMetadata({
  title: "Services",
  description:
    "Comprehensive tech solutions including IT consulting, custom software development, and product development to power your digital transformation.",
  canonical: `${siteConfig.url}/services`,
});

const services = [
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description:
      "Strategic technology guidance and digital transformation consulting to help you make informed decisions and optimize your IT infrastructure.",
    features: [
      "Project Specification & Planning",
      "Digital Transformation Strategy",
      "Technical Due Diligence & Risk Analysis",
      "Team Augmentation & Scalability",
      "Data Driven Consulting",
    ],
    href: "/services/it-consulting",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "End-to-end software development services tailored to your unique business requirements, built with cutting-edge technologies.",
    features: [
      "Front-end & Back-end Engineering",
      "AI & Machine Learning Solutions",
      "Autonomous & Agentic Systems",
      "Real-Time Communication Platforms",
      "Enterprise-Grade Software Solutions",
    ],
    href: "/services/software-development",
  },
  {
    icon: Rocket,
    title: "Product Development",
    description:
      "Complete product development lifecycle from ideation to launch, with ongoing support and continuous improvement.",
    features: [
      "Conceptualization & Prototyping",
      "User-Centric Design",
      "MVP Development & Iteration",
      "Seamless Deployment & Integration",
      "Ongoing Support & Maintenance",
    ],
    href: "/services/product-development",
  },
];

// JSON-LD schemas
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Services", url: `${siteConfig.url}/services` },
]);

const serviceListJsonLd = generateServiceListJsonLd(
  services.map((service) => ({
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}${service.href}`,
  })),
);

export default function ServicesPage() {
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
                Our Services
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Comprehensive Solutions for{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Digital Success
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                From strategic consulting to hands-on development, we offer
                end-to-end services to power your digital transformation
                journey.
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
                      <h4 className="font-semibold mb-4">Key Offerings:</h4>
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
                          Learn More
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
                  FAQ
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Common Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Answers to frequently asked questions about our services
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I know which service is right for my business?
                  </AccordionTrigger>
                  <AccordionContent>
                    It depends on your current stage. If you&apos;re exploring
                    options or need strategic guidance, start with{" "}
                    <strong>IT Consulting</strong>. If you have clear
                    requirements and need implementation,{" "}
                    <strong>Software Development</strong> is the way to go. If
                    you&apos;re building a new product from scratch, our{" "}
                    <strong>Product Development</strong> service covers the
                    entire journey from idea to launch.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    What technologies does Actaer work with?
                  </AccordionTrigger>
                  <AccordionContent>
                    We work with modern, enterprise-grade technologies including
                    React, Next.js, Vue.js for frontends; Node.js, .NET, and
                    Java for backends; PostgreSQL, MongoDB, and Redis for data;
                    and cloud platforms like AWS, Azure, and GCP. We also
                    specialize in AI/ML solutions using the latest frameworks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How long does a typical project take?
                  </AccordionTrigger>
                  <AccordionContent>
                    Project timelines vary based on scope. A consulting
                    engagement might take 2-4 weeks, while a custom software
                    project could range from 2-6 months. Full product
                    development typically spans 4-12 months. We&apos;ll provide
                    a detailed timeline during our initial consultation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Do you offer ongoing support after project completion?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! We offer various support and maintenance packages
                    including bug fixes, performance monitoring, feature
                    updates, and 24/7 critical support. We believe in long-term
                    partnerships, not just one-time projects.
                  </AccordionContent>
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
                Not Sure Which Service You Need?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s have a conversation about your challenges. We&apos;ll
                help you find the right solution for your business.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Schedule a Consultation
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
