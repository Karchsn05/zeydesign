import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { CSSProperties } from "react";

import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteConfig } from "@/lib/catalog";
import { LEGACY_LOCAL_STORAGE_CART_KEYS, LOCAL_STORAGE_CART_KEY, MAX_CART_ITEM_COUNT, MAX_CART_STORAGE_BYTES, SESSION_CART_NOTICE_KEY } from "@/lib/constants";
import { getSiteUrl } from "@/lib/supabase";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const cartRecoveryScript = `
  (() => {
    try {
      const activeKey = ${JSON.stringify(LOCAL_STORAGE_CART_KEY)};
      const legacyKeys = ${JSON.stringify([...LEGACY_LOCAL_STORAGE_CART_KEYS])};
      const noticeKey = ${JSON.stringify(SESSION_CART_NOTICE_KEY)};
      const maxBytes = ${JSON.stringify(MAX_CART_STORAGE_BYTES)};
      const maxItems = ${JSON.stringify(MAX_CART_ITEM_COUNT)};

      const getByteSize = (value) => {
        try {
          if (typeof TextEncoder !== "undefined") {
            return new TextEncoder().encode(value).length;
          }
        } catch {}
        return new Blob([value]).size;
      };

      const writeNotice = (value) => {
        try {
          window.sessionStorage.setItem(noticeKey, value);
        } catch {}
      };

      for (const key of legacyKeys) {
        try {
          window.localStorage.removeItem(key);
        } catch {}
      }

      if (window.location.search.includes("reset-cart=1")) {
        window.localStorage.removeItem(activeKey);
        return;
      }

      const raw = window.localStorage.getItem(activeKey);
      if (!raw) return;

      if (getByteSize(raw) > maxBytes) {
        window.localStorage.removeItem(activeKey);
        writeNotice("recovered");
        return;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length > maxItems) {
        window.localStorage.removeItem(activeKey);
        writeNotice("recovered");
        return;
      }

      const safe = parsed.filter((item) => {
        return (
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.productId === "string" &&
          typeof item.productSlug === "string" &&
          typeof item.productName === "string" &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0 &&
          Number.isFinite(item.unitPrice) &&
          item.unitPrice >= 0 &&
          Number.isFinite(item.leadTimeDays) &&
          item.leadTimeDays > 0 &&
          typeof item.categoryName === "string" &&
          (item.customizationMode === "NONE" || item.customizationMode === "BASIC" || item.customizationMode === "FLEX") &&
          item.customizationPayload &&
          typeof item.customizationPayload === "object"
        );
      });

      if (safe.length !== parsed.length) {
        window.localStorage.setItem(activeKey, JSON.stringify(safe));
        writeNotice("recovered");
      }
    } catch {
      try {
        window.localStorage.removeItem(${JSON.stringify(LOCAL_STORAGE_CART_KEY)});
        window.sessionStorage.setItem(${JSON.stringify(SESSION_CART_NOTICE_KEY)}, "recovered");
      } catch {}
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: (() => {
    try {
      return new URL(getSiteUrl());
    } catch {
      return undefined;
    }
  })(),
  title: {
    default: "ZeyDesign Atölye",
    template: "%s | ZeyDesign Atölye",
  },
  description: "Butik nakış ve tekstil ürünlerini, kişiye özel seçeneklerle sıcak ve özenli bir vitrin deneyiminde keşfet.",
  applicationName: "ZeyDesign",
  manifest: "/site.webmanifest",
  referrer: "strict-origin-when-cross-origin",
  keywords: ["butik nakış", "tekstil", "kişiye özel hediye", "özel sipariş", "zeydesign"],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    title: "ZeyDesign Atölye",
    description: "Butik nakış ve tekstil ürünlerini, kişiye özel seçeneklerle sıcak ve özenli bir vitrin deneyiminde keşfet.",
    siteName: "ZeyDesign",
    url: "/",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "ZeyDesign vitrin paylaşım görseli",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ZeyDesign Atölye",
    description: "Butik nakış ve tekstil ürünlerini, kişiye özel seçeneklerle sıcak ve özenli bir vitrin deneyiminde keşfet.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSiteConfig();

  return (
    <html lang="tr" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Script id="cart-recovery" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: cartRecoveryScript }} />
        <CartProvider>
          <div
            className="app-shell min-h-screen"
            style={
              {
                "--brand-primary": "#b85b2f",
                "--brand-secondary": "#345b4a",
                "--surface": "#f8efe2",
              } as CSSProperties
            }
          >
            <SiteHeader brandName={config.brandName} tagline={config.tagline} announcement={config.announcement} />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
