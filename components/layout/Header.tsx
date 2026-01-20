"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  useGSAP(
    () => {
      // Initial fade in animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      // Sticky header background on scroll
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {
          className: "header-scrolled",
          targets: headerRef.current,
        },
      });
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/0 [&.header-scrolled]:bg-background/80 [&.header-scrolled]:backdrop-blur-lg [&.header-scrolled]:border-b [&.header-scrolled]:border-border/40"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                ACTAER
              </span>
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
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button asChild>
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
