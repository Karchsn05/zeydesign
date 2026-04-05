import Link from "next/link";

import { DecorativeSprinkles } from "@/components/site/decorative-sprinkles";
import { getSiteConfig, getSocialLinks } from "@/lib/catalog";

export function SiteFooter() {
  const config = getSiteConfig();
  const links = getSocialLinks({ footerOnly: true });

  return (
    <footer className="relative overflow-hidden border-t border-white/20 bg-[radial-gradient(circle_at_top_left,rgba(214,161,77,0.22),transparent_22%),linear-gradient(135deg,#241915_0%,#1a251f_48%,#1f1612_100%)] text-stone-100">
      <DecorativeSprinkles className="opacity-45" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="font-display text-3xl sm:text-4xl">{config.brandName}</p>
          <p className="max-w-md text-sm leading-7 text-stone-300">{config.footerDescription}</p>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">Keşfet</p>
          <div className="flex flex-col gap-3 text-sm text-stone-200">
            <Link href="/urunler">Ürünler</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">Bağlantılar</p>
          <div className="flex flex-col gap-3 text-sm text-stone-200">
            {links.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                {link.displayName}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
