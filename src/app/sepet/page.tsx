import type { Metadata } from "next";

import { CartPageClient } from "@/components/site/cart-page-client";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sepet",
  description: "Seçtiğin ürünleri ve kişiselleştirme özetini kontrol et, sipariş adımına ilerle.",
  path: "/sepet",
  indexable: false,
});

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <CartPageClient />
    </div>
  );
}
