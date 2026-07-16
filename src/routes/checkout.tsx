import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Pencil, Plus, Tag, ChevronRight, CheckCircle2, Locate, Phone } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Feasty" }] }),
});

const VALID_COUPONS: Record<string, number> = {
  WELCOME50: 50,
  FREEDEL: 29,
  SAVE20: 20,
  BOGO: 40,
};

function CheckoutPage() {
  const { items, updateQty } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("221B Baker Street, Mumbai");
  const [editingAddress, setEditingAddress] = useState(false);
  const [draftAddress, setDraftAddress] = useState(address);
  const [locating, setLocating] = useState(false);

  const [whatsapp, setWhatsapp] = useState(user?.phone ?? "");

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);

  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = items.reduce((s, i) => s + (i.discountPrice ?? i.price) * i.qty, 0);
  const delivery = subtotal > 0 ? 29 : 0;
  const tax = Math.round(subtotal * 0.05);
  const platform = subtotal > 0 ? 5 : 0;
  const total = Math.max(0, subtotal + delivery + tax + platform - discount);

  const handleUseLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setDraftAddress("Current Location (GPS)");
        setAddress("Current Location (GPS)");
        setLocating(false);
        setEditingAddress(false);
      },
      () => {
        setLocating(false);
        alert("Unable to fetch location. Please allow location access.");
      },
    );
  };

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setDiscount(VALID_COUPONS[code]);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon("");
      setDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setCoupon("");
    setDiscount(0);
    setCouponError("");
  };

  const handlePay = () => {
    const id = placeOrder({ items, address, subtotal, delivery, tax, platform, discount, total });
    items.forEach((i) => updateQty(i.id, 0));
    setOrderId(id);
    setOrdered(true);

    const phone = whatsapp.replace(/\D/g, "");
    if (phone.length >= 10) {
      const trackingUrl = `https://feasty.netlify.app/orders`;
      const orderDate = new Date().toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });

      const itemLines = items
        .map((i) => {
          const unitPrice = i.discountPrice ?? i.price;
          const lineTotal = unitPrice * i.qty;
          const orig = i.discountPrice ? ` ~~₹${i.price}~~` : "";
          return `  ${i.emoji} *${i.name}*${orig}\n     ${i.qty} × ₹${unitPrice} = *₹${lineTotal}*\n     📍 ${i.restaurant}`;
        })
        .join("\n\n");

      const lines = [
        `🍔 *FEASTY — Order Confirmed!* 🎉`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        `📦 *Tracking ID:* \`${id}\``,
        `📅 *Date:* ${orderDate}`,
        `📍 *Deliver to:*`,
        `   ${address}`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `🛒 *ORDER ITEMS*`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        itemLines,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `💰 *BILL SUMMARY*`,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `🧾 Item total       ₹${subtotal}`,
        `🚚 Delivery fee     ₹${delivery}`,
        `🏛️ Taxes & charges  ₹${tax}`,
        `📱 Platform fee     ₹${platform}`,
        ...(discount > 0 ? [`🎟️ Coupon (${appliedCoupon})  −₹${discount}`] : []),
        ``,
        `💳 *GRAND TOTAL: ₹${total}*`,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `⏱️ *Estimated Delivery:* 25–35 min`,
        ``,
        `🔗 *Track your order:*`,
        trackingUrl,
        ``,
        `━━━━━━━━━━━━━━━━━━━━━━`,
        `Thank you for ordering with *Feasty*! 🚀`,
        `We'll deliver hot & fresh to your door. 🍕`,
      ];

      const encoded = encodeURIComponent(lines.join("\n"));
      const fullPhone = phone.length === 10 ? `91${phone}` : phone;
      window.open(`https://wa.me/${fullPhone}?text=${encoded}`, "_blank");
    }
  };

  if (ordered) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-primary shadow-glow">
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold">Order placed!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your order <span className="font-bold text-foreground">{orderId}</span> has been placed successfully.
        </p>
        {whatsapp.replace(/\D/g, "").length >= 10 && (
          <p className="mt-2 text-sm text-muted-foreground">
            💬 Order details sent to WhatsApp{" "}
            <span className="font-bold text-foreground">{whatsapp}</span>
          </p>
        )}
        <button
          onClick={() => navigate({ to: "/orders" })}
          className="mt-8 h-14 w-full max-w-xs rounded-2xl bg-gradient-primary text-[15px] font-bold text-primary-foreground shadow-glow"
        >
          Track order
        </button>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-3 text-sm font-semibold text-primary"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <AppShell>
      <header className="sticky top-0 z-30 glass px-5 pt-[calc(env(safe-area-inset-top)+14px)] pb-3">
        <h1 className="text-xl font-extrabold">Checkout</h1>
      </header>

      {/* Address */}
      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Delivery address</h2>
          <button
            onClick={() => { setDraftAddress(address); setEditingAddress((v) => !v); }}
            className="flex items-center gap-1 text-[12px] font-semibold text-primary"
          >
            <Pencil className="h-3.5 w-3.5" /> {editingAddress ? "Cancel" : "Edit"}
          </button>
        </div>

        {editingAddress ? (
          <div className="mt-3 space-y-3">
            <textarea
              value={draftAddress}
              onChange={(e) => setDraftAddress(e.target.value)}
              rows={3}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="Enter delivery address"
            />
            <button
              onClick={handleUseLocation}
              disabled={locating}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/5 py-2.5 text-[13px] font-semibold text-primary transition-colors hover:bg-primary/10 disabled:opacity-60"
            >
              <Locate className="h-4 w-4" />
              {locating ? "Fetching location…" : "Use my current location"}
            </button>
            <button
              onClick={() => { setAddress(draftAddress); setEditingAddress(false); }}
              className="w-full rounded-2xl bg-gradient-primary py-2.5 text-[13px] font-bold text-primary-foreground shadow-glow"
            >
              Save address
            </button>
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-[14px] font-medium text-foreground">{address}</p>
          </div>
        )}
      </section>

      {/* Order items */}
      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <h2 className="text-sm font-bold">Order items</h2>
        <div className="mt-3 space-y-3">
          {items.map((f) => (
            <div key={f.id} className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl"
                style={{ background: f.gradient }}
              >
                {f.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold">{f.name}</p>
                <p className="text-[12px] text-muted-foreground">₹{f.discountPrice ?? f.price} each</p>
              </div>
              <div className="flex h-8 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-1">
                <button
                  onClick={() => updateQty(f.id, f.qty - 1)}
                  className="grid h-6 w-6 place-items-center rounded-full text-primary"
                >
                  <span className="text-lg font-bold leading-none">−</span>
                </button>
                <span className="w-4 text-center text-[13px] font-bold text-primary">{f.qty}</span>
                <button
                  onClick={() => updateQty(f.id, f.qty + 1)}
                  className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
              </div>
              <p className="w-14 text-right text-[13px] font-extrabold">
                ₹{(f.discountPrice ?? f.price) * f.qty}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp number */}
      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">WhatsApp number</h2>
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">Order confirmation will be sent to this number</p>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-background px-4">
          <span className="text-[14px] font-semibold text-muted-foreground">🇮🇳 +91</span>
          <div className="h-5 w-px bg-border" />
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Enter WhatsApp number"
            maxLength={15}
            className="h-12 flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </section>

      {/* Coupon */}
      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Apply coupon</h2>
        </div>
        {appliedCoupon ? (
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-2.5">
            <div>
              <p className="text-[13px] font-bold text-primary">{appliedCoupon} applied 🎉</p>
              <p className="text-[12px] text-muted-foreground">You save ₹{discount}</p>
            </div>
            <button onClick={handleRemoveCoupon} className="text-[12px] font-semibold text-destructive">
              Remove
            </button>
          </div>
        ) : (
          <div className="mt-3 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
              placeholder="Enter coupon code"
              className="h-11 flex-1 rounded-2xl border border-border bg-background px-4 text-[14px] uppercase tracking-wider focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleApplyCoupon}
              className="h-11 rounded-2xl bg-gradient-primary px-5 text-[13px] font-bold text-primary-foreground shadow-glow"
            >
              Apply
            </button>
          </div>
        )}
        {couponError && <p className="mt-2 text-[12px] font-medium text-destructive">{couponError}</p>}
        {!appliedCoupon && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(VALID_COUPONS).map((c) => (
              <button
                key={c}
                onClick={() => { setCoupon(c); setCouponError(""); }}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold text-primary"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Bill summary */}
      <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
        <h2 className="text-sm font-bold">Bill details</h2>
        <dl className="mt-3 space-y-2 text-[13px]">
          <BillRow label="Item total" value={`₹${subtotal}`} />
          <BillRow label="Delivery fee" value={`₹${delivery}`} />
          <BillRow label="Taxes & charges" value={`₹${tax}`} />
          <BillRow label="Platform fee" value={`₹${platform}`} />
          {discount > 0 && <BillRow label={`Coupon (${appliedCoupon})`} value={`−₹${discount}`} green />}
          <div className="my-2 h-px bg-border" />
          <BillRow label="Grand total" value={`₹${total}`} bold />
        </dl>
      </section>

      <div className="h-32" />

      {/* Pay button */}
      <div className="fixed bottom-[76px] left-0 right-0 z-30 mx-auto max-w-2xl px-5">
        <button
          onClick={handlePay}
          disabled={items.length === 0}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-primary px-5 py-3.5 text-primary-foreground shadow-glow transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          <div className="text-left">
            <p className="text-[11px] font-medium opacity-90">{items.length} items · ₹{total}</p>
            <p className="text-[15px] font-extrabold">Pay & place order</p>
          </div>
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </AppShell>
  );
}

function BillRow({ label, value, bold, green }: { label: string; value: string; bold?: boolean; green?: boolean }) {
  return (
    <div className={"flex items-center justify-between " + (bold ? "text-[15px] font-extrabold" : "text-muted-foreground")}>
      <dt>{label}</dt>
      <dd className={green ? "font-semibold text-success" : bold ? "text-foreground" : "font-semibold text-foreground"}>{value}</dd>
    </div>
  );
}
