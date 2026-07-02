"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowRight, Menu } from "lucide-react";
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

type NavPanelItem = {
  title: string;
  href: string;
  description: string;
  icon?: string;
  tag?: string;
};

export function Header() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = useTranslations("navigation");

  const products: NavPanelItem[] = [
    {
      title: "VantumIQP",
      href: "/products/vantumiqp",
      description: t("vantumiqpDescription"),
      icon: "/images/products/vantumiqp-logo.png",
    },
    {
      title: "FaberPDF",
      href: "/products/faberpdf",
      description: t("faberpdfDescription"),
      icon: "/images/products/faberpdf-logo-black.png",
    },
  ];

  const tFlagship = useTranslations("consultingPage");

  const consulting: NavPanelItem[] = [
    {
      title: t("aiConsulting"),
      href: "/consulting/ai-consulting",
      description: t("aiConsultingDescription"),
      tag: tFlagship("flagshipLabel"),
    },
    {
      title: t("softwareDevelopment"),
      href: "/consulting/software-development",
      description: t("softwareDevelopmentDescription"),
    },
    {
      title: t("digitalModernization"),
      href: "/consulting/digital-modernization",
      description: t("digitalModernizationDescription"),
    },
  ];

  const navItems = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
  ];

  const megaPanel = (
    label: string,
    rootHref: string,
    intro: string,
    viewAllLabel: string,
    items: NavPanelItem[],
  ) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-sm font-normal tracking-[0.16px]",
          pathname.startsWith(rootHref) && "text-primary",
        )}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="mx-auto grid max-w-[1584px] grid-cols-1 px-4 py-8 md:px-8 lg:grid-cols-4">
          <div className="border-border pb-6 lg:border-r lg:pr-8 lg:pb-0">
            <p className="text-card-title">{label}</p>
            <p className="mt-2 text-sm tracking-[0.16px] text-muted-foreground">{intro}</p>
            <NavigationMenuLink
              asChild
              className="mt-6 inline-flex w-auto flex-row items-center gap-2 bg-transparent p-0 text-sm tracking-[0.16px] text-primary hover:bg-transparent hover:underline focus:bg-transparent underline-offset-4"
            >
              <Link href={rootHref}>
                {viewAllLabel}
                <ArrowRight className="size-4" />
              </Link>
            </NavigationMenuLink>
          </div>
          <ul className="grid grid-cols-1 content-start gap-x-8 lg:col-span-3 lg:grid-cols-2 lg:pl-8">
            {items.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "flex-col items-start gap-1 p-4",
                    pathname === item.href && "bg-muted",
                  )}
                >
                  <Link href={item.href}>
                    <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.16px] text-foreground">
                      {item.icon ? (
                        <Image src={item.icon} alt="" width={20} height={20} className="h-5 w-auto" />
                      ) : null}
                      {item.title}
                      {item.tag ? (
                        <span className="text-xs font-normal tracking-[0.32px] text-primary">
                          {item.tag}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-sm tracking-[0.16px] text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-12 max-w-[1584px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-dark.png"
              alt="Actaer logo"
              width={120}
              height={40}
              className="h-7 w-auto"
              priority
            />
            <span className="text-lg font-semibold tracking-[0.16px] text-foreground">
              Actaer
            </span>
          </Link>

          <NavigationMenu className="static hidden md:flex">
            <NavigationMenuList>
              {megaPanel(t("products"), "/products", t("allProductsDescription"), t("allProducts"), products)}
              {megaPanel(t("consulting"), "/consulting", t("allConsultingDescription"), t("allConsulting"), consulting)}
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-normal tracking-[0.16px]",
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
