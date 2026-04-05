"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

import { LOCAL_STORAGE_CART_KEY } from "@/lib/constants";
import type { CartItemInput } from "@/lib/validations";

type CartContextValue = {
  items: CartItemInput[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItemInput) => Promise<void>;
  updateItem: (item: CartItemInput) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clear: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const EMPTY_CART: CartItemInput[] = [];
const CART_CHANGE_EVENT = "zeydesign-cart-change";

function readCartFromStorage() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_CART_KEY);

  if (!raw) {
    return EMPTY_CART;
  }

  try {
    return JSON.parse(raw) as CartItemInput[];
  } catch {
    return EMPTY_CART;
  }
}

function writeCartToStorage(items: CartItemInput[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
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

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const value: CartContextValue = {
    items,
    loading: !hydrated,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal,
    addItem,
    updateItem,
    removeItem,
    clear,
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
