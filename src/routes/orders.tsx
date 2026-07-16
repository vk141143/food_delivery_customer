import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Clock, Truck, ChefHat, PackageCheck, MapPin, Check, ShoppingBag,
  Phone, MessageCircle, X, Send, ArrowLeft, Navigation,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { useOrders } from "@/lib/orders";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
  head: () => ({ meta: [{ title: "My orders — Feasty" }] }),
});

const steps = [
  { label: "Order received", icon: Check },
  { label: "Restaurant accepted", icon: PackageCheck },
  { label: "Preparing food", icon: ChefHat },
  { label: "On the way", icon: Truck },
  { label: "Delivered", icon: MapPin },
];

const DRIVER = {
  name: "Ravi Kumar",
  vehicle: "Honda Activa · MH 02 AB 1234",
  avatar: "🧑‍🦱",
  otp: "7842",
  phone: "+91 98765 43210",
};

const SUPPORT_REPLIES = [
  "Hi! I'm your Feasty support agent. How can I help you?",
  "I understand. Let me check the status of your order right away.",
  "Your order is being prepared and will be picked up shortly.",
  "Is there anything else I can help you with?",
  "Thank you for your patience! Your order is on its way. 🚀",
];

// Simulated map component
function OrderMap({ status }: { status: number }) {
  const driverVisible = status >= 3;
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100 border border-border">
      {/* Grid lines to simulate map */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#0d9488" strokeWidth="1" />
        ))}
        {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
          <line key={`v${i}`} x1={`${i * 11}%`} y1="0" x2={`${i * 11}%`} y2="100%" stroke="#0d9488" strokeWidth="1" />
        ))}
      </svg>

      {/* Roads */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 130 Q 150 100 300 130 T 600 130" stroke="white" strokeWidth="8" fill="none" opacity="0.7" />
        <path d="M 180 0 Q 200 100 180 208" stroke="white" strokeWidth="8" fill="none" opacity="0.7" />
        <path d="M 0 70 Q 100 60 200 70 T 400 65" stroke="white" strokeWidth="5" fill="none" opacity="0.5" />
      </svg>

      {/* Route line between user and restaurant */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="15%" y1="75%" x2="75%" y2="25%" stroke="#FF6B35" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" />
      </svg>

      {/* User marker */}
      <div className="absolute flex flex-col items-center" style={{ left: "12%", top: "65%" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg border-2 border-white text-base">
          📍
        </div>
        <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-blue-600 shadow">You</span>
      </div>

      {/* Restaurant marker */}
      <div className="absolute flex flex-col items-center" style={{ left: "68%", top: "15%" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg border-2 border-white text-base">
          🍴
        </div>
        <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-orange-600 shadow">Restaurant</span>
      </div>

      {/* Driver marker — only visible when on the way */}
      {driverVisible && (
        <div
          className="absolute flex flex-col items-center transition-all duration-1000"
          style={{ left: "42%", top: "44%" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-glow border-2 border-white text-base animate-bounce">
            🛵
          </div>
          <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary shadow">Driver</span>
        </div>
      )}

      {/* ETA badge */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-1.5 shadow-card backdrop-blur">
        <Navigation className="h-3.5 w-3.5 text-primary" />
        <span className="text-[12px] font-bold text-foreground">~25 min away</span>
      </div>
    </div>
  );
}

// Chat screen
function ChatScreen({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { from: "agent", text: SUPPORT_REPLIES[0] },
  ]);
  const [input, setInput] = useState("");
  const [replyIdx, setReplyIdx] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      const reply = SUPPORT_REPLIES[replyIdx % SUPPORT_REPLIES.length];
      setMessages((m) => [...m, { from: "agent", text: reply }]);
      setReplyIdx((i) => i + 1);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-warm px-5 pt-[calc(env(safe-area-inset-top)+14px)] pb-4 text-white">
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 text-xl">
          🎧
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold">Support Agent</p>
          <p className="text-[12px] opacity-80">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.from === "agent" && (
              <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
                🎧
              </div>
            )}
            <div
              className={
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-[14px] " +
                (m.from === "user"
                  ? "rounded-br-sm bg-gradient-primary text-white shadow-glow"
                  : "rounded-bl-sm bg-card border border-border text-foreground shadow-soft")
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
          className="h-11 flex-1 rounded-2xl border border-border bg-background px-4 text-[14px] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={send}
          className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-white shadow-glow transition-transform active:scale-90"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function LiveOrderCard({ order }: { order: ReturnType<typeof useOrders>["orders"][0] }) {
  const [showOtp, setShowOtp] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const driverAssigned = order.status >= 3;

  return (
    <>
      {chatOpen && <ChatScreen onClose={() => setChatOpen(false)} />}

      <section className="mx-5 mt-3 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {/* Order header */}
        <div className="flex items-center gap-3 bg-gradient-warm p-4 text-white">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/25 text-2xl backdrop-blur">
            {order.items[0]?.emoji ?? "🍽️"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-90">Live order · {order.id}</p>
            <p className="truncate text-[15px] font-extrabold">{order.items[0]?.restaurant ?? "Restaurant"}</p>
            <p className="truncate text-[12px] opacity-90">
              {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] opacity-90">Arriving in</p>
            <p className="inline-flex items-center gap-1 text-[15px] font-extrabold">
              <Clock className="h-4 w-4" /> 25 min
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="p-4 pb-0">
          <OrderMap status={order.status} />
        </div>

        {/* Tracker steps */}
        <ol className="relative space-y-4 p-5">
          {steps.map((s, i) => {
            const done = i < order.status;
            const current = i === order.status;
            const Icon = s.icon;
            return (
              <li key={s.label} className="relative flex items-center gap-3 pl-1">
                {i < steps.length - 1 && (
                  <span className={"absolute left-[19px] top-9 h-4 w-0.5 " + (done ? "bg-primary" : "bg-border")} />
                )}
                <span
                  className={
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors " +
                    (done
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : current
                        ? "bg-primary/15 text-primary animate-pulse-ring"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <p className={"text-[14px] " + (done || current ? "font-bold text-foreground" : "font-medium text-muted-foreground")}>
                    {s.label}
                  </p>
                  {current && <p className="text-[12px] text-primary">In progress…</p>}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Driver details */}
        <div className="mx-4 mb-4 rounded-2xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-warm text-3xl shadow-soft">
              {DRIVER.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-extrabold">{DRIVER.name}</p>
              <p className="text-[12px] text-muted-foreground">{DRIVER.vehicle}</p>
              {driverAssigned ? (
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                  🛵 On the way
                </span>
              ) : (
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  ⏳ Assigning driver…
                </span>
              )}
            </div>

            {/* OTP */}
            <button
              onClick={() => setShowOtp((v) => !v)}
              className="flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/5 px-3 py-2"
            >
              <span className="text-[10px] font-semibold text-muted-foreground">OTP</span>
              <span className="text-[18px] font-extrabold text-primary tracking-widest">
                {showOtp ? DRIVER.otp : "••••"}
              </span>
              <span className="text-[10px] text-primary font-medium">{showOtp ? "hide" : "show"}</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={`tel:${DRIVER.phone}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-success/30 bg-success/10 py-2.5 text-[13px] font-bold text-success transition-colors hover:bg-success/20"
            >
              <Phone className="h-4 w-4" /> Call driver
            </a>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 py-2.5 text-[13px] font-bold text-primary transition-colors hover:bg-primary/20"
            >
              <MessageCircle className="h-4 w-4" /> Chat support
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function OrdersPage() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <AppShell>
        <header className="px-5 pt-[calc(env(safe-area-inset-top)+18px)] pb-2">
          <h1 className="text-2xl font-extrabold">My orders</h1>
        </header>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-warm shadow-glow">
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-xl font-extrabold">No orders yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Place your first order and track it here.</p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-[14px] font-bold text-primary-foreground shadow-glow"
          >
            Order now
          </button>
        </div>
      </AppShell>
    );
  }

  const [latest, ...past] = orders;

  return (
    <AppShell>
      <header className="px-5 pt-[calc(env(safe-area-inset-top)+18px)] pb-2">
        <h1 className="text-2xl font-extrabold">My orders</h1>
      </header>

      <LiveOrderCard order={latest} />

      {past.length > 0 && (
        <section className="mt-6 px-5">
          <h2 className="text-sm font-bold text-muted-foreground">PAST ORDERS</h2>
          <div className="mt-3 space-y-3">
            {past.map((o) => (
              <div key={o.id} className="flex items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-muted text-3xl">
                  {o.items[0]?.emoji ?? "🍽️"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold">{o.items[0]?.restaurant ?? "Restaurant"}</p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{o.date} · {o.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-extrabold">₹{o.total}</p>
                  <button className="mt-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
