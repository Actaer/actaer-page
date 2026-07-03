export function Eyebrow({
  children,
  ...props
}: { children: React.ReactNode } & Omit<React.HTMLAttributes<HTMLParagraphElement>, "className">) {
  return (
    <p
      className="text-eyebrow text-muted-foreground before:mb-3 before:block before:h-0.5 before:w-8 before:bg-primary before:content-['']"
      {...props}
    >
      {children}
    </p>
  );
}
