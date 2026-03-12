import { Header, Footer } from "@/components/layout";
import {
  Hero,
  About,
  ServicesGrid,
  TechStack,
  Workflow,
  CtaSection,
} from "@/components/sections";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd, generateSpeakableJsonLd } from "@/lib/seo";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const url = `${siteConfig.url}/${locale}`;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([{ name: "Home", url }]);
  const speakableJsonLd = generateSpeakableJsonLd({ url });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <ServicesGrid />
        <TechStack />
        <Workflow />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
