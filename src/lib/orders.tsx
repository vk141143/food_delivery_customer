import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "./cart";

export type Feedback = {
  foodRating: number;
  driverRating: number;
  comment: string;
  tags: string[];
};

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
  status: number; // 0-4, 4 = delivered
  feedback?: Feedback;
};

interface OrdersContextType {
  orders: PlacedOrder[];
  placeOrder: (order: Omit<PlacedOrder, "id" | "date" | "status">) => string;
  markDelivered: (id: string) => void;
  advanceStatus: (id: string) => void;
  submitFeedback: (id: string, feedback: Feedback) => void;
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

  const markDelivered = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 4 } : o)));
  };

  const advanceStatus = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id && o.status < 4 ? { ...o, status: o.status + 1 } : o)));
  };

  const submitFeedback = (id: string, feedback: Feedback) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, feedback } : o)));
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, markDelivered, advanceStatus, submitFeedback }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
