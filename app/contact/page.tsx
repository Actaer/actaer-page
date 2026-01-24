import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ContactForm } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { constructMetadata, siteConfig } from "@/lib/metadata";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Actaer. Let's discuss your software development, IT consulting, or product development needs.",
  canonical: `${siteConfig.url}/contact`,
});

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

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
  },
  {
    icon: Phone,
    title: "Phone",
    value: siteConfig.links.phone,
    href: `tel:${siteConfig.links.phone}`,
  },
  {
    icon: MapPin,
    title: "Location",
    value: `${siteConfig.address.city}, ${siteConfig.address.country}`,
    href: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM CET",
    href: null,
  },
];

// JSON-LD schema
const breadcrumbJsonLd = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Contact", url: `${siteConfig.url}/contact` },
]);

export default function ContactPage() {
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
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                Contact Us
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Let&apos;s{" "}
                <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Talk
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Have a project in mind? Want to discuss how we can help your
                business? We&apos;d love to hear from you.
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
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    Whether you have a question about our services, want to
                    discuss a project, or just want to say hello, we&apos;re
                    here to help.
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
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: "What is your typical response time?",
                    answer:
                      "We typically respond to inquiries within 24 business hours. For urgent matters, please call us directly.",
                  },
                  {
                    question: "Do you work with international clients?",
                    answer:
                      "Absolutely! We work with clients worldwide. Our team is experienced in remote collaboration and we adjust to different time zones as needed.",
                  },
                  {
                    question:
                      "What information should I include in my message?",
                    answer:
                      "Help us understand your project by including: your business context, the problem you're trying to solve, any technical requirements, and your timeline expectations.",
                  },
                  {
                    question: "Do you offer free consultations?",
                    answer:
                      "Yes, we offer an initial free consultation to understand your needs and explore how we can help. No obligations, just a conversation about your project.",
                  },
                ].map((faq, index) => (
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
