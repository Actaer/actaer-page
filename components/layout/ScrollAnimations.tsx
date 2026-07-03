"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { usePathname } from "@/i18n/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

// Carbon productive-entrance curve: cubic-bezier(0, 0, 0.38, 0.9)
const entrance = CustomEase.create("carbonEntrance", "0, 0, 0.38, 0.9");

const OFFSET_Y = 24;
const DURATION = 0.6;
const STAGGER = 0.09;

/**
 * Global animator: reveals elements marked with data attributes.
 * - [data-hero]         staggered entrance on page load (no ScrollTrigger)
 * - [data-reveal]       fade + rise when scrolled into view, once
 * - [data-reveal-group] children fade + rise with stagger, once
 * Content is never hidden by CSS — without JS everything stays visible.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const heroes = gsap.utils.toArray<HTMLElement>("[data-hero]");
      if (heroes.length > 0) {
        gsap.from(heroes, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          stagger: STAGGER,
          clearProps: "all",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          y: OFFSET_Y,
          autoAlpha: 0,
          duration: DURATION,
          ease: entrance,
          stagger: STAGGER,
          clearProps: "all",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    },
    // Re-run on client-side navigation; revert old tweens/ScrollTriggers first.
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
