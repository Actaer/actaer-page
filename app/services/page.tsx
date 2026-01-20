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
import { ArrowRight, Lightbulb, Code2, Rocket } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Services",
  description:
    "Comprehensive tech solutions including IT consulting, custom software development, and product development to power your digital transformation.",
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

export default function ServicesPage() {
  return (
    <>
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
