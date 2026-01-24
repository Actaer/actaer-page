import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Number */}
            <div className="relative mb-8">
              <span className="text-[10rem] md:text-[14rem] font-bold font-heading text-muted/20 select-none leading-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-20 w-20 text-muted-foreground/50" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved or doesn&apos;t exist.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Here are some helpful links:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link
                  href="/services"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Our Services
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/products/vantum-erp"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Vantum ERP
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/blog"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Blog
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/about"
                  className="text-primary hover:underline underline-offset-4"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
