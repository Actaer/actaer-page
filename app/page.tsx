import { Header, Footer } from "@/components/layout";
import {
  Hero,
  About,
  ServicesGrid,
  TechStack,
  Workflow,
  CtaSection,
} from "@/components/sections";

export default function HomePage() {
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
