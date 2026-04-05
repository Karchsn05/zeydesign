import Link from "next/link";

import { getSiteConfig, getSocialLinks } from "@/lib/catalog";

export function SiteFooter() {
  const config = getSiteConfig();
  const links = getSocialLinks({ footerOnly: true });

  return (
    <footer className="border-t border-stone-200/80 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="font-display text-3xl sm:text-4xl">{config.brandName}</p>
          <p className="max-w-md text-sm leading-7 text-stone-300">{config.footerDescription}</p>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">Kesfet</p>
          <div className="flex flex-col gap-3 text-sm text-stone-200">
            <Link href="/urunler">Urunler</Link>
            <Link href="/hakkimizda">Hakkimizda</Link>
            <Link href="/iletisim">Iletisim</Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">Baglantilar</p>
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
