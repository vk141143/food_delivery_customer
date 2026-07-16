import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Trash2 } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  const { toast } = useCart();

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-2xl pb-28">{children}</div>
      <BottomNav />

      {/* Cart toast popup */}
      <div
        className={
          "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300 " +
          (toast ? "bottom-24 opacity-100 translate-y-0" : "bottom-16 opacity-0 translate-y-4 pointer-events-none")
        }
      >
        <div
          className={
            "flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card backdrop-blur min-w-[220px] max-w-[320px] " +
            (toast?.type === "remove"
              ? "bg-destructive text-white"
              : "bg-foreground text-background")
          }
        >
          <span className="text-xl">{toast?.emoji}</span>
          <p className="flex-1 text-[13px] font-semibold leading-tight">{toast?.message}</p>
          {toast?.type === "remove" ? (
            <Trash2 className="h-4 w-4 shrink-0 opacity-80" />
          ) : (
            <ShoppingCart className="h-4 w-4 shrink-0 opacity-80" />
          )}
        </div>
      </div>
    </div>
  );
}
