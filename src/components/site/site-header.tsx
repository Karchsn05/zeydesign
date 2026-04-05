"use client";

import Link from "next/link";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CartLink } from "@/components/site/cart-link";
import { cn } from "@/lib/utils";

type Props = {
  brandName: string;
  tagline: string;
  announcement?: string | null;
};

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader({ brandName, tagline, announcement }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-[linear-gradient(180deg,rgba(255,248,242,0.94),rgba(249,241,232,0.88))] backdrop-blur-xl">
      {announcement ? (
        <div className="border-b border-white/20 bg-[linear-gradient(90deg,var(--brand-secondary),var(--brand-primary))] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-50 sm:text-xs">
          {announcement}
        </div>
      ) : null}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0 flex-1 pr-3" onClick={() => setIsOpen(false)}>
          <p className="truncate font-display text-2xl text-stone-950 sm:text-3xl">{brandName}</p>
          <p className="mt-1 truncate text-[10px] uppercase tracking-[0.22em] text-stone-500 sm:text-xs">{tagline}</p>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn("text-sm font-medium transition", isActive ? "text-stone-950" : "text-stone-700 hover:text-stone-950")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/iletisim"
            className="inline-flex min-h-11 items-center rounded-full border border-stone-300/80 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400"
          >
            Mesaj Gönder
          </Link>
          <CartLink />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/iletisim"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-700 shadow-sm"
            aria-label="İletişim"
          >
            <MessageCircle className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-800 shadow-sm"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-stone-200/70 bg-[#fbf7f1] px-4 pb-4 pt-3 shadow-[0_20px_40px_rgba(36,24,18,0.08)] md:hidden">
          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn("flex min-h-11 items-center rounded-2xl px-4 text-sm font-medium", isActive ? "bg-stone-950 text-white" : "bg-white text-stone-800")}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/sepet"
              onClick={() => setIsOpen(false)}
            className="flex min-h-11 items-center justify-between rounded-2xl bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-primary-deep))] px-4 text-sm font-semibold text-white shadow-lg shadow-[rgba(184,91,47,0.25)]"
          >
              <span>Sepete Git</span>
              <ShoppingBag className="size-4" />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
