import { z } from "zod";

const optionalText = z.string().trim().max(5000).nullable().optional();

export const LANDING_PAGES = ["home", "about", "contact", "shared"] as const;
export const LANDING_SECTION_TYPES = [
  "hero",
  "featured-products",
  "category-grid",
  "promise-cards",
  "process-steps",
  "cta-band",
  "faq",
  "rich-text",
  "social-strip",
] as const;

export type LandingPage = (typeof LANDING_PAGES)[number];

export const landingSectionItemSchema = z.object({
  id: z.string().trim().min(1).optional(),
  label: optionalText,
  title: optionalText,
  body: optionalText,
  value: optionalText,
  question: optionalText,
  answer: optionalText,
  href: optionalText,
  imageUrl: optionalText,
  imageAlt: optionalText,
  mediaId: optionalText,
  accentColor: optionalText,
});

export const landingSectionPayloadSchema = z.object({
  version: z.literal(2).default(2),
  sectionType: z.enum(LANDING_SECTION_TYPES),
  variant: z.string().trim().max(80).default("default"),
  content: z
    .object({
      eyebrow: optionalText,
      title: optionalText,
      body: optionalText,
      caption: optionalText,
      highlight: optionalText,
    })
    .default({}),
  items: z.array(landingSectionItemSchema).default([]),
  style: z.object({}).default({}),
  cta: z
    .object({
      label: optionalText,
      href: optionalText,
      secondaryLabel: optionalText,
      secondaryHref: optionalText,
    })
    .default({}),
  media: z.object({}).default({}),
});

export type ContentBlockLike = {
  id?: string;
  page: string;
  key: string;
  label: string;
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  payload?: unknown;
  sortOrder: number;
  visible: boolean;
};

export type LandingSectionRecord = {
  id: string;
  page: LandingPage;
  key: string;
  label: string;
  sortOrder: number;
  visible: boolean;
  payload: z.infer<typeof landingSectionPayloadSchema>;
};

function normalizePage(page: string): LandingPage {
  return LANDING_PAGES.includes(page as LandingPage) ? (page as LandingPage) : "home";
}

export function normalizeLandingSections(blocks: ContentBlockLike[]) {
  return blocks
    .filter((block) => block.visible)
    .map((block) => {
      const payload = landingSectionPayloadSchema.parse(block.payload);

      return {
        id: block.id ?? `${block.page}:${block.key}`,
        page: normalizePage(block.page),
        key: block.key,
        label: block.label,
        sortOrder: block.sortOrder,
        visible: block.visible,
        payload: {
          ...payload,
          content: {
            ...payload.content,
            eyebrow: payload.content.eyebrow ?? block.eyebrow ?? null,
            title: payload.content.title ?? block.title ?? null,
            body: payload.content.body ?? block.body ?? null,
          },
          cta: {
            ...payload.cta,
            label: payload.cta.label ?? block.ctaLabel ?? null,
            href: payload.cta.href ?? block.ctaHref ?? null,
          },
        },
      };
    })
    .sort((left, right) => {
      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      return left.key.localeCompare(right.key, "tr");
    });
}
