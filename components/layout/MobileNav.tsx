"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const groups = [
    {
      label: t("products"),
      href: "/products",
      items: [
        { title: "VantumIQP", href: "/products/vantumiqp" },
        { title: "FaberPDF", href: "/products/faberpdf" },
      ],
    },
    {
      label: t("consulting"),
      href: "/consulting",
      items: [
        { title: t("aiConsulting"), href: "/consulting/ai-consulting" },
        { title: t("softwareDevelopment"), href: "/consulting/software-development" },
        { title: t("digitalModernization"), href: "/consulting/digital-modernization" },
      ],
    },
  ];

  const navItems = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:w-[400px]">
        <SheetHeader className="border-b border-border px-6 pt-6 pb-4">
          <SheetTitle>
            <Image
              src="/images/logo-dark.png"
              alt="Actaer"
              width={140}
              height={48}
              className="h-8 w-auto"
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 pb-6">
          {groups.map((group) => (
            <div key={group.href} className="border-b border-border py-4">
              <Link
                href={group.href}
                onClick={handleLinkClick}
                className={cn(
                  "block text-xl font-medium transition-colors hover:text-primary",
                  pathname.startsWith(group.href) && "text-primary",
                )}
              >
                {group.label}
              </Link>
              <div className="mt-3 flex flex-col gap-3 border-l-2 border-border pl-4">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-base text-muted-foreground transition-colors hover:text-foreground",
                      pathname === item.href && "text-primary",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "border-b border-border py-4 text-xl font-medium transition-colors hover:text-primary",
                pathname === item.href && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 flex items-center justify-end">
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
