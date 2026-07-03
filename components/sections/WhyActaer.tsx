import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/carbon";

export function WhyActaer() {
  const t = useTranslations("home.why");
  const points = ["point1", "point2", "point3", "point4"];
  return (
    <Section>
      <div data-reveal="" className="mb-12 space-y-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{t("title")}</h2>
      </div>
      <div data-reveal-group="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p} className="-mt-px space-y-2 border border-border p-6 sm:-ml-px sm:mt-0">
            <h3 className="text-body-lg font-semibold">{t(`${p}Title`)}</h3>
            <p className="text-sm text-muted-foreground">{t(`${p}Description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
