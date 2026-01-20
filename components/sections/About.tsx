"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".about-stat",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "30+", label: "Happy Clients" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-muted/30"
      id="about"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="about-content">
            <Badge variant="outline" className="mb-4">
              About Actaer
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
              Solving Demanding Business Problems with{" "}
              <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Smart Technology
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Actaer, we believe technology is the key to unlocking your
              business potential. Our team of experienced consultants and
              engineers work together to transform your vision into reliable,
              scalable software solutions.
            </p>
            <p className="text-muted-foreground mb-8">
              From strategic IT consulting to full-scale product development, we
              partner with businesses of all sizes to navigate the complex
              digital landscape. Our agile approach ensures we deliver value at
              every step of the journey.
            </p>

            {/* Stats */}
            <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat text-center">
                  <div className="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="about-content relative">
            <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 p-1">
              <div className="w-full h-full rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl md:text-8xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
                    A
                  </div>
                  <p className="text-muted-foreground">
                    Engineering Excellence Since Day One
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
