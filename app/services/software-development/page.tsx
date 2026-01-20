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
  title: "Custom Software Development",
  description:
    "End-to-end software development services. Front-end, back-end, AI/ML, enterprise solutions, and real-time communication platforms.",
});

const developmentServices = [
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    description:
      "Complete front-end and back-end development services to build robust, scalable applications from the ground up.",
    benefits: [
      "Modern React, Angular, or Vue.js frontends",
      "Node.js, .NET, or Java backends",
      "RESTful APIs and GraphQL",
      "Microservices architecture",
      "CI/CD pipeline setup",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description:
      "Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent applications.",
    benefits: [
      "Custom ML model development",
      "Natural Language Processing (NLP)",
      "Computer vision solutions",
      "Predictive analytics",
      "AI integration and deployment",
    ],
  },
  {
    id: "agentic",
    title: "Autonomous & Agentic Systems",
    description:
      "Build intelligent autonomous agents and systems that can reason, plan, and execute complex tasks independently.",
    benefits: [
      "LLM-powered agents",
      "Multi-agent orchestration",
      "Tool use and function calling",
      "Retrieval-augmented generation (RAG)",
      "Workflow automation",
    ],
  },
  {
    id: "realtime",
    title: "Real-Time Platforms",
    description:
      "High-performance real-time communication and collaboration platforms for modern connected experiences.",
    benefits: [
      "WebSocket and WebRTC implementation",
      "Chat and messaging systems",
      "Live collaboration features",
      "Push notification systems",
      "Event-driven architectures",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description:
      "Scalable, secure enterprise software that handles complex business logic and integrates with your existing systems.",
    benefits: [
      "ERP and CRM systems",
      "Business process automation",
      "Legacy system integration",
      "Enterprise security compliance",
      "High availability design",
    ],
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4">
                Software Development
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Custom Software{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Built Right
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                From concept to deployment, we build software solutions tailored
                to your unique business requirements using cutting-edge
                technologies.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project
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
                      <h4 className="font-semibold mb-4">What We Deliver:</h4>
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
                Technologies We Master
              </h2>
              <p className="text-lg text-muted-foreground">
                We use the right tool for every job, with deep expertise across
                modern technology stacks.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  category: "Frontend",
                  techs: ["React", "Next.js", "Angular", "TypeScript"],
                },
                {
                  category: "Backend",
                  techs: ["Node.js", ".NET", "Python", "Java"],
                },
                {
                  category: "Database",
                  techs: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
                },
                {
                  category: "DevOps",
                  techs: ["Docker", "Kubernetes", "AWS", "Azure"],
                },
              ].map((item, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {item.techs.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
                Have a Project in Mind?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let&apos;s discuss your requirements and build something amazing
                together.
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
