"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency, formatLeadTime } from "@/lib/utils";

export function CartPageClient() {
  const { items, subtotal, loading, updateItem, removeItem } = useCart();

  if (loading) {
    return <p className="text-sm text-stone-500">Sepet yükleniyor...</p>;
  }

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 p-8 text-center sm:p-10">
        <p className="font-display text-3xl text-stone-900 sm:text-4xl">Sepetin henüz boş.</p>
        <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">Önce birkaç ürüne göz at, sonra siparişini bırak.</p>
        <Link href="/urunler" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-white">
          Ürünleri İncele
        </Link>
      </div>
    );
  }

  return (
    <div className="safe-bottom grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">{item.categoryName}</p>
                  <h2 className="text-base font-semibold text-stone-900 sm:text-lg">{item.productName}</h2>
                  <p className="text-sm text-stone-600">{formatLeadTime(item.leadTimeDays)}</p>
                  {item.customizationPayload.summaryLines?.length ? (
                    <div className="space-y-1">
                      {item.customizationPayload.summaryLines.map((line) => (
                        <p key={line} className="text-sm text-stone-600">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
                <p className="text-lg font-semibold text-stone-900">{formatCurrency(item.unitPrice)}</p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-stone-50 px-3 py-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) => updateItem({ ...item, quantity: Math.max(1, Number(event.target.value) || 1) })}
                  className="min-h-11 w-24 rounded-full border border-stone-300 bg-white px-3 text-sm"
                />
                <button onClick={() => removeItem(item.id)} className="inline-flex min-h-11 items-center rounded-full border border-stone-300 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Sil
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="hidden rounded-[2rem] border border-stone-200/80 bg-stone-950 p-6 text-white shadow-[var(--card-shadow)] lg:block">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Sipariş Özeti</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-stone-400">Ara toplam</p>
            <p className="text-3xl font-semibold">{formatCurrency(subtotal)}</p>
          </div>
            <p className="max-w-[180px] text-right text-sm text-stone-300">Kargo tutarı onay sonrasında netleşir.</p>
        </div>
        <Link href="/odeme" className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-stone-950">
          Siparişe Devam Et
        </Link>
      </aside>

      <div className="safe-bottom-offset fixed inset-x-4 z-30 rounded-[1.6rem] border border-stone-200 bg-white/96 p-3 shadow-[0_18px_50px_rgba(36,24,18,0.18)] backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">Ara toplam</p>
            <p className="text-sm font-semibold text-stone-900">{formatCurrency(subtotal)}</p>
          </div>
          <Link href="/odeme" className="inline-flex min-h-12 items-center rounded-full bg-stone-950 px-5 text-sm font-semibold text-white">
            Siparişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
}
