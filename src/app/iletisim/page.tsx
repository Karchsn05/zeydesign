import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { LandingSections } from "@/components/site/landing-sections";
import { getLandingSections, getSiteConfig, getSocialLinks } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "İletişim",
  description: "ZeyDesign ile iletişime geç, mesaj bırak veya WhatsApp üzerinden sipariş detaylarını paylaş.",
  path: "/iletisim",
});

export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <div className="space-y-12 pb-16 sm:space-y-14 sm:pb-20">
      <LandingSections page="contact" sections={getLandingSections("contact")} socialLinks={getSocialLinks({ contactOnly: true })} />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-4 rounded-[2rem] border border-stone-200/80 bg-[linear-gradient(135deg,#1f1612_0%,#345b4a_54%,#b85b2f_100%)] p-6 text-white shadow-[var(--card-shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-300">İletişim Bilgileri</p>
          <h2 className="font-display text-3xl">Hızlı dönüş için aktif kanallar</h2>
          <div className="space-y-3 text-sm leading-7 text-stone-300">
            <p>Telefon: {config.phone}</p>
            <p>E-posta: {config.email}</p>
            <p>Şehir: {config.city}</p>
          </div>
        </div>

        <ContactForm whatsappHref={config.whatsappHref} instagramHref={config.instagramHref} />
      </section>
    </div>
  );
}
