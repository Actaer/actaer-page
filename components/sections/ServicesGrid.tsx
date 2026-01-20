"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description:
      "Strategic technology guidance to drive digital transformation and optimize your IT infrastructure.",
    features: [
      "Digital Transformation Strategy",
      "Technical Due Diligence",
      "Team Augmentation",
      "Data-Driven Consulting",
    ],
    href: "/services/it-consulting",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Custom software solutions built with cutting-edge technologies to solve your unique challenges.",
    features: [
      "Full-Stack Engineering",
      "AI & Machine Learning",
      "Enterprise Solutions",
      "Real-Time Platforms",
    ],
    href: "/services/software-development",
  },
  {
    icon: Rocket,
    title: "Product Development",
    description:
      "End-to-end product creation from ideation to launch, with ongoing support and iteration.",
    features: [
      "Prototyping & MVP",
      "User-Centric Design",
      "Agile Development",
      "Launch & Scale",
    ],
    href: "/services/product-development",
  },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".services-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20 md:py-32" id="services">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Comprehensive Tech Solutions for{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From strategic consulting to hands-on development, we offer
            end-to-end services to power your digital transformation journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card group relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-heading">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="group/btn p-0">
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
