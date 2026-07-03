import { useTranslations } from "next-intl";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";

interface ConsultingOverviewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function ConsultingOverview({ eyebrow, title, description }: ConsultingOverviewProps) {
  const t = useTranslations("home.consulting");
  const services = [
    { key: "ai", href: "/consulting/ai-consulting", flagship: true },
    { key: "software", href: "/consulting/software-development", flagship: false },
    { key: "modernization", href: "/consulting/digital-modernization", flagship: false },
  ];
  return (
    <Section band="muted">
      <div data-reveal="" className="mb-12 space-y-4">
        <Eyebrow>{eyebrow ?? t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{title ?? t("title")}</h2>
        <p className="text-body-lg max-w-2xl text-muted-foreground">{description ?? t("description")}</p>
      </div>
      <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.key}
            className="-mt-px flex flex-col gap-3 border border-border bg-background p-6 transition-colors duration-150 ease-carbon hover:bg-layer-hover motion-reduce:transition-none md:-ml-px md:mt-0"
          >
            <h3 className="text-card-title">{t(`${s.key}Title`)}</h3>
            <p className="text-body-tracked text-muted-foreground">{t(`${s.key}Description`)}</p>
            <div className="mt-auto pt-4">
              <ArrowLink href={s.href}>{t("cta")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
