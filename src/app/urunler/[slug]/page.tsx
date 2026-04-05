import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailClient } from "@/components/site/product-detail-client";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";
import { buildPageMetadata } from "@/lib/metadata";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return buildPageMetadata({
      title: "Ürün Bulunamadı",
      description: "İstenen ürün bulunamadı.",
      path: `/urunler/${slug}`,
    });
  }

  return buildPageMetadata({
    title: product.name,
    description: product.summary ?? product.description,
    path: `/urunler/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} related={getRelatedProducts(product.slug, product.category.slug)} />;
}
