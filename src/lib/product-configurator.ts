import { z } from "zod";

export const PRODUCT_FIELD_TYPES = [
  "text",
  "textarea",
  "select",
  "radio-card",
  "color-swatch",
  "toggle",
  "image-upload",
  "note",
] as const;

export type ProductFieldType = (typeof PRODUCT_FIELD_TYPES)[number];

const optionalText = z.string().trim().max(5000).nullable().optional();

export const configuratorConditionSchema = z.object({
  fieldId: z.string().trim().min(1),
  equals: z.string().trim().nullable().optional(),
});

export const configuratorOptionSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
  helpText: optionalText,
  priceDelta: z.number().default(0),
  previewMediaId: optionalText,
  swatch: optionalText,
});

export const configuratorFieldSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  fieldType: z.enum(PRODUCT_FIELD_TYPES),
  required: z.boolean().default(false),
  placeholder: optionalText,
  helpText: optionalText,
  defaultValue: z.union([z.string(), z.boolean()]).nullable().optional(),
  accept: optionalText,
  options: z.array(configuratorOptionSchema).default([]),
  showWhen: z.array(configuratorConditionSchema).default([]),
});

export const configuratorGroupSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  description: optionalText,
  fields: z.array(configuratorFieldSchema).default([]),
});

export const productConfiguratorSchema = z.object({
  version: z.literal(2).default(2),
  groups: z.array(configuratorGroupSchema).default([]),
});

export type ConfiguratorField = z.infer<typeof configuratorFieldSchema>;
export type ProductConfigurator = z.infer<typeof productConfiguratorSchema>;
export type ConfiguratorValueMap = Record<string, string | boolean | undefined>;

export function isConfiguratorFieldVisible(field: ConfiguratorField, values: ConfiguratorValueMap) {
  if (!field.showWhen.length) {
    return true;
  }

  return field.showWhen.every((condition) => {
    const current = values[condition.fieldId];
    const currentValue = typeof current === "boolean" ? String(current) : (current ?? "");
    return (condition.equals ?? "") === currentValue;
  });
}

export function buildConfiguratorSummary(configurator: ProductConfigurator, values: ConfiguratorValueMap) {
  const selections: Array<{
    fieldId: string;
    label: string;
    value: string | boolean;
    valueLabel: string;
    priceDelta: number;
    previewMediaId: string | null;
  }> = [];
  let activePreviewMediaId: string | null = null;
  let totalDelta = 0;

  for (const group of configurator.groups) {
    for (const field of group.fields) {
      if (!isConfiguratorFieldVisible(field, values)) {
        continue;
      }

      const rawValue = values[field.id];

      if (rawValue == null || rawValue === "" || rawValue === false || field.fieldType === "note") {
        continue;
      }

      const normalizedValue = typeof rawValue === "boolean" ? rawValue : String(rawValue);
      const option = field.options.find((entry) => entry.value === normalizedValue || entry.id === normalizedValue);
      const priceDelta = option?.priceDelta ?? 0;
      const valueLabel =
        typeof normalizedValue === "boolean"
          ? normalizedValue
            ? "Evet"
            : "Hayir"
          : option?.label ?? normalizedValue;

      totalDelta += priceDelta;
      activePreviewMediaId = option?.previewMediaId ?? activePreviewMediaId;
      selections.push({
        fieldId: field.id,
        label: field.label,
        value: normalizedValue,
        valueLabel,
        priceDelta,
        previewMediaId: option?.previewMediaId ?? null,
      });
    }
  }

  return {
    selections,
    activePreviewMediaId,
    totalDelta,
    summaryLines: selections.map((selection) =>
      selection.priceDelta ? `${selection.label}: ${selection.valueLabel} (+${selection.priceDelta})` : `${selection.label}: ${selection.valueLabel}`,
    ),
    adjustments: selections.filter((selection) => selection.priceDelta !== 0).map((selection) => ({
      label: `${selection.label}: ${selection.valueLabel}`,
      amount: selection.priceDelta,
    })),
  };
}
