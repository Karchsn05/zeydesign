import type { Metadata } from "next";

import { LandingSections } from "@/components/site/landing-sections";
import { getCategories, getFeaturedProducts, getLandingSections, getSocialLinks } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Ana Sayfa",
  description: "Butik nakış ve tekstil ürünlerini, seçenek bazlı kişiselleştirme ile incele.",
  path: "/",
});

export default function HomePage() {
  return (
    <LandingSections
      page="home"
      sections={getLandingSections("home")}
      categories={getCategories()}
      featuredProducts={getFeaturedProducts()}
      socialLinks={getSocialLinks()}
    />
  );
}
