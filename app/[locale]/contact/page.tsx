import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import { PageHero, Section } from "@/components/carbon";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateSpeakableJsonLd,
} from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return constructMetadata({
    title: t("pageTitle"),
    description: t("pageDescription"),
    canonical: `${siteConfig.url}/${locale}/contact`,
    locale,
    path: "/contact",
  });
}

// LocalBusiness JSON-LD
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.links.phone,
  email: siteConfig.links.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const contactInfo = [
    {
      icon: Mail,
      title: t("info.email"),
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
    },
    {
      icon: Phone,
      title: t("info.phone"),
      value: siteConfig.links.phone,
      href: `tel:${siteConfig.links.phone}`,
    },
    {
      icon: MapPin,
      title: t("info.location"),
      value: `${siteConfig.address.city}, ${siteConfig.address.country}`,
      href: null,
    },
    {
      icon: Clock,
      title: t("info.businessHours"),
      value: t("info.businessHoursValue"),
      href: null,
    },
  ];

  // JSON-LD schema
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: t("pageTitle"), url: `${siteConfig.url}/${locale}/contact` },
  ]);

  const faqs = [
    {
      question: t("faq.responseTime.question"),
      answer: t("faq.responseTime.answer"),
    },
    {
      question: t("faq.international.question"),
      answer: t("faq.international.answer"),
    },
    {
      question: t("faq.messageInfo.question"),
      answer: t("faq.messageInfo.answer"),
    },
    {
      question: t("faq.freeConsultation.question"),
      answer: t("faq.freeConsultation.answer"),
    },
  ];

  const faqJsonLd = generateFaqJsonLd(faqs);
  const speakableJsonLd = generateSpeakableJsonLd({
    url: `${siteConfig.url}/${locale}/contact`,
  });

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
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
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
          title={t("title")}
          description={t("subtitle")}
        />

        {/* Contact Section */}
        <Section band="muted">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <h2 className="text-headline mb-4">{t("getInTouch")}</h2>
                <p className="mb-4 text-muted-foreground">
                  {t("getInTouchDescription")}
                </p>
                <p className="text-muted-foreground">
                  You can reach us by email, phone, or the contact form. We
                  serve clients worldwide from our office in Novi Pazar,
                  Serbia.
                </p>
              </div>

              <div className="grid grid-cols-1">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="-mt-px flex items-start gap-4 border border-border bg-background p-6 first:mt-0"
                  >
                    <item.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs tracking-[0.32px] text-muted-foreground">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section>
          <div className="max-w-3xl">
            <h2 className="text-display-md mb-12">{t("faq.title")}</h2>

            <div className="grid grid-cols-1">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="-mt-px space-y-2 border border-border bg-background p-6 first:mt-0"
                >
                  <h3 className="text-body-lg font-semibold">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
