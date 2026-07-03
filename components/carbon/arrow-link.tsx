import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  external = false,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "group inline-flex items-center gap-2 text-sm tracking-[0.16px] text-primary hover:underline underline-offset-4",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowRight className="size-4 transition-transform duration-150 ease-carbon group-hover:translate-x-1 motion-reduce:transition-none" />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-150 ease-carbon group-hover:translate-x-1 motion-reduce:transition-none" />
    </Link>
  );
}
