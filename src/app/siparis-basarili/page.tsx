import type { Metadata } from "next";
import { Suspense } from "react";

import { OrderSuccessClient } from "@/components/site/order-success-client";
import { getSiteConfig } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sipariş Kaydedildi",
  description: "Sipariş talebin alındı. Kodunu kaydet ve WhatsApp üzerinden teyit akışına geç.",
  path: "/siparis-basarili",
  indexable: false,
});

export default function OrderSuccessPage() {
  const config = getSiteConfig();

  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-stone-500 sm:px-6 lg:px-8">Sipariş bilgisi yükleniyor...</div>}>
      <OrderSuccessClient whatsappHref={config.whatsappHref} />
    </Suspense>
  );
}
