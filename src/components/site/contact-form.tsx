"use client";

import Link from "next/link";
import { useState } from "react";

import { formatCooldownSeconds, getRemainingCooldown, isHoneypotTriggered, markSubmitted } from "@/lib/form-guard";
import { createSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase";
import { messageSchema } from "@/lib/validations";
import { buildContactWhatsAppHref } from "@/lib/whatsapp";
import { toFieldErrors, type FieldErrors } from "@/lib/zod-errors";

type Props = {
  whatsappHref?: string | null;
  instagramHref?: string | null;
};

export function ContactForm({ whatsappHref, instagramHref }: Props) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    const remainingCooldown = getRemainingCooldown("contact-form");

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const parsed = messageSchema.safeParse(payload);

    setStatus(null);
    setFieldErrors({});
    setFallbackHref(null);

    if (isHoneypotTriggered(formData)) {
      setStatus({ type: "success", message: "Mesajın alındı. Sana en kısa sürede dönüş yapacağız." });
      return;
    }

    if (remainingCooldown > 0) {
      setStatus({
        type: "error",
        message: `Formu tekrar göndermeden önce ${formatCooldownSeconds(remainingCooldown)} saniye bekle.`,
      });
      return;
    }

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }

    const nextFallbackHref = whatsappHref
      ? buildContactWhatsAppHref(whatsappHref, {
          name: parsed.data.name,
          phone: parsed.data.phone || undefined,
          email: parsed.data.email || undefined,
          subject: parsed.data.subject || undefined,
          message: parsed.data.message,
        })
      : null;

    if (!hasSupabaseBrowserEnv()) {
      setStatus({
        type: "error",
        message: "Mesaj veritabanına yazılamıyor. İstersen özeti doğrudan WhatsApp ile gönderebilirsin.",
      });
      setFallbackHref(nextFallbackHref);
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("customer_messages").insert({
        name: parsed.data.name,
        phone: parsed.data.phone || null,
        email: parsed.data.email || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });

      if (error) {
        setStatus({ type: "error", message: error.message || "Mesaj gönderilemedi." });
        setFallbackHref(nextFallbackHref);
        setLoading(false);
        return;
      }

      markSubmitted("contact-form");
      setStatus({ type: "success", message: "Mesajın alındı. Sana en kısa sürede dönüş yapacağız." });
      setLoading(false);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Mesaj gönderilemedi." });
      setFallbackHref(nextFallbackHref);
      setLoading(false);
    }
  }

  return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit(new FormData(event.currentTarget));
        }}
        className="space-y-4 rounded-[2rem] border border-stone-200/80 bg-white/90 p-5 shadow-sm sm:p-6"
      >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" autoComplete="off" tabIndex={-1} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Ad Soyad</span>
          <input name="name" autoComplete="name" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[var(--brand-primary)]" />
          {fieldErrors.name ? <p className="text-xs text-rose-600">{fieldErrors.name}</p> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Telefon / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[var(--brand-primary)]" />
          {fieldErrors.phone ? <p className="text-xs text-rose-600">{fieldErrors.phone}</p> : null}
        </label>
      </div>
      <label className="space-y-2">
        <span className="text-sm font-medium text-stone-700">E-posta</span>
        <input name="email" type="email" autoComplete="email" inputMode="email" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[var(--brand-primary)]" />
        {fieldErrors.email ? <p className="text-xs text-rose-600">{fieldErrors.email}</p> : null}
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-stone-700">Konu</span>
        <input name="subject" className="min-h-12 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[var(--brand-primary)]" />
        {fieldErrors.subject ? <p className="text-xs text-rose-600">{fieldErrors.subject}</p> : null}
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-stone-700">Mesaj</span>
        <textarea name="message" rows={6} className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[var(--brand-primary)]" />
        {fieldErrors.message ? <p className="text-xs text-rose-600">{fieldErrors.message}</p> : null}
      </label>

      {status ? <p className={status.type === "success" ? "text-sm text-emerald-700" : "text-sm text-rose-600"}>{status.message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={loading} className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
        </button>
        {whatsappHref ? (
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800">
            WhatsApp ile Yaz
          </Link>
        ) : null}
        {fallbackHref ? (
          <Link href={fallbackHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 text-sm font-semibold text-white">
            Özeti WhatsApp&apos;ta Aç
          </Link>
        ) : null}
        {!whatsappHref && instagramHref ? (
          <Link href={instagramHref} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-800">
            Instagram ile Yaz
          </Link>
        ) : null}
      </div>
    </form>
  );
}
