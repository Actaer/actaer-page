import { Metadata } from "next";
import Link from "next/link";
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
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "IT Consulting",
  description:
    "Strategic technology guidance and digital transformation consulting. Project planning, technical due diligence, and data-driven consulting services.",
});

const consultingServices = [
  {
    id: "strategy",
    title: "Digital Transformation Strategy",
    description:
      "We help organizations navigate the complex digital landscape with clear, actionable strategies that align technology investments with business goals.",
    benefits: [
      "Technology roadmap development",
      "Legacy system modernization planning",
      "Cloud migration strategies",
      "Process automation opportunities",
      "Competitive analysis and benchmarking",
    ],
  },
  {
    id: "planning",
    title: "Project Specification & Planning",
    description:
      "Comprehensive project planning that ensures clear requirements, realistic timelines, and effective resource allocation for successful delivery.",
    benefits: [
      "Requirements gathering and analysis",
      "Technical specification documents",
      "Resource and timeline planning",
      "Risk assessment and mitigation",
      "Budget estimation and optimization",
    ],
  },
  {
    id: "due-diligence",
    title: "Technical Due Diligence",
    description:
      "In-depth technical assessments for mergers, acquisitions, or major technology investments to identify risks and opportunities.",
    benefits: [
      "Code quality and architecture review",
      "Security vulnerability assessment",
      "Scalability and performance analysis",
      "Technical debt evaluation",
      "Team capability assessment",
    ],
  },
  {
    id: "augmentation",
    title: "Team Augmentation",
    description:
      "Scale your development capacity with experienced professionals who integrate seamlessly with your existing teams.",
    benefits: [
      "Senior developers and architects",
      "Specialized skill sets on demand",
      "Flexible engagement models",
      "Knowledge transfer included",
      "Managed onboarding process",
    ],
  },
  {
    id: "data",
    title: "Data-Driven Consulting",
    description:
      "Leverage the power of data to make informed decisions with our analytics and business intelligence consulting services.",
    benefits: [
      "Data strategy development",
      "Analytics platform selection",
      "KPI definition and tracking",
      "Data governance frameworks",
      "Predictive analytics implementation",
    ],
  },
];

export default function ITConsultingPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">
                IT Consulting
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Strategic Technology{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Guidance
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Navigate the complex digital landscape with expert consulting
                services that align technology investments with your business
                objectives.
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

        {/* Services Tabs */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="strategy" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-8">
                {consultingServices.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {consultingServices.map((service) => (
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
                        What You&apos;ll Get:
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

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Why Choose Actaer for IT Consulting?
              </h2>
              <p className="text-lg text-muted-foreground">
                We bring decades of combined experience across industries to
                help you make the right technology decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Industry Experience",
                  description:
                    "Deep expertise across finance, healthcare, e-commerce, and enterprise sectors.",
                },
                {
                  title: "Vendor Neutral",
                  description:
                    "We recommend solutions based on your needs, not vendor partnerships.",
                },
                {
                  title: "Actionable Insights",
                  description:
                    "Clear, implementable recommendations with defined success metrics.",
                },
              ].map((item, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
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
                Ready to Start Your Digital Transformation?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s discuss your challenges and explore how our
                consulting services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get Started
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
