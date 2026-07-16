import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import type { Food } from "./mock-data";

export type CartItem = Food & { qty: number };

export type CartToast = { message: string; emoji: string; type: "add" | "remove" } | null;

interface CartContextType {
  items: CartItem[];
  toast: CartToast;
  addItem: (food: Food) => void;
  updateQty: (id: string, qty: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<CartToast>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (t: CartToast) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(t);
    timerRef.current = setTimeout(() => setToast(null), 2500);
  };

  const addItem = (food: Food) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === food.id);
      if (existing) {
        showToast({ message: `${food.name} quantity updated`, emoji: food.emoji, type: "add" });
        return prev.map((i) => (i.id === food.id ? { ...i, qty: i.qty + 1 } : i));
      }
      showToast({ message: `${food.name} added to cart`, emoji: food.emoji, type: "add" });
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) {
        const item = prev.find((i) => i.id === id);
        if (item) showToast({ message: `${item.name} removed from cart`, emoji: item.emoji, type: "remove" });
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  };

  return <CartContext.Provider value={{ items, toast, addItem, updateQty }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
