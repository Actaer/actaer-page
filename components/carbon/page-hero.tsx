import { Eyebrow } from "./eyebrow";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="max-w-4xl space-y-6">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="text-display-lg text-balance">{title}</h1>
        {description ? (
          <p className="text-body-lg max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
        {children ? <div className="flex flex-wrap gap-0 pt-4">{children}</div> : null}
      </div>
    </div>
  );
}
