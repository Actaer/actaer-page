import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export function CtaBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div data-reveal="" className="mx-auto flex max-w-[1584px] flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-headline">{title}</h2>
          {description ? <p className="text-body-tracked text-primary-foreground/80">{description}</p> : null}
        </div>
        <Button
          asChild
          className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary border"
          size="lg"
        >
          <Link href={ctaHref}>
            {ctaLabel}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
