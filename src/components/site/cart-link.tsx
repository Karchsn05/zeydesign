"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/sepet"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-300/80 bg-white/90 px-4 py-2 text-sm font-medium text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <ShoppingBag className="size-4" />
      <span>Sepet</span>
      <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[var(--brand-primary)] px-2 py-0.5 text-xs font-semibold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
