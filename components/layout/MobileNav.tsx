"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  {
    title: "IT Consulting",
    href: "/services/it-consulting",
  },
  {
    title: "Software Development",
    href: "/services/software-development",
  },
  {
    title: "Product Development",
    href: "/services/product-development",
  },
];

const navItems = [
  { href: "/about", label: "About" },
  { href: "/products/vantum-erp", label: "Vantum ERP" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>
            <span className="text-2xl font-bold font-heading bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              ACTAER
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {/* Services Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="services" className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "text-lg font-medium py-2 hover:no-underline",
                  pathname.startsWith("/services") && "text-primary",
                )}
              >
                Services
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors py-2",
                        pathname === service.href && "text-primary",
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "text-lg font-medium py-2 hover:text-primary transition-colors",
                pathname === item.href && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* CTA Button */}
          <Button asChild className="mt-4">
            <Link href="/contact" onClick={handleLinkClick}>
              Get Started
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
