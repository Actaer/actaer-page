import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Enable compression
  compress: true,

  // Power performance optimizations
  poweredByHeader: false,

  // Security headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Redirects for common mistyped URLs
  async redirects() {
    const legacyMap = [
      { from: "/services", to: "/consulting" },
      { from: "/services/it-consulting", to: "/consulting/ai-consulting" },
      { from: "/services/software-development", to: "/consulting/software-development" },
      { from: "/services/product-development", to: "/consulting/digital-modernization" },
      { from: "/products/vantum-erp", to: "/products/vantumiqp" },
    ];
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/service/:slug", destination: "/consulting", permanent: true },
      ...legacyMap.flatMap(({ from, to }) => [
        { source: from, destination: to, permanent: true },
        {
          source: `/:locale(en|sr|de|es|pt|pl)${from}`,
          destination: `/:locale${to}`,
          permanent: true,
        },
      ]),
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));
