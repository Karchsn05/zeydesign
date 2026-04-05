import type { Metadata } from "next";

import { CheckoutClient } from "@/components/site/checkout-client";
import { getSiteConfig } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Siparis Birak",
  description: "Sepetindeki urunler icin iletisim bilgilerini gir ve siparis talebini birak.",
  path: "/odeme",
  indexable: false,
});

export default function CheckoutPage() {
  const config = getSiteConfig();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <CheckoutClient whatsappHref={config.whatsappHref} />
    </div>
  );
}
