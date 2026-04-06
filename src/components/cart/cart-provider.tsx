"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";

import { getProductBySlug, type ProductRecord } from "@/lib/catalog";
import { LOCAL_STORAGE_CART_KEY, MAX_CART_ITEM_COUNT, MAX_CART_STORAGE_BYTES, SESSION_CART_NOTICE_KEY } from "@/lib/constants";
import { buildConfiguratorSummary } from "@/lib/product-configurator";
import { cartItemSchema, storedCartItemSchema, type CartItemInput, type StoredCartItemInput } from "@/lib/validations";

type CartContextValue = {
  items: CartItemInput[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  notice: string | null;
  addItem: (item: CartItemInput) => Promise<void>;
  updateItem: (item: CartItemInput) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clear: () => Promise<void>;
  dismissNotice: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const EMPTY_CART: CartItemInput[] = [];
const CART_CHANGE_EVENT = "zeydesign-cart-change";
const CART_TOO_LARGE_ERROR = "CART_TOO_LARGE";
const CART_INVALID_ERROR = "CART_INVALID";

function measureStorageBytes(value: string) {
  try {
    return new TextEncoder().encode(value).length;
  } catch {
    return new Blob([value]).size;
  }
}

function setCartNotice(nextValue: "recovered" | "too-large" | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!nextValue) {
      window.sessionStorage.removeItem(SESSION_CART_NOTICE_KEY);
      return;
    }

    window.sessionStorage.setItem(SESSION_CART_NOTICE_KEY, nextValue);
  } catch {}
}

function readCartNotice() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(SESSION_CART_NOTICE_KEY);
  } catch {
    return null;
  }
}

function toNoticeMessage(value: string | null) {
  if (value === "recovered") {
    return "Sepet verisi toparlandı. Bozuk görünen bazı kayıtlar temizlendi.";
  }

  if (value === "too-large") {
    return "Sepet çok büyüdüğü için son işlem tamamlanamadı. Daha az ürünle tekrar dene.";
  }

  return null;
}

function pickStoredFieldValues(fieldValues: CartItemInput["customizationPayload"]["fieldValues"]) {
  return Object.fromEntries(
    Object.entries(fieldValues).filter(([, value]) => {
      if (typeof value === "boolean") {
        return value;
      }

      return value.trim().length > 0;
    }),
  );
}

function findPreviewImage(product: ProductRecord, mediaId: string | null) {
  if (!mediaId) {
    return product.coverImage;
  }

  return product.images.find((image) => image.mediaId === mediaId)?.url ?? product.coverImage;
}

function hydrateStoredItem(stored: StoredCartItemInput): CartItemInput | null {
  const product = getProductBySlug(stored.productSlug);

  if (!product) {
    return null;
  }

  const fieldValues = Object.fromEntries(
    Object.entries(stored.fieldValues).filter(([, value]) => typeof value === "string" || typeof value === "boolean"),
  ) as Record<string, string | boolean>;
  const summary = buildConfiguratorSummary(product.configurator, fieldValues);
  const unitPrice = product.price + summary.totalDelta;

  return {
    id: stored.id,
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    quantity: stored.quantity,
    unitPrice,
    leadTimeDays: product.leadTimeDays,
    categoryName: product.category.name,
    coverImage: findPreviewImage(product, summary.activePreviewMediaId),
    customizationMode: product.customizationMode,
    customizationPayload: {
      fieldValues,
      selections: summary.selections,
      summaryLines: summary.summaryLines,
      pricing: {
        basePrice: product.price,
        totalDelta: summary.totalDelta,
        finalUnitPrice: unitPrice,
        adjustments: summary.adjustments,
      },
    },
  };
}

function toStoredCartItem(item: CartItemInput): StoredCartItemInput {
  return {
    id: item.id,
    productSlug: item.productSlug,
    quantity: item.quantity,
    fieldValues: pickStoredFieldValues(item.customizationPayload.fieldValues),
  };
}

function readCartFromStorage() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  let raw: string | null = null;

  try {
    raw = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY);
  } catch {
    return EMPTY_CART;
  }

  if (!raw) {
    return EMPTY_CART;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
      return EMPTY_CART;
    }

    const safeStoredItems = parsed.flatMap((entry) => {
      const result = storedCartItemSchema.safeParse(entry);
      return result.success ? [result.data] : [];
    });
    const hydratedEntries = safeStoredItems.flatMap((entry) => {
      const hydrated = hydrateStoredItem(entry);
      return hydrated ? [{ stored: entry, item: hydrated }] : [];
    });
    const hydratedItems = hydratedEntries.map((entry) => entry.item);

    if (safeStoredItems.length !== parsed.length || hydratedEntries.length !== safeStoredItems.length) {
      const normalizedStoredItems = hydratedEntries.map((entry) => entry.stored);
      window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(normalizedStoredItems));
      setCartNotice("recovered");
    }

    return hydratedItems;
  } catch {
    try {
      window.localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    } catch {
      return EMPTY_CART;
    }
    return EMPTY_CART;
  }
}

function writeCartToStorage(items: CartItemInput[]) {
  if (typeof window === "undefined") {
    return;
  }

  const safeItems = items.flatMap((item) => {
    const result = cartItemSchema.safeParse(item);
    return result.success ? [result.data] : [];
  });

  if (safeItems.length !== items.length) {
    throw new Error(CART_INVALID_ERROR);
  }

  if (safeItems.length > MAX_CART_ITEM_COUNT) {
    setCartNotice("too-large");
    throw new Error(CART_TOO_LARGE_ERROR);
  }

  const storedItems = safeItems.map(toStoredCartItem);
  const serialized = JSON.stringify(storedItems);

  if (measureStorageBytes(serialized) > MAX_CART_STORAGE_BYTES) {
    setCartNotice("too-large");
    throw new Error(CART_TOO_LARGE_ERROR);
  }

  try {
    window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, serialized);
    window.dispatchEvent(new Event(CART_CHANGE_EVENT));
  } catch {
    setCartNotice("too-large");
    throw new Error(CART_TOO_LARGE_ERROR);
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(CART_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CART_CHANGE_EVENT, handleChange);
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, readCartFromStorage, () => EMPTY_CART);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [noticeKey, setNoticeKey] = useState<string | null>(() => readCartNotice());

  async function addItem(item: CartItemInput) {
    writeCartToStorage([...items, item]);
  }

  async function updateItem(item: CartItemInput) {
    writeCartToStorage(items.map((entry) => (entry.id === item.id ? item : entry)));
  }

  async function removeItem(itemId: string) {
    writeCartToStorage(items.filter((entry) => entry.id !== itemId));
  }

  async function clear() {
    writeCartToStorage([]);
  }

  function dismissNotice() {
    setCartNotice(null);
    setNoticeKey(null);
  }

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const notice = useMemo(() => toNoticeMessage(noticeKey), [noticeKey]);
  const value: CartContextValue = {
    items,
    loading: !hydrated,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal,
    notice,
    addItem,
    updateItem,
    removeItem,
    clear,
    dismissNotice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart yalnizca CartProvider icinde kullanilabilir.");
  }

  return context;
}
