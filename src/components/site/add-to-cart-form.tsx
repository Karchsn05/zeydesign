"use client";

import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import {
  buildConfiguratorSummary,
  isConfiguratorFieldVisible,
  type ConfiguratorField,
  type ConfiguratorValueMap,
} from "@/lib/product-configurator";
import type { ProductRecord } from "@/lib/catalog";
import { formatCurrency, formatLeadTime } from "@/lib/utils";

type FormErrors = Record<string, string | undefined> & {
  quantity?: string;
};

function buildInitialValues(product: ProductRecord) {
  const values: ConfiguratorValueMap = {};

  for (const group of product.configurator.groups) {
    for (const field of group.fields) {
      if (typeof field.defaultValue !== "undefined" && field.defaultValue !== null) {
        values[field.id] = field.defaultValue;
      } else if (field.fieldType === "toggle") {
        values[field.id] = false;
      } else {
        values[field.id] = "";
      }
    }
  }

  return values;
}

function fieldError(message?: string) {
  return message ? <p className="text-xs text-rose-600">{message}</p> : null;
}

function findPreviewImage(product: ProductRecord, mediaId: string | null) {
  if (!mediaId) {
    return product.coverImage;
  }

  return product.images.find((image) => image.mediaId === mediaId)?.url ?? product.coverImage;
}

