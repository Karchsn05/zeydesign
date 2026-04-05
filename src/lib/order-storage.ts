"use client";

import { SESSION_ORDER_KEY } from "@/lib/constants";

export type RecentOrderSnapshot = {
  orderCode: string;
  customerName: string;
  phone: string;
  grandTotal: number;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
  }>;
};

export function saveRecentOrder(snapshot: RecentOrderSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SESSION_ORDER_KEY, JSON.stringify(snapshot));
}

export function readRecentOrder() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(SESSION_ORDER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as RecentOrderSnapshot;
  } catch {
    return null;
  }
}
