"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import type { CategoryRecord, ProductRecord } from "@/lib/catalog";

export function ProductsCatalogClient({
  categories,
  products,
}: {
  categories: CategoryRecord[];
  products: ProductRecord[];
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("kategori");
  const filtered = activeCategory ? products.filter((product) => product.category.slug === activeCategory) : products;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Butik Koleksiyon"
        title="Siparişe dönüşmeye hazır ürünler"
        description="Standart, kişiselleştirilebilir ve özel sipariş ürünlerini aynı vitrinde topluyoruz."
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/urunler" className={`rounded-full px-4 py-2 text-sm font-semibold ${!activeCategory ? "bg-stone-950 text-white" : "border border-stone-300 bg-white text-stone-700"}`}>
          Tümü
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/urunler?kategori=${category.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${activeCategory === category.slug ? "text-white" : "border border-stone-300 bg-white text-stone-700"}`}
            style={activeCategory === category.slug ? { backgroundColor: category.accentColor } : undefined}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
