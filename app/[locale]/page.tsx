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

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
