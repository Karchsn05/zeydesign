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
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
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
    default: "ZeyDesign Atolye",
    template: "%s | ZeyDesign Atolye",
  },
  description: "Statik host uyumlu butik nakis ve tekstil vitrini.",
  applicationName: "ZeyDesign",
  manifest: "/site.webmanifest",
  referrer: "strict-origin-when-cross-origin",
  keywords: ["butik nakis", "tekstil", "kisiye ozel hediye", "ozel siparis", "zeydesign"],
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
    title: "ZeyDesign Atolye",
    description: "Statik host uyumlu butik nakis ve tekstil vitrini.",
    siteName: "ZeyDesign",
    url: "/",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "ZeyDesign vitrin paylasim gorseli",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ZeyDesign Atolye",
    description: "Statik host uyumlu butik nakis ve tekstil vitrini.",
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
                "--brand-primary": "#a95d3c",
                "--brand-secondary": "#31473a",
                "--surface": "#f6efe4",
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
