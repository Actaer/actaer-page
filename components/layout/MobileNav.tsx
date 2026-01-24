"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const t = useTranslations("navigation");

  const services = [
    {
      title: t("itConsulting"),
      href: "/services/it-consulting",
    },
    {
      title: t("softwareDevelopment"),
      href: "/services/software-development",
    },
    {
      title: t("productDevelopment"),
      href: "/services/product-development",
    },
  ];

  const navItems = [
    { href: "/about", label: t("about") },
    { href: "/products/vantum-erp", label: t("vantumErp") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/images/logo-light.png"
                  : "/images/logo-dark.png"
              }
              alt="Actaer"
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 pb-6">
          {/* Services Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="services"
              className="border-b border-border/50"
            >
              <AccordionTrigger
                className={cn(
                  "text-xl font-medium py-4 hover:no-underline",
                  pathname.startsWith("/services") && "text-primary",
                )}
              >
                {t("services")}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-1 pl-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded-lg hover:bg-muted",
                        pathname === service.href &&
                          "text-primary bg-primary/5",
                      )}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Other nav items */}
          <div className="flex flex-col mt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "text-xl font-medium py-4 border-b border-border/50 hover:text-primary transition-colors",
                  pathname === item.href && "text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Button asChild size="lg" className="mt-8 rounded-full">
            <Link href="/contact" onClick={handleLinkClick}>
              {t("getStarted")}
            </Link>
          </Button>

          {/* Theme Toggle & Language */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <span className="text-base text-muted-foreground">
              {t("theme")}
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
