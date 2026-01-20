"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: ".NET", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Elasticsearch", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".tech-header",
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
        ".tech-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="tech-header text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Technology Stack
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Built with{" "}
            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Modern Technologies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We leverage cutting-edge tools and frameworks to build scalable,
            maintainable, and high-performance solutions.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="tech-item group relative px-4 py-2 md:px-6 md:py-3 rounded-full bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
            >
              <span className="font-medium text-sm md:text-base">
                {tech.name}
              </span>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {tech.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
