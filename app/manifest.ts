import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} - Software Products & AI Consulting`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "technology", "software", "consulting"],
  };
}
