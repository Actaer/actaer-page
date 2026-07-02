export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow text-muted-foreground before:mb-3 before:block before:h-0.5 before:w-8 before:bg-primary before:content-['']">
      {children}
    </p>
  );
}
