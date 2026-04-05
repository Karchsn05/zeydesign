import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { LandingSections } from "@/components/site/landing-sections";
import { getLandingSections, getSiteConfig, getSocialLinks } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Iletisim",
  description: "ZeyDesign ile iletisime gec, mesaj birak veya WhatsApp uzerinden siparis detaylarini paylas.",
  path: "/iletisim",
});

export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <div className="space-y-12 pb-16 sm:space-y-14 sm:pb-20">
      <LandingSections page="contact" sections={getLandingSections("contact")} socialLinks={getSocialLinks({ contactOnly: true })} />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="space-y-4 rounded-[2rem] border border-stone-200/80 bg-stone-950 p-6 text-white shadow-[var(--card-shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">Iletisim Bilgileri</p>
          <h2 className="font-display text-3xl">Hizli donus icin aktif kanallar</h2>
          <div className="space-y-3 text-sm leading-7 text-stone-300">
            <p>Telefon: {config.phone}</p>
            <p>E-posta: {config.email}</p>
            <p>Sehir: {config.city}</p>
          </div>
        </div>

        <ContactForm whatsappHref={config.whatsappHref} instagramHref={config.instagramHref} />
      </section>
    </div>
  );
}
