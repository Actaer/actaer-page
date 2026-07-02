"use client";

import { Header, Footer } from "@/components/layout";
import { Eyebrow } from "@/components/carbon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] items-center pt-24">
        <div className="mx-auto w-full max-w-[1584px] px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            <Eyebrow>404</Eyebrow>
            <h1 className="text-display-lg text-balance">{t("title")}</h1>
            <p className="text-body-lg max-w-2xl text-muted-foreground">
              {t("description")}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-0 pt-4">
              <Button asChild size="lg">
                <Link href="/">
                  {t("backToHome")}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="-ml-px">
                <Link href="/contact">{t("contactSupport")}</Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="mb-4 text-sm text-muted-foreground">
                {t("helpfulLinks")}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Link
                  href="/consulting"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {t("ourServices")}
                </Link>
                <span className="text-muted-foreground">&middot;</span>
                <Link
                  href="/blog"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Blog
                </Link>
                <span className="text-muted-foreground">&middot;</span>
                <Link
                  href="/about"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {t("aboutUs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
