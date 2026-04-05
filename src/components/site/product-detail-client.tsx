"use client";

import Image from "next/image";
import { useState } from "react";

import { AddToCartForm } from "@/components/site/add-to-cart-form";
import { ProductCard } from "@/components/site/product-card";
import type { ProductRecord } from "@/lib/catalog";
import { formatLeadTime } from "@/lib/utils";

export function ProductDetailClient({
  product,
  related,
}: {
  product: ProductRecord;
  related: ProductRecord[];
}) {
  const [activeImage, setActiveImage] = useState<string | null>(product.coverImage);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel section-glow space-y-6 rounded-[2.25rem] border border-white/60 p-5 sm:p-8">
          <div
            className="relative flex aspect-[4/3] items-end overflow-hidden rounded-[2rem] p-5 sm:p-8"
            style={{
              background: `linear-gradient(160deg, ${product.category.accentColor}18 0%, rgba(255,255,255,0.96) 48%, ${product.category.accentColor}55 100%)`,
            }}
          >
            {activeImage ? <Image src={activeImage} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority /> : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(24,17,12,0.28))]" />
            <div className="relative space-y-4">
              <span className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white" style={{ backgroundColor: product.category.accentColor }}>
                {product.category.icon} {product.category.name}
              </span>
              <p className="max-w-xl text-sm leading-7 text-white/92 sm:text-base">{product.summary}</p>
            </div>
          </div>

          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((image) => {
                const selected = activeImage === image.url;
                return (
                  <button key={image.id} type="button" onClick={() => setActiveImage(image.url)} className={`relative aspect-square overflow-hidden rounded-[1.4rem] border ${selected ? "border-stone-950" : "border-stone-200"}`}>
                    <Image src={image.url} alt={image.altText ?? product.name} fill className="object-cover" sizes="120px" />
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Ürün tipi</p>
              <p className="mt-2 text-sm font-semibold text-stone-900">
                {product.productType === "STANDARD" ? "Standart" : product.productType === "CUSTOMIZABLE" ? "Kişiselleştirilebilir" : "Özel Sipariş"}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Teslim</p>
              <p className="mt-2 text-sm font-semibold text-stone-900">{formatLeadTime(product.leadTimeDays)}</p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Kişiselleştirme</p>
              <p className="mt-2 text-sm font-semibold text-stone-900">
                {product.customizationMode === "NONE" ? "Yok" : product.customizationMode === "BASIC" ? "Seçenek bazlı" : "Serbest detay"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            {product.badge ? <span className="inline-flex rounded-full bg-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-700">{product.badge}</span> : null}
            <h1 className="font-display text-4xl leading-tight text-stone-950 sm:text-5xl">{product.name}</h1>
            <p className="text-base leading-8 text-stone-600 sm:text-lg">{product.description}</p>
          </div>
          <AddToCartForm product={product} onPreviewChange={setActiveImage} />
        </div>
      </section>

      {related.length ? (
        <section className="space-y-8">
          <h2 className="font-display text-3xl text-stone-950 sm:text-4xl">Benzer ürünler</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((entry) => <ProductCard key={entry.id} product={entry} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
