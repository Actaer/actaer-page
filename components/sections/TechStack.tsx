"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TechCategory =
  | "frontend"
  | "backend"
  | "language"
  | "database"
  | "devops"
  | "cloud";

const technologies: { name: string; category: TechCategory }[] = [
  { name: "React", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "language" },
  { name: "Node.js", category: "backend" },
  { name: ".NET", category: "backend" },
  { name: "Python", category: "language" },
  { name: "Java", category: "language" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Elasticsearch", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Docker", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("techStack");

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
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
            {t.rich("title", {
              highlighted: (chunks) => (
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
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
                {t(`categories.${tech.category}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
