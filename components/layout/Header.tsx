"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { ModeToggle } from "@/components/mode-toggle";
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

gsap.registerPlugin(useGSAP);

const emptySubscribe = () => () => {};

const services = [
  {
    title: "IT Consulting",
    href: "/services/it-consulting",
    description: "Strategic technology guidance and digital transformation.",
  },
  {
    title: "Software Development",
    href: "/services/software-development",
    description: "Custom software solutions tailored to your needs.",
  },
  {
    title: "Product Development",
    href: "/services/product-development",
    description: "End-to-end product creation from concept to launch.",
  },
];

const navItems = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme } = useTheme();

  useGSAP(
    () => {
      // Initial fade in animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-4 inset-x-4 md:inset-x-0 z-50 mx-auto md:w-fit transition-all duration-300 rounded-full border border-border/40 bg-background/80 backdrop-blur-lg shadow-lg"
      >
        <div className="px-5 md:px-8">
          <div className="flex h-12 md:h-14 items-center justify-between md:gap-10 xl:gap-32">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* Show placeholder or CSS-based solution before mount to prevent flash */}
              {!mounted ? (
                <>
                  <Image
                    src="/images/logo-light.png"
                    alt="Actaer"
                    width={120}
                    height={40}
                    className="h-8 w-auto hidden dark:block"
                    priority
                  />
                  <Image
                    src="/images/logo-dark.png"
                    alt="Actaer"
                    width={120}
                    height={40}
                    className="h-8 w-auto block dark:hidden"
                    priority
                  />
                </>
              ) : (
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? "/images/logo-light.png"
                      : "/images/logo-dark.png"
                  }
                  alt="Actaer"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      pathname.startsWith("/services") && "text-primary",
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                      {services.map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                pathname === service.href && "bg-accent",
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products */}
                <NavigationMenuItem>
                  <Link href="/products/vantum-erp" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname.startsWith("/products") && "text-primary",
                      )}
                    >
                      Vantum ERP
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Other nav items */}
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && "text-primary",
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button & Theme Toggle - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <ModeToggle />
              <Button asChild className="rounded-full">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
