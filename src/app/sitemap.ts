import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/supabase";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    "",
    "/urunler",
    "/hakkimizda",
    "/iletisim",
    ...getProducts().map((product) => `/urunler/${product.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
