import { cn } from "@/lib/utils";

type Band = "canvas" | "muted" | "inverse";

const bandClasses: Record<Band, string> = {
  canvas: "bg-background",
  muted: "bg-muted",
  inverse: "bg-foreground text-background",
};

export function Section({
  band = "canvas",
  className,
  innerClassName,
  id,
  children,
}: {
  band?: Band;
  className?: string;
  innerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("border-t border-border", bandClasses[band], className)}>
      <div className={cn("mx-auto max-w-[1584px] px-4 py-16 md:px-8 md:py-24", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
