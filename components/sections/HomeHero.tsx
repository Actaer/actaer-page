import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/carbon";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  const t = useTranslations("home.hero");
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-40 md:pb-24">
      <div className="max-w-5xl space-y-6">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-display-xl text-balance">{t("title")}</h1>
        <p className="text-body-lg max-w-2xl text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap pt-4">
          <Button asChild size="lg">
            <Link href="/products">
              {t("primaryCta")}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="-ml-px">
            <Link href="/consulting/ai-consulting">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