export function AddToCartForm({
  product,
  onPreviewChange,
}: {
  product: ProductRecord;
  onPreviewChange?: (nextImageUrl: string | null) => void;
}) {
  const formId = `add-to-cart-${product.id}`;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState<ConfiguratorValueMap>(() => buildInitialValues(product));
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const summary = useMemo(() => buildConfiguratorSummary(product.configurator, values), [product.configurator, values]);
  const finalUnitPrice = product.price + summary.totalDelta;

  useEffect(() => {
    if (!onPreviewChange) {
      return;
    }

    onPreviewChange(findPreviewImage(product, summary.activePreviewMediaId));
  }, [onPreviewChange, product, summary.activePreviewMediaId]);

  function updateValue(fieldId: string, value: string | boolean) {
    setValues((current) => ({
      ...current,
      [fieldId]: value,
    }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!Number.isInteger(quantity) || quantity < 1) {
      nextErrors.quantity = "Adet en az 1 olmalı.";
    }

    for (const group of product.configurator.groups) {
      for (const field of group.fields) {
        if (!isConfiguratorFieldVisible(field, values) || !field.required || field.fieldType === "note") {
          continue;
        }

        const currentValue = values[field.id];
        if (currentValue == null || currentValue === "" || currentValue === false) {
          nextErrors[field.id] = "Bu alan zorunlu.";
        }
      }
    }

    return nextErrors;
  }

  function renderChoiceField(field: ConfiguratorField) {
    const value = typeof values[field.id] === "string" ? String(values[field.id]) : "";
    const isSwatch = field.fieldType === "color-swatch";

    return (
      <div className="space-y-2">
        <span className="text-sm font-medium text-stone-700">{field.label}</span>
        {field.helpText ? <p className="text-xs text-stone-500">{field.helpText}</p> : null}
        <div className={`grid gap-3 ${isSwatch ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {field.options.map((option) => {
            const selected = value === option.value || value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => updateValue(field.id, option.value)}
                className={`rounded-[1.35rem] border px-4 py-3 text-left transition ${
                  selected ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-stone-50 text-stone-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isSwatch ? <span className="inline-flex size-5 rounded-full border border-black/10" style={{ backgroundColor: option.swatch ?? "#ddd" }} /> : null}
                  <div>
                    <p className="text-sm font-semibold">{option.label}</p>
                    {option.helpText ? <p className={`mt-1 text-xs ${selected ? "text-white/70" : "text-stone-500"}`}>{option.helpText}</p> : null}
                    {option.priceDelta ? <p className={`mt-1 text-xs ${selected ? "text-white/70" : "text-[var(--brand-primary)]"}`}>{option.priceDelta > 0 ? `+${formatCurrency(option.priceDelta)}` : formatCurrency(option.priceDelta)}</p> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {fieldError(fieldErrors[field.id])}
      </div>
    );
  }

  async function onSubmit() {
    setStatus(null);
    const nextErrors = validateForm();
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const nextSummary = buildConfiguratorSummary(product.configurator, values);

    await addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      quantity,
      unitPrice: product.price + nextSummary.totalDelta,
      leadTimeDays: product.leadTimeDays,
      categoryName: product.category.name,
      coverImage: findPreviewImage(product, nextSummary.activePreviewMediaId),
      customizationMode: product.customizationMode,
      customizationPayload: {
        fieldValues: Object.fromEntries(
          Object.entries(values).filter((entry): entry is [string, string | boolean] => typeof entry[1] !== "undefined"),
        ),
        selections: nextSummary.selections,
        summaryLines: nextSummary.summaryLines,
        pricing: {
          basePrice: product.price,
          totalDelta: nextSummary.totalDelta,
          finalUnitPrice: product.price + nextSummary.totalDelta,
          adjustments: nextSummary.adjustments,
        },
      },
    });

    setStatus({ type: "success", message: "Ürün sepete eklendi." });
  }

  return (
    <div className="safe-bottom">
      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit();
        }}
        className="space-y-6 rounded-[2rem] border border-stone-200/80 bg-white/80 p-5 shadow-[var(--card-shadow)] backdrop-blur sm:p-6"
      >
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Başlangıç fiyatı</p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-stone-900 sm:text-3xl">{formatCurrency(finalUnitPrice)}</p>
              {summary.adjustments.length ? <p className="mt-1 text-xs text-stone-500">Temel fiyat {formatCurrency(product.price)} üzerine seçim etkileri uygulandı.</p> : null}
            </div>
            <p className="text-right text-sm text-stone-600">{formatLeadTime(product.leadTimeDays)} içinde hazırlanır</p>
          </div>
        </div>

        {product.configurator.groups.map((group) => {
          const visibleFields = group.fields.filter((field) => isConfiguratorFieldVisible(field, values));

          if (!visibleFields.length) {
            return null;
          }

          return (
            <section key={group.id} className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-stone-50/70 p-4">
              <div>
                <p className="text-sm font-semibold text-stone-900">{group.label}</p>
                {group.description ? <p className="mt-1 text-xs leading-6 text-stone-500">{group.description}</p> : null}
              </div>
              {visibleFields.map((field) => {
                const value = values[field.id];

                if (field.fieldType === "note") {
                  return (
                    <div key={field.id} className="rounded-[1.25rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
                      {field.helpText ?? field.label}
                    </div>
                  );
                }

                if (field.fieldType === "textarea") {
                  return (
                    <label key={field.id} className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">{field.label}</span>
                      <textarea
                        rows={4}
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) => updateValue(field.id, event.target.value)}
                        placeholder={field.placeholder ?? ""}
                        className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-primary)]"
                      />
                      {field.helpText ? <p className="text-xs text-stone-500">{field.helpText}</p> : null}
                      {fieldError(fieldErrors[field.id])}
                    </label>
                  );
                }

                if (field.fieldType === "select") {
                  return (
                    <label key={field.id} className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">{field.label}</span>
                      <select
                        value={typeof value === "string" ? value : ""}
                        onChange={(event) => updateValue(field.id, event.target.value)}
                        className="min-h-12 w-full rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-primary)]"
                      >
                        <option value="">Seçim yap</option>
                        {field.options.map((option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                            {option.priceDelta ? ` (${option.priceDelta > 0 ? "+" : ""}${formatCurrency(option.priceDelta)})` : ""}
                          </option>
                        ))}
                      </select>
                      {field.helpText ? <p className="text-xs text-stone-500">{field.helpText}</p> : null}
                      {fieldError(fieldErrors[field.id])}
                    </label>
                  );
                }

                if (field.fieldType === "radio-card" || field.fieldType === "color-swatch") {
                  return <div key={field.id}>{renderChoiceField(field)}</div>;
                }

                if (field.fieldType === "toggle") {
                  return (
                    <label key={field.id} className="flex min-h-12 items-center justify-between rounded-[1.25rem] border border-stone-200 bg-white px-4 py-3">
                      <div>
                        <span className="text-sm font-medium text-stone-800">{field.label}</span>
                        {field.helpText ? <p className="mt-1 text-xs text-stone-500">{field.helpText}</p> : null}
                        {fieldError(fieldErrors[field.id])}
                      </div>
                      <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateValue(field.id, event.target.checked)} className="size-4" />
                    </label>
                  );
                }

                return (
                  <label key={field.id} className="block space-y-2">
                    <span className="text-sm font-medium text-stone-700">{field.label}</span>
                    <input
                      value={typeof value === "string" ? value : ""}
                      onChange={(event) => updateValue(field.id, event.target.value)}
                      placeholder={field.placeholder ?? ""}
                      className="min-h-12 w-full rounded-2xl border border-stone-300 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-primary)]"
                    />
                    {field.helpText ? <p className="text-xs text-stone-500">{field.helpText}</p> : null}
                    {fieldError(fieldErrors[field.id])}
                  </label>
                );
              })}
            </section>
          );
        })}

        {summary.adjustments.length ? (
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-4">
            <p className="text-sm font-semibold text-stone-900">Fiyat kırılımı</p>
            <div className="mt-3 space-y-2 text-sm text-stone-600">
              {summary.adjustments.map((adjustment) => (
                <div key={adjustment.label} className="flex items-center justify-between gap-4">
                  <span>{adjustment.label}</span>
                  <span>{adjustment.amount > 0 ? `+${formatCurrency(adjustment.amount)}` : formatCurrency(adjustment.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Adet</span>
          <input
            min={1}
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
            className="min-h-12 w-28 rounded-2xl border border-stone-300 bg-stone-50 px-4 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-primary)]"
          />
          {fieldErrors.quantity ? <p className="text-xs text-rose-600">{fieldErrors.quantity}</p> : null}
        </label>

        {status ? <p className={status.type === "success" ? "text-sm text-emerald-700" : "text-sm text-rose-600"}>{status.message}</p> : null}

        <div className="hidden lg:block">
          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Sepete Ekle
          </button>
        </div>
      </form>

      <div className="safe-bottom-offset fixed inset-x-4 z-30 rounded-[1.6rem] border border-stone-200 bg-white/96 p-3 shadow-[0_18px_50px_rgba(36,24,18,0.18)] backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">Sepete ekle</p>
            <p className="truncate text-sm font-semibold text-stone-900">
              {formatCurrency(finalUnitPrice)} - {quantity} adet
            </p>
          </div>
          <button type="submit" form={formId} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 text-sm font-semibold text-white">
            Sepete Ekle
          </button>
        </div>
        {fieldErrors.quantity ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.quantity}</p> : null}
        {status ? <p className={status.type === "success" ? "mt-2 text-sm text-emerald-700" : "mt-2 text-sm text-rose-600"}>{status.message}</p> : null}
      </div>
    </div>
  );
}
