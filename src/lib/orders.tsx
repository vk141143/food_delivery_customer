import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "./cart";

export type PlacedOrder = {
  id: string;
  items: CartItem[];
  address: string;
  subtotal: number;
  delivery: number;
  tax: number;
  platform: number;
  discount: number;
  total: number;
  date: string;
  status: number;
};

interface OrdersContextType {
  orders: PlacedOrder[];
  placeOrder: (order: Omit<PlacedOrder, "id" | "date" | "status">) => string;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  const placeOrder = (order: Omit<PlacedOrder, "id" | "date" | "status">) => {
    const id = "#FE" + Math.floor(1000 + Math.random() * 9000);
    const newOrder: PlacedOrder = {
      ...order,
      id,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      status: 1,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  };

  return <OrdersContext.Provider value={{ orders, placeOrder }}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
