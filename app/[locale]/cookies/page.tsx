import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookiesPage");
  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/cookies`,
  });
}

const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Cookie Policy", url: `${siteConfig.url}/cookies` },
]);

export default async function CookiesPage() {
  const t = await getTranslations("cookiesPage");

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
              <p className="text-muted-foreground leading-relaxed">
                {t("intro")}
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
                  {t("sections.thirdParty.vercel")}
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> -{" "}
                  {t("sections.thirdParty.clarity")}
                </li>
              </ul>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
