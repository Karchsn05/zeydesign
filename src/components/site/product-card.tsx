import Image from "next/image";
import Link from "next/link";

import type { ProductRecord } from "@/lib/catalog";
import { formatCurrency, formatLeadTime } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductRecord }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,239,226,0.92))] shadow-[0_20px_70px_rgba(64,47,36,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(64,47,36,0.14)]">
      <Link href={`/urunler/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.coverImage ? (
            <Image
              src={product.coverImage}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div
              className="relative flex h-full items-end justify-between overflow-hidden px-5 py-5"
              style={{
                background: `linear-gradient(135deg, ${product.category.accentColor}22 0%, rgba(255,255,255,0.96) 52%, ${product.category.accentColor}55 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_45%)]" />
              <span className="relative rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-stone-700 shadow-sm">
                {product.category.name}
              </span>
              <span className="relative text-4xl opacity-80">{product.category.icon ?? "*"}</span>
            </div>
          )}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
            <span className="rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-700 shadow-sm">
              {product.category.name}
            </span>
            {product.badge ? (
              <span className="max-w-[52%] rounded-full bg-stone-950/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                {product.badge}
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-stone-900 sm:text-lg">{product.name}</h3>
            {product.summary ? <p className="text-sm leading-6 text-stone-600">{product.summary}</p> : null}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-dashed border-stone-200 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Başlangıç</p>
              <p className="mt-1 text-base font-semibold text-stone-900 sm:text-lg">{formatCurrency(product.price)}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Teslim</p>
              <p className="mt-1 text-sm font-medium text-stone-700">{formatLeadTime(product.leadTimeDays)}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
