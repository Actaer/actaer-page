import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                {t.raw("title").split("{highlighted}")[0]}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("highlighted")}
                </span>
                {t.raw("title").split("{highlighted}")[1] || ""}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-4">
                    {t("getInTouch")}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {t("getInTouchDescription")}
                  </p>
                  <p className="text-muted-foreground">
                    You can reach us by email, phone, or the contact form. We
                    serve clients worldwide from our office in Novi Pazar,
                    Serbia.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="border-border/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {item.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-foreground">{item.value}</span>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center">
                {t("faq.title")}
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
