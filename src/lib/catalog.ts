import { categories } from "@/data/categories";
import { contentBlocks } from "@/data/sections";
import { products } from "@/data/products";
import { siteConfig, socialLinks, type SiteConfig, type SocialLink } from "@/data/site";
import { normalizeLandingSections, type LandingPage } from "@/lib/landing-builder";
import { staticProductSchema } from "@/lib/validations";

const parsedProducts = products.map((product) => staticProductSchema.parse(product));
const categoryMap = new Map<string, CategoryRecord>(categories.map((category) => [category.id, category]));
const parsedSections = normalizeLandingSections(contentBlocks);

export type CategoryRecord = (typeof categories)[number];
export type ProductRecord = ReturnType<typeof getProducts>[number];

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getSocialLinks(input?: { footerOnly?: boolean; contactOnly?: boolean }): SocialLink[] {
  return socialLinks.filter((link) => {
    if (input?.footerOnly && !link.showInFooter) {
      return false;
    }

    if (input?.contactOnly && !link.showInContact) {
      return false;
    }

    return link.active;
  });
}

export function getCategories() {
  return categories.filter((category) => category.active).sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getProducts(input?: { category?: string; featured?: boolean }) {
  return parsedProducts
    .filter((product) => {
      if (!product.active) {
        return false;
      }

      const category = categoryMap.get(product.categoryId);
      if (!category) {
        return false;
      }

      if (input?.featured && !product.featured) {
        return false;
      }

      if (input?.category && category.slug !== input.category) {
        return false;
      }

      return true;
    })
    .map((product) => {
      const category = categoryMap.get(product.categoryId)!;
      const images = [...product.images].sort((left, right) => left.sortOrder - right.sortOrder);

      return {
        ...product,
        category,
        images,
        coverImage: images.find((image) => image.isPrimary)?.url ?? images[0]?.url ?? null,
      };
    })
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      return left.name.localeCompare(right.name, "tr");
    });
}

export function getFeaturedProducts() {
  return getProducts({ featured: true }).slice(0, 6);
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug) ?? null;
}

export function getRelatedProducts(slug: string, categorySlug: string) {
  return getProducts({ category: categorySlug }).filter((product) => product.slug !== slug).slice(0, 3);
}

export function getLandingSections(page: Exclude<LandingPage, "shared">) {
  return parsedSections.filter((section) => section.page === page || section.page === "shared");
}
