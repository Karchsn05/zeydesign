"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { readRecentOrder } from "@/lib/order-storage";
import { formatCurrency } from "@/lib/utils";
import { buildOrderWhatsAppHref } from "@/lib/whatsapp";

export function OrderSuccessClient({ whatsappHref }: { whatsappHref?: string | null }) {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const recent = readRecentOrder();
  const finalCode = orderCode ?? recent?.orderCode ?? "ZD-UNKNOWN";
  const whatsappOrderHref = recent && whatsappHref ? buildOrderWhatsAppHref(whatsappHref, recent) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="space-y-4 rounded-[2.25rem] border border-stone-200/80 bg-white/90 px-6 py-10 shadow-[var(--card-shadow)]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">Sipariş Kaydedildi</p>
        <h1 className="font-display text-4xl text-stone-950 sm:text-5xl">Teşekkürler, talebin bize ulaştı.</h1>
        <p className="text-sm leading-7 text-stone-600 sm:text-base">
          Sipariş kodun: <span className="font-semibold text-stone-900">{finalCode}</span>
        </p>
        {recent ? (
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-4 text-left">
            <p className="text-sm text-stone-600">Müşteri: {recent.customerName}</p>
            <p className="text-sm text-stone-600">Telefon: {recent.phone}</p>
            <p className="text-sm text-stone-600">Toplam: {formatCurrency(recent.grandTotal)}</p>
          </div>
        ) : null}
        <p className="text-sm leading-7 text-stone-600">Detaylar WhatsApp veya telefon üzerinden teyit edilecektir. Referans görselin varsa bu aşamadan sonra gönderebilirsin.</p>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/urunler" className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-white">
          Ürünlere Dön
        </Link>
        {whatsappOrderHref ? (
          <Link
            href={whatsappOrderHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-semibold text-white"
          >
            Özeti WhatsApp&apos;ta Aç
          </Link>
        ) : null}
        <Link href="/iletisim" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-stone-800">
          İletişime Geç
        </Link>
      </div>
    </div>
  );
}
