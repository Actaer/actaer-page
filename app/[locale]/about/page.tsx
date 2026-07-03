import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHero, Section, Eyebrow, ArrowLink, CtaBanner } from "@/components/carbon";
import { Target, Heart, Zap, Users } from "lucide-react";
import { constructMetadata, siteConfig, localizedUrl } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateAboutPageJsonLd,
  generateFaqJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
import { type Locale } from "@/i18n/config";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: localizedUrl(locale, "/about"),
    locale,
    path: "/about",
  });
}

const valueIcons = [Target, Heart, Zap, Users];

// JSON-LD schemas for AI discoverability
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "About", url: `${siteConfig.url}/about` },
]);

const aboutPageJsonLd = generateAboutPageJsonLd();

// FAQ for AI crawlers and featured snippets
const faqJsonLd = generateFaqJsonLd([
  {
    question: "What is Actaer?",
    answer:
      "We are a software product company based in Novi Pazar, Serbia. We build VantumIQP, a governed business-intelligence workspace, and FaberPDF, a local-first PDF editor, and we run a consulting practice for AI, software development, and digital modernization.",
  },
  {
    question: "Where is Actaer located?",
    answer:
      "Our headquarters are in Novi Pazar, Serbia. We serve clients globally and offer fully remote engagement models.",
  },
  {
    question: "What services does the company offer?",
    answer:
      "Alongside our products VantumIQP and FaberPDF, our consulting practice covers three areas: AI Consulting (AI strategy, adoption, and automation), Software Development (full-stack engineering, enterprise integrations, real-time platforms), and Digital Modernization (legacy assessment, process digitization, pragmatic technology adoption).",
  },
  {
    question: "Why choose Actaer?",
    answer:
      "We are a product company with a consulting practice: the same senior engineers who build and ship VantumIQP and FaberPDF work on client engagements, bringing proven engineering standards, modern approaches, and dedicated focus to every project.",
  },
]);

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const speakableJsonLd = generateSpeakableJsonLd({
    url: localizedUrl(locale, "/about"),
  });

  const values = [
    {
      icon: valueIcons[0],
      title: t("values.resultsDriven.title"),
      description: t("values.resultsDriven.description"),
    },
    {
      icon: valueIcons[1],
      title: t("values.clientCentric.title"),
      description: t("values.clientCentric.description"),
    },
    {
      icon: valueIcons[2],
      title: t("values.innovationFocused.title"),
      description: t("values.innovationFocused.description"),
    },
    {
      icon: valueIcons[3],
      title: t("values.collaborative.title"),
      description: t("values.collaborative.description"),
    },
  ];

  const services = [
    {
      title: t("whatWeDo.itConsulting.title"),
      description: t("whatWeDo.itConsulting.description"),
      href: "/consulting/ai-consulting",
    },
    {
      title: t("whatWeDo.softwareDevelopment.title"),
      description: t("whatWeDo.softwareDevelopment.description"),
      href: "/consulting/software-development",
    },
    {
      title: t("whatWeDo.productDevelopment.title"),
      description: t("whatWeDo.productDevelopment.description"),
      href: "/consulting/digital-modernization",
    },
  ];

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
          __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
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
        <PageHero
          eyebrow={t("badge")}
          title={t("heroTitle")}
          description={t("heroDescription")}
        />

        {/* Story Section */}
        <Section band="muted">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center" data-reveal="">
            <div>
              <h2 className="text-display-md mb-6">{t("story.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t("story.paragraph1")}</p>
                <p>{t("story.paragraph2")}</p>
                <p>{t("story.paragraph3")}</p>
                <p>{t("story.paragraph4")}</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("founded")}
              </p>
              <div className="mt-4 flex gap-4">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm underline underline-offset-2"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm underline underline-offset-2"
                >
                  X (Twitter)
                </a>
              </div>
            </div>

            <div className="flex aspect-square items-center justify-center border border-border bg-background">
              <div className="p-8 text-center">
                <div className="text-display-xl text-primary mb-4">A</div>
                <p className="text-body-lg font-semibold">Actaer</p>
                <p className="text-sm text-muted-foreground">
                  {t("story.tagline")}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Values Section */}
        <Section>
          <div className="mb-12 max-w-3xl space-y-4" data-reveal="">
            <Eyebrow>{t("values.title")}</Eyebrow>
            <h2 className="text-display-md">{t("values.description")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group="">
            {values.map((value, index) => (
              <div
                key={index}
                className="-mt-px -ml-px space-y-3 border border-border bg-background p-6"
              >
                <value.icon className="size-6 text-primary" />
                <h3 className="text-body-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Mission Section */}
        <Section band="muted">
          <div className="max-w-3xl space-y-6" data-reveal="">
            <Eyebrow>{t("mission.title")}</Eyebrow>
            <h2 className="text-display-md">{t("mission.description")}</h2>
            <div className="border border-border bg-background p-8">
              <blockquote className="border-l-2 border-primary pl-6 text-body-lg">
                &ldquo;{t("mission.quote")}&rdquo;
              </blockquote>
            </div>
          </div>
        </Section>

        {/* What We Do Section */}
        <Section>
          <div className="mb-12 max-w-3xl space-y-4" data-reveal="">
            <Eyebrow>{t("whatWeDo.title")}</Eyebrow>
            <h2 className="text-display-md">{t("whatWeDo.description")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" data-reveal-group="">
            {services.map((service, index) => (
              <div
                key={index}
                className="-mt-px -ml-px flex flex-col gap-3 border border-border bg-background p-6"
              >
                <h3 className="text-body-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-auto pt-2">
                  <ArrowLink href={service.href}>
                    {t("whatWeDo.learnMore")}
                    <span className="sr-only"> {service.title}</span>
                  </ArrowLink>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <CtaBanner
          title={t("cta.title")}
          description={t("cta.description")}
          ctaLabel={t("cta.getInTouch")}
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
