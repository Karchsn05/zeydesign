import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string) {
  const amount = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLeadTime(days: number) {
  if (days <= 1) {
    return "1 is gunu";
  }

  return `${days} is gunu`;
}

export function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function orderCode() {
  const now = new Date();
  const segment = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ZD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${segment}`;
}
