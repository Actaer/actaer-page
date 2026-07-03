import { Eyebrow } from "./eyebrow";

export function PageHero({
  media,
  eyebrow,
  title,
  description,
  children,
}: {
  media?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1584px] px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="max-w-4xl space-y-6">
        {media ? <div data-hero="" className="pb-2">{media}</div> : null}
        {eyebrow ? <Eyebrow data-hero="">{eyebrow}</Eyebrow> : null}
        <h1 data-hero="" className="text-display-lg text-balance">{title}</h1>
        {description ? (
          <p data-hero="" className="text-body-lg max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
        {children ? <div data-hero="" className="flex flex-wrap gap-0 pt-4">{children}</div> : null}
      </div>
    </div>
  );
}
