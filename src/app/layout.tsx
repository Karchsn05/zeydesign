import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { CSSProperties } from "react";

import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSiteConfig } from "@/lib/catalog";
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
