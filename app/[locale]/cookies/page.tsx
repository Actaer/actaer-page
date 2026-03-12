import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPage" });
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/cookies`,
    locale,
    path: "/cookies",
  });
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cookiesPage");

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/cookies` },
  ]);

  const cookieFaqJsonLd = generateFaqJsonLd([
    {
      question: "What are cookies?",
      answer:
        "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site.",
    },
    {
      question: "Can I disable cookies on actaer.com?",
      answer:
        "Yes, you can manage your cookie preferences at any time by clicking the Cookie Settings link in the website footer. You can also control cookies through your browser settings.",
    },
    {
      question: "What third-party cookies does Actaer use?",
      answer:
        "Actaer uses Vercel Analytics for web performance insights and Microsoft Clarity for session recordings and heatmaps to improve user experience.",
    },
    {
      question: "Are essential cookies required?",
      answer:
        "Yes, essential cookies are necessary for the website to function properly. They enable basic functions like page navigation, security features, and access to secure areas. They cannot be switched off.",
    },
  ]);

  const speakableJsonLd = generateSpeakableJsonLd({
    url: `${siteConfig.url}/${locale}/cookies`,
  });

  const cookieTypes = [
    {
      key: "essential",
      examples: ["session_id", "csrf_token", "cookie_consent"],
    },
    {
      key: "functional",
      examples: ["language_preference", "theme_preference"],
    },
    {
      key: "analytics",
      examples: ["_clarity", "_vercel_analytics"],
    },
    {
      key: "marketing",
      examples: ["_gcl_au", "_fbp"],
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
          __html: JSON.stringify(cookieFaqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">
              {t("lastUpdated", { date: "January 24, 2026" })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("intro")}
              </p>
              <p className="text-sm text-muted-foreground">
                This policy is maintained by the Actaer engineering and legal
                team, specialists in web privacy and compliance.
              </p>
            </section>

            <Separator className="my-8" />

            {/* What Are Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.whatAreCookies.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.whatAreCookies.description")}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.types.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("sections.types.description")}
              </p>

              <div className="space-y-6">
                {cookieTypes.map((type) => (
                  <div key={type.key} className="rounded-lg border bg-card p-4">
                    <h3 className="font-semibold mb-2">
                      {t(`sections.types.${type.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t(`sections.types.${type.key}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example) => (
                        <code
                          key={example}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {example}
                        </code>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Managing Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.managing.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("sections.managing.description")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.managing.browserSettings")}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Third-Party Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.thirdParty.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("sections.thirdParty.description")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Vercel Analytics</strong> -{" "}
                  {t("sections.thirdParty.vercel")} (
                  <a
                    href="https://vercel.com/docs/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Learn more
                  </a>
                  )
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> -{" "}
                  {t("sections.thirdParty.clarity")} (
                  <a
                    href="https://clarity.microsoft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Learn more
                  </a>
                  )
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Microsoft Clarity is used by over 1 million websites worldwide
                for privacy-friendly user behavior analytics.
              </p>
            </section>

            <Separator className="my-8" />

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t("sections.contact.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("sections.contact.description")}{" "}
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {siteConfig.links.email}
                </a>
              </p>
            </section>

            <Separator className="my-8" />

            {/* FAQ Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">
                    Can I disable cookies on actaer.com?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes. Click &ldquo;Cookie Settings&rdquo; in the footer to
                    manage your preferences at any time.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    Are essential cookies required?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, essential cookies are necessary for the website to
                    function. They enable page navigation and access to secure
                    areas, and cannot be switched off.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    What third-party cookies does Actaer use?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We use Vercel Analytics for performance insights and
                    Microsoft Clarity for session recordings and heatmaps.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    How long do cookies last?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Session cookies expire when you close your browser.
                    Persistent cookies (like preferences) may last up to 12
                    months.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
