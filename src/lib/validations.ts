import { z } from "zod";

import { productConfiguratorSchema } from "@/lib/product-configurator";

export const customizationPayloadSchema = z.object({
  fieldValues: z.record(z.string(), z.union([z.string(), z.boolean()])).default({}),
  selections: z
    .array(
      z.object({
        fieldId: z.string().min(1),
        label: z.string().min(1),
        value: z.union([z.string(), z.boolean()]),
        valueLabel: z.string().min(1),
        priceDelta: z.number(),
        previewMediaId: z.string().nullable().optional(),
      }),
    )
    .default([]),
  summaryLines: z.array(z.string()).default([]),
  pricing: z.object({
    basePrice: z.number().nonnegative(),
    totalDelta: z.number().default(0),
    finalUnitPrice: z.number().nonnegative(),
    adjustments: z
      .array(
        z.object({
          label: z.string().min(1),
          amount: z.number(),
        }),
      )
      .default([]),
  }),
});

export const cartItemSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  leadTimeDays: z.number().int().positive(),
  categoryName: z.string().min(1),
  customizationMode: z.enum(["NONE", "BASIC", "FLEX"]),
  coverImage: z.string().nullable().optional(),
  customizationPayload: customizationPayloadSchema,
});

export const checkoutSchema = z.object({
  customerName: z.string().min(3, "Ad soyad gerekli."),
  phone: z.string().min(10, "Telefon gerekli."),
  email: z.string().email("Geçerli e-posta gir.").optional().or(z.literal("")),
  city: z.string().min(2, "Şehir gerekli."),
  district: z.string().min(2, "İlçe gerekli."),
  address: z.string().min(10, "Adres gerekli."),
  note: z.string().optional(),
  items: z.array(cartItemSchema).min(1, "Sepet boş olamaz."),
});

export const messageSchema = z
  .object({
    name: z.string().min(2, "Ad soyad gerekli."),
    phone: z.string().min(10, "Telefon gerekli.").optional().or(z.literal("")),
    email: z.string().email("Geçerli e-posta gir.").optional().or(z.literal("")),
    subject: z.string().optional(),
    message: z.string().min(10, "Mesaj en az 10 karakter olmalı."),
  })
  .superRefine((value, ctx) => {
    if (!value.phone && !value.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Telefon ya da e-posta alanlarından en az biri gerekli.",
        path: ["phone"],
      });
    }
  });

export const staticProductSchema = z.object({
  id: z.string().min(1),
  categoryId: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().nullable(),
  description: z.string().min(10),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable(),
  badge: z.string().nullable(),
  productType: z.enum(["STANDARD", "CUSTOMIZABLE", "SPECIAL_REQUEST"]),
  madeToOrder: z.boolean(),
  leadTimeDays: z.number().int().positive(),
  customizationMode: z.enum(["NONE", "BASIC", "FLEX"]),
  featured: z.boolean(),
  active: z.boolean(),
  configurator: productConfiguratorSchema,
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      altText: z.string().nullable(),
      isPrimary: z.boolean(),
      sortOrder: z.number().int(),
      mediaId: z.string().nullable(),
    }),
  ),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;
