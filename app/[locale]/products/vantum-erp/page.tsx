import { permanentRedirect } from "next/navigation";
import { type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function VantumErpPage({ params }: PageProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/services/product-development`);
}
