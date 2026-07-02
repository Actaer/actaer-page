"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = useTranslations("navigation");

  const products = [
    { title: "VantumIQP", href: "/products/vantumiqp", description: t("vantumiqpDescription") },
    { title: "FaberPDF", href: "/products/faberpdf", description: t("faberpdfDescription") },
    { title: t("allProducts"), href: "/products", description: t("allProductsDescription") },
  ];

  const consulting = [
    { title: t("aiConsulting"), href: "/consulting/ai-consulting", description: t("aiConsultingDescription") },
    { title: t("softwareDevelopment"), href: "/consulting/software-development", description: t("softwareDevelopmentDescription") },
    { title: t("digitalModernization"), href: "/consulting/digital-modernization", description: t("digitalModernizationDescription") },
    { title: t("allConsulting"), href: "/consulting", description: t("allConsultingDescription") },
  ];

  const navItems = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  const dropdown = (label: string, rootHref: string, items: typeof products) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn(pathname.startsWith(rootHref) && "text-primary")}>
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-100 gap-0 p-0 md:w-125 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.href} className="border border-border -ml-px -mt-px">
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "block space-y-1 p-4 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
                    pathname === item.href && "bg-muted",
                  )}
                >
                  <div className="text-sm font-semibold leading-none">{item.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-12 max-w-[1584px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-dark.png"
              alt="Actaer"
              width={120}
              height={40}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {dropdown(t("products"), "/products", products)}
              {dropdown(t("consulting"), "/consulting", consulting)}
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.href && "text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <Button asChild size="sm">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="size-12 text-foreground md:hidden"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">{t("openMenu")}</span>
          </Button>
        </div>
      </header>
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
