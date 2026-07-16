import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your cart — Feasty" }] }),
});

function CartPage() {
  const { items, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((s, i) => s + (i.discountPrice ?? i.price) * i.qty, 0);
  const delivery = subtotal > 0 ? 29 : 0;
  const tax = Math.round(subtotal * 0.05);
  const platform = subtotal > 0 ? 5 : 0;
  const total = subtotal + delivery + tax + platform;

  if (items.length === 0) return <EmptyCart />;

  return (
    <AppShell>
      <header className="sticky top-0 z-30 glass px-5 pt-[calc(env(safe-area-inset-top)+14px)] pb-3">
        <h1 className="text-xl font-extrabold">Your cart</h1>
        <p className="text-[13px] text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </p>
      </header>

      <section className="mt-4 space-y-3 px-5">
        {items.map((f) => (
          <div
            key={f.id}
            className="flex gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft"
          >
            <div
              className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-3xl"
              style={{ background: f.gradient }}
            >
              {f.emoji}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <h3 className="truncate text-[14px] font-bold">{f.name}</h3>
                <p className="truncate text-[12px] text-muted-foreground">{f.restaurant}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-extrabold">
                  ₹{(f.discountPrice ?? f.price) * f.qty}
                </span>
                <div className="flex h-8 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-1">
                  <button
                    aria-label="Decrease"
                    onClick={() => updateQty(f.id, f.qty - 1)}
                    className="grid h-6 w-6 place-items-center rounded-full text-primary transition-transform active:scale-90"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                  <span className="w-4 text-center text-[13px] font-bold text-primary">{f.qty}</span>
                  <button
                    aria-label="Increase"
                    onClick={() => updateQty(f.id, f.qty + 1)}
                    className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-90"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <button className="mx-5 mt-4 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-left transition-colors hover:bg-primary/10">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          <Tag className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-foreground">Apply coupon</p>
          <p className="text-[12px] text-muted-foreground">3 offers available</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>

      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <h3 className="text-sm font-bold">Bill details</h3>
        <dl className="mt-3 space-y-2 text-[13px]">
          <Row label="Item total" value={`₹${subtotal}`} />
          <Row label="Delivery fee" value={`₹${delivery}`} />
          <Row label="Taxes & charges" value={`₹${tax}`} />
          <Row label="Platform fee" value={`₹${platform}`} />
          <div className="my-2 h-px bg-border" />
          <Row label="Grand total" value={`₹${total}`} bold />
        </dl>
      </section>

      <div className="fixed bottom-[76px] left-0 right-0 z-30 mx-auto max-w-2xl px-5">
        <button
          onClick={() => navigate({ to: "/checkout" })}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-primary px-5 py-3.5 text-primary-foreground shadow-glow transition-transform active:scale-[0.98]">
          <div className="text-left">
            <p className="text-[11px] font-medium opacity-90">₹{total} • {items.length} items</p>
            <p className="text-[15px] font-extrabold">Proceed to checkout</p>
          </div>
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </AppShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={"flex items-center justify-between " + (bold ? "text-[15px] font-extrabold" : "text-muted-foreground")}>
      <dt>{label}</dt>
      <dd className={bold ? "text-foreground" : "font-semibold text-foreground"}>{value}</dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <AppShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-warm text-6xl shadow-glow">
          <ShoppingBag className="h-12 w-12 text-white" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold">Your cart is empty</h2>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Looks like you haven't added anything yet. Let's find something delicious!
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-3 text-[14px] font-bold text-primary-foreground shadow-glow"
        >
          Browse restaurants
        </Link>
      </div>
    </AppShell>
  );
}
