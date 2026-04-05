import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsCatalogClient } from "@/components/site/products-catalog-client";
import { getCategories, getProducts } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Urunler",
  description: "ZeyDesign katalogundaki butik nakis, hediye ve ozel siparis urunlerini incele.",
  path: "/urunler",
});

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-14 text-sm text-stone-500 sm:px-6 lg:px-8">Katalog yukleniyor...</div>}>
      <ProductsCatalogClient categories={getCategories()} products={getProducts()} />
    </Suspense>
  );
}
