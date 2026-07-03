import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section, Eyebrow, ArrowLink } from "@/components/carbon";

const products = [
  {
    key: "vantumiqp",
    name: "VantumIQP",
    href: "/products/vantumiqp",
    logo: "/images/products/vantumiqp-logo.png",
    logoAlt: "VantumIQP logo",
  },
  {
    key: "faberpdf",
    name: "FaberPDF",
    href: "/products/faberpdf",
    logo: "/images/products/faberpdf-logo-black.png",
    logoAlt: "FaberPDF logo",
  },
] as const;

export function ProductsShowcase() {
  const t = useTranslations("home.products");
  return (
    <Section id="products">
      <div data-reveal="" className="mb-12 space-y-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-display-md max-w-3xl">{t("title")}</h2>
      </div>
      <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.key} className="-mt-px flex flex-col gap-4 border border-border p-8 transition-colors duration-150 ease-carbon hover:bg-muted motion-reduce:transition-none md:-ml-px md:mt-0">
            <p className="text-eyebrow text-muted-foreground">{t(`${product.key}.category`)}</p>
            <div className="flex items-center gap-3">
              <Image src={product.logo} alt={product.logoAlt} width={32} height={32} className="h-8 w-auto" />
              <h3 className="text-card-title">{product.name}</h3>
            </div>
            <p className="text-subhead">{t(`${product.key}.tagline`)}</p>
            <p className="text-body-tracked text-muted-foreground">{t(`${product.key}.description`)}</p>
            <ul className="mt-2 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <li>{t(`${product.key}.feature1`)}</li>
              <li>{t(`${product.key}.feature2`)}</li>
              <li>{t(`${product.key}.feature3`)}</li>
            </ul>
            <div className="mt-auto pt-4">
              <ArrowLink href={product.href}>{t(`${product.key}.cta`)}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
