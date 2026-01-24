"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Palette,
  Cog,
  CheckCircle,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StepKey =
  | "planning"
  | "design"
  | "implementation"
  | "verification"
  | "maintenance";

const stepConfigs: {
  icon: typeof ClipboardList;
  number: string;
  key: StepKey;
}[] = [
  { icon: ClipboardList, number: "01", key: "planning" },
  { icon: Palette, number: "02", key: "design" },
  { icon: Cog, number: "03", key: "implementation" },
  { icon: CheckCircle, number: "04", key: "verification" },
  { icon: Headphones, number: "05", key: "maintenance" },
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("workflow");

  const steps = stepConfigs.map((config) => ({
    ...config,
    title: t(`steps.${config.key}.title`),
    description: t(`steps.${config.key}.description`),
  }));

  useGSAP(
    () => {
      gsap.fromTo(
        ".workflow-header",
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

      // Animate each step on scroll
      stepConfigs.forEach((_, index) => {
        gsap.fromTo(
          `.workflow-step-${index}`,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.workflow-step-${index}`,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Animate the connecting line
      gsap.fromTo(
        ".workflow-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".workflow-steps",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20 md:py-32" id="workflow">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="workflow-header text-center max-w-3xl mx-auto mb-16">
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

        {/* Workflow Steps */}
        <div className="workflow-steps relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="workflow-line w-full h-full bg-linear-to-b from-primary via-purple-500 to-pink-500 origin-top" />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`workflow-step-${index} relative flex items-center gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div
                  className={`inline-block ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-2 ${
                      index % 2 === 0
                        ? "md:flex-row-reverse md:justify-start"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-mono text-primary">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold font-heading">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Icon circle */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
