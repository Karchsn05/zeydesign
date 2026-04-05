import type { RecentOrderSnapshot } from "@/lib/order-storage";
import type { CartItemInput } from "@/lib/validations";
import { formatCurrency } from "@/lib/utils";

function toWhatsAppHref(baseHref: string, text: string) {
  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}text=${encodeURIComponent(text)}`;
}

export function buildOrderWhatsAppHref(baseHref: string, order: RecentOrderSnapshot) {
  const itemLines = order.items.map((item) => `- ${item.productName} x ${item.quantity}`).join("\n");
  const message = [
    "Merhaba, siparişimi teyit etmek istiyorum.",
    `Sipariş kodu: ${order.orderCode}`,
    `Müşteri: ${order.customerName}`,
    `Telefon: ${order.phone}`,
    "Ürünler:",
    itemLines || "- Bilgi yok",
    `Toplam: ${formatCurrency(order.grandTotal)}`,
  ].join("\n");

  return toWhatsAppHref(baseHref, message);
}

export function buildContactWhatsAppHref(
  baseHref: string,
  input: {
    name: string;
    phone?: string;
    email?: string;
    subject?: string;
    message: string;
  },
) {
  const message = [
    "Merhaba, iletişim formu yerine buradan yazıyorum.",
    `Ad: ${input.name}`,
    input.phone ? `Telefon: ${input.phone}` : null,
    input.email ? `E-posta: ${input.email}` : null,
    input.subject ? `Konu: ${input.subject}` : null,
    "Mesaj:",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  return toWhatsAppHref(baseHref, message);
}

export function buildCheckoutWhatsAppHref(
  baseHref: string,
  input: {
    customerName: string;
    phone: string;
    email?: string;
    city: string;
    district: string;
    address: string;
    note?: string;
    subtotal: number;
    items: CartItemInput[];
  },
) {
  const itemLines = input.items
    .map((item) => {
      const summary = item.customizationPayload.summaryLines?.length ? ` (${item.customizationPayload.summaryLines.join(", ")})` : "";
      return `- ${item.productName} x ${item.quantity}${summary}`;
    })
    .join("\n");

  const message = [
    "Merhaba, sipariş özetimi WhatsApp üzerinden iletiyorum.",
    `Müşteri: ${input.customerName}`,
    `Telefon: ${input.phone}`,
    input.email ? `E-posta: ${input.email}` : null,
    `Şehir / İlçe: ${input.city} / ${input.district}`,
    `Adres: ${input.address}`,
    input.note ? `Not: ${input.note}` : null,
    "Ürünler:",
    itemLines || "- Bilgi yok",
    `Toplam: ${formatCurrency(input.subtotal)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return toWhatsAppHref(baseHref, message);
}
