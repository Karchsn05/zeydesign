"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { formatCooldownSeconds, getRemainingCooldown, isHoneypotTriggered, markSubmitted } from "@/lib/form-guard";
import { createSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase";
import { checkoutSchema } from "@/lib/validations";
import { saveRecentOrder } from "@/lib/order-storage";
import { formatCurrency, orderCode } from "@/lib/utils";
import { buildCheckoutWhatsAppHref } from "@/lib/whatsapp";
import { toFieldErrors, type FieldErrors } from "@/lib/zod-errors";

export function CheckoutClient({ whatsappHref }: { whatsappHref?: string | null }) {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    const remainingCooldown = getRemainingCooldown("checkout-form");
    const payload = {
      customerName: String(formData.get("customerName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      city: String(formData.get("city") ?? ""),
      district: String(formData.get("district") ?? ""),
      address: String(formData.get("address") ?? ""),
      note: String(formData.get("note") ?? ""),
      items,
    };
    const parsed = checkoutSchema.safeParse(payload);

    setError(null);
    setFieldErrors({});
    setFallbackHref(null);

    if (isHoneypotTriggered(formData)) {
      setError("Form gönderimi doğrulanamadı.");
      return;
    }

    if (remainingCooldown > 0) {
      setError(`Siparişi tekrar göndermeden önce ${formatCooldownSeconds(remainingCooldown)} saniye bekle.`);
      return;
    }

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }

    const nextFallbackHref = whatsappHref
      ? buildCheckoutWhatsAppHref(whatsappHref, {
          customerName: parsed.data.customerName,
          phone: parsed.data.phone,
          email: parsed.data.email || undefined,
          city: parsed.data.city,
          district: parsed.data.district,
          address: parsed.data.address,
          note: parsed.data.note || undefined,
          subtotal,
          items: parsed.data.items,
        })
      : null;

    if (!hasSupabaseBrowserEnv()) {
      setError("Sipariş veritabanına yazılamıyor. İstersen özeti doğrudan WhatsApp ile gönderebilirsin.");
      setFallbackHref(nextFallbackHref);
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const nextOrderCode = orderCode();
      const { error: insertError } = await supabase.from("order_requests").insert({
        order_code: nextOrderCode,
        customer_name: parsed.data.customerName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        city: parsed.data.city,
        district: parsed.data.district,
        address: parsed.data.address,
        note: parsed.data.note || null,
        items: parsed.data.items,
        subtotal,
        grand_total: subtotal,
        status: "NEW",
        source: "cloudflare-pages",
      });

      if (insertError) {
        setError(insertError.message || "Sipariş oluşturulamadı.");
        setFallbackHref(nextFallbackHref);
        setLoading(false);
        return;
      }

      markSubmitted("checkout-form");
      saveRecentOrder({
        orderCode: nextOrderCode,
        customerName: parsed.data.customerName,
        phone: parsed.data.phone,
        grandTotal: subtotal,
        createdAt: new Date().toISOString(),
        items: parsed.data.items.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
        })),
      });

      await clear();
      router.push(`/siparis-basarili?orderCode=${encodeURIComponent(nextOrderCode)}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Sipariş oluşturulamadı.");
      setFallbackHref(nextFallbackHref);
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 p-8 text-center sm:p-10">
        <p className="font-display text-3xl text-stone-900 sm:text-4xl">Sepetin boş olduğu için sipariş oluşturulamıyor.</p>
        <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">Önce bir ürün seç, sonra bu sayfadan talebini bırak.</p>
      </div>
    );
  }

  return (
    <div className="safe-bottom grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <form
        id="checkout-form"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit(new FormData(event.currentTarget));
        }}
        className="space-y-6 rounded-[2rem] border border-stone-200/80 bg-white/85 p-5 shadow-sm sm:p-6"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="checkout-website">Website</label>
          <input id="checkout-website" name="website" autoComplete="off" tabIndex={-1} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Ad Soyad</span>
            <input name="customerName" autoComplete="name" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4" />
            {fieldErrors.customerName ? <p className="text-xs text-rose-600">{fieldErrors.customerName}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Telefon / WhatsApp</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4" />
            {fieldErrors.phone ? <p className="text-xs text-rose-600">{fieldErrors.phone}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">E-posta</span>
            <input name="email" type="email" inputMode="email" autoComplete="email" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4" />
            {fieldErrors.email ? <p className="text-xs text-rose-600">{fieldErrors.email}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Şehir</span>
            <input name="city" autoComplete="address-level2" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4" />
            {fieldErrors.city ? <p className="text-xs text-rose-600">{fieldErrors.city}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">İlçe</span>
            <input name="district" autoComplete="address-level1" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4" />
            {fieldErrors.district ? <p className="text-xs text-rose-600">{fieldErrors.district}</p> : null}
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Adres</span>
          <textarea name="address" rows={4} autoComplete="street-address" className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3" />
          {fieldErrors.address ? <p className="text-xs text-rose-600">{fieldErrors.address}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Sipariş notu</span>
          <textarea name="note" rows={4} className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3" />
          {fieldErrors.note ? <p className="text-xs text-rose-600">{fieldErrors.note}</p> : null}
        </label>
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
          Bu aşamada online ödeme alınmaz. Siparişin geldikten sonra detayları kontrol edip WhatsApp veya telefon üzerinden sana geri dönüş yaparız.
        </div>

        {fieldErrors.items ? <p className="text-sm text-rose-600">{fieldErrors.items}</p> : null}
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {fallbackHref ? (
          <Link href={fallbackHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 rounded-full bg-[var(--brand-primary)] px-6 text-sm font-semibold text-white">
            Özeti WhatsApp&apos;ta Aç
          </Link>
        ) : null}

        <div className="hidden lg:block">
          <button type="submit" disabled={loading} className="inline-flex min-h-12 rounded-full bg-stone-950 px-6 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? "Sipariş oluşturuluyor..." : "Siparişi Bırak"}
          </button>
        </div>
      </form>

      <aside className="hidden rounded-[2rem] border border-stone-200/80 bg-stone-950 p-6 text-white shadow-[var(--card-shadow)] lg:block">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Özet</p>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-stone-400">{item.quantity} adet</p>
              </div>
              <p className="text-sm font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-sm text-stone-300">
          <div className="flex items-center justify-between">
            <span>Ara toplam</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Kargo</span>
            <span>Onay sonrası</span>
          </div>
        </div>
      </aside>

      <div className="safe-bottom-offset fixed inset-x-4 z-30 rounded-[1.6rem] border border-stone-200 bg-white/96 p-3 shadow-[0_18px_50px_rgba(36,24,18,0.18)] backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">Sipariş toplamı</p>
            <p className="text-sm font-semibold text-stone-900">{formatCurrency(subtotal)}</p>
          </div>
          <button type="submit" form="checkout-form" disabled={loading} className="inline-flex min-h-12 items-center rounded-full bg-stone-950 px-5 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? "Gönderiliyor..." : "Siparişi Bırak"}
          </button>
        </div>
        {fieldErrors.items ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.items}</p> : null}
        {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
        {fallbackHref ? (
          <Link href={fallbackHref} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center rounded-full bg-[var(--brand-primary)] px-4 text-sm font-semibold text-white">
            Özeti WhatsApp&apos;ta Aç
          </Link>
        ) : null}
      </div>
    </div>
  );
}
