import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

// AI crawlers we explicitly welcome (current user-agent tokens, mid-2026).
// Search/citation bots make the site quotable in AI answers; training bots
// are allowed as a deliberate policy choice for brand presence in models.
const aiCrawlers = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini training opt-in; AI Overviews uses regular Googlebot)
  "Google-Extended",
  // Apple (Siri/Spotlight + Apple Intelligence training)
  "Applebot",
  "Applebot-Extended",
  // Others
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Never disallow /_next/ — Googlebot needs the CSS/JS assets to render
        disallow: ["/api/"],
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
