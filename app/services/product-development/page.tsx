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
import { ArrowRight, CheckCircle } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
  generateHowToJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Product Development",
  description:
    "End-to-end product development from ideation to launch. Prototyping, MVP development, user-centric design, and ongoing support.",
  canonical: `${siteConfig.url}/services/product-development`,
});

const phases = [
  {
    number: "01",
    title: "Conceptualization & Ideation",
    description:
      "We work with you to define your product vision, identify target users, and validate market fit before writing a single line of code.",
    deliverables: [
      "Product vision document",
      "User personas and journey maps",
      "Competitive analysis",
      "Feature prioritization",
    ],
  },
  {
    number: "02",
    title: "Prototyping & Design",
    description:
      "Transform ideas into tangible prototypes with user-centric design that balances aesthetics with functionality.",
    deliverables: [
      "Interactive prototypes",
      "UI/UX design system",
      "User testing feedback",
      "Design handoff documentation",
    ],
  },
  {
    number: "03",
    title: "MVP Development",
    description:
      "Build a minimum viable product quickly to validate assumptions and gather real user feedback.",
    deliverables: [
      "Core feature implementation",
      "Scalable architecture",
      "Basic analytics integration",
      "Deployment infrastructure",
    ],
  },
  {
    number: "04",
    title: "Iteration & Enhancement",
    description:
      "Continuously improve based on user feedback, adding features and optimizing performance.",
    deliverables: [
      "Feature roadmap execution",
      "Performance optimization",
      "A/B testing framework",
      "Advanced analytics",
    ],
  },
  {
    number: "05",
    title: "Launch & Scale",
    description:
      "Go to market with confidence and scale your product to meet growing demand.",
    deliverables: [
      "Production deployment",
      "Load testing and optimization",
      "Monitoring and alerting",
      "Scale infrastructure",
    ],
  },
  {
    number: "06",
    title: "Support & Maintenance",
    description:
      "Ongoing support to keep your product running smoothly and evolving with your business.",
    deliverables: [
      "24/7 monitoring",
      "Bug fixes and updates",
      "Security patches",
      "Feature enhancements",
    ],
  },
];

// JSON-LD schemas
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Services", url: `${siteConfig.url}/services` },
  {
    name: "Product Development",
    url: `${siteConfig.url}/services/product-development`,
  },
]);

const serviceJsonLd = generateServiceJsonLd({
  name: "Product Development",
  description:
    "End-to-end product development from ideation to launch. Prototyping, MVP development, user-centric design, and ongoing support.",
  serviceType: "Product Development",
  url: `${siteConfig.url}/services/product-development`,
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

// FAQ for AI crawlers
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
]);

export default function ProductDevelopmentPage() {
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
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">
                Product Development
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                From Idea to{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Market Leader
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Complete product development lifecycle support, from initial
                concept through launch and beyond. We&apos;re your technical
                co-founder.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Product Journey
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
                Our Product Development Process
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven methodology that takes your product from concept to
                successful launch.
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
                      Deliverables:
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
                  Why Build Your Product with Actaer?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We&apos;ve helped startups and enterprises alike bring their
                  product visions to life. Here&apos;s what sets us apart.
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Technical Co-founder Mindset",
                      description:
                        "We think like owners, not just developers. Your success is our success.",
                    },
                    {
                      title: "Startup Speed, Enterprise Quality",
                      description:
                        "Move fast without sacrificing code quality or security.",
                    },
                    {
                      title: "Full Transparency",
                      description:
                        "Regular demos, open communication, and full access to your codebase.",
                    },
                    {
                      title: "Scale-Ready Architecture",
                      description:
                        "Build for today's users, ready for tomorrow's growth.",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 p-1">
                  <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl md:text-8xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                        MVP
                      </div>
                      <p className="text-muted-foreground">
                        Validated in Weeks, Not Months
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Ready to Build Your Product?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s turn your idea into a successful product. Schedule a
                free consultation to get started.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Schedule a Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">View All Services</Link>
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
