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
  const t = await getTranslations({ locale, namespace: "about" });

  return constructMetadata({
    title: t("badge"),
    description:
      "Learn about Actaer - a full-service tech consulting firm transforming businesses into agile, software-powered innovators.",
    canonical: `${siteConfig.url}/${locale}/about`,
    locale,
    path: "/about",
  });
}

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We measure success by the impact we create for our clients, not by hours logged or lines of code written.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description:
      "Your success is our success. We build long-term partnerships based on trust, transparency, and mutual growth.",
  },
  {
    icon: Zap,
    title: "Innovation-Focused",
    description:
      "We stay at the forefront of technology, bringing cutting-edge solutions to solve your most challenging problems.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description:
      "We work as an extension of your team, fostering open communication and shared ownership of outcomes.",
  },
];

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
      "Actaer is a newly founded, full-service technology consulting firm based in Serbia that specializes in IT consulting, custom software development, and product development. We transform businesses into agile, software-powered innovators.",
  },
  {
    question: "Where is Actaer located?",
    answer:
      "Actaer is headquartered in Novi Pazar, Serbia. We serve clients globally and offer fully remote engagement models.",
  },
  {
    question: "What services does Actaer offer?",
    answer:
      "Actaer offers three main service categories: IT Consulting (digital transformation, technical due diligence, team augmentation), Custom Software Development (full-stack engineering, AI/ML solutions, enterprise systems), and Product Development (MVP development, UI/UX design, ongoing support).",
  },
  {
    question: "Why choose Actaer as a new consulting firm?",
    answer:
      "Although newly founded, Actaer is built by experienced engineers and consultants with proven track records in software development and IT consulting. We bring fresh perspectives, modern approaches, and dedicated focus to every client engagement.",
  },
  {
    question: "What is Vantum ERP?",
    answer:
      "Vantum ERP is Actaer's flagship product - a modern distribution ERP designed for wholesalers, distributors, and retail chains. It features AI-powered replenishment, real-time inventory management, and a modern cloud-native architecture.",
  },
]);

export default async function AboutPage({ params }: PageProps) {
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
          __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
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
                About Actaer
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Engineering{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Digital Success
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                We&apos;re a full-service tech consulting firm transforming
                businesses into agile, software-powered innovators. Technology
                is the key to unlocking your potential.
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
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Actaer was founded with a simple belief: technology should
                    be an enabler, not an obstacle. We saw too many businesses
                    struggling with outdated systems, failed software projects,
                    and technology that didn&apos;t serve their needs.
                  </p>
                  <p>
                    We set out to change that. Our founding team brings together
                    experience across enterprise software, startups, and
                    consulting. We&apos;ve seen what works, what doesn&apos;t,
                    and why most technology initiatives fail to deliver on their
                    promise.
                  </p>
                  <p>
                    As a new firm, we bring fresh perspectives and modern
                    approaches—unencumbered by legacy thinking. We partner with
                    businesses of all sizes to build software that actually
                    works, scales with your needs, and delivers real value.
                  </p>
                  <p>
                    Our first product, Vantum ERP, embodies everything we
                    believe about software: it&apos;s modern, user-friendly, and
                    built for how businesses actually operate today.
                  </p>
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
                        Engineering Excellence
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
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do.
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
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                To empower businesses with technology that actually works.
                We&apos;re on a mission to eliminate the gap between what
                technology promises and what it delivers.
              </p>
              <div className="inline-block p-8 rounded-2xl bg-background border">
                <blockquote className="text-lg italic">
                  &ldquo;Your Success, Engineered by ACTAER&rdquo;
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
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive technology services to power your business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "IT Consulting",
                  description:
                    "Strategic guidance for digital transformation, technical due diligence, and technology planning.",
                  href: "/services/it-consulting",
                },
                {
                  title: "Software Development",
                  description:
                    "Custom software solutions built with modern technologies to solve your unique challenges.",
                  href: "/services/software-development",
                },
                {
                  title: "Product Development",
                  description:
                    "End-to-end product creation from concept to launch, with ongoing support and iteration.",
                  href: "/services/product-development",
                },
              ].map((service, index) => (
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
                        Learn More
                        <span className="sr-only"> about {service.title}</span>
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
                Ready to Work Together?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s discuss how we can help transform your business with
                technology that delivers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">Explore Services</Link>
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
