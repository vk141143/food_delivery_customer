import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Heart,
  Package,
  Gift,
  HelpCircle,
  ShieldCheck,
  FileText,
  LogOut,
  Pencil,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile — Feasty" }] }),
});

const groups: { title: string; items: { label: string; icon: any; hint?: string }[] }[] = [
  {
    title: "Account",
    items: [
      { label: "Saved addresses", icon: MapPin, hint: "3 saved" },
      { label: "Payment methods", icon: CreditCard, hint: "2 cards" },
      { label: "Wishlist", icon: Heart },
      { label: "Order history", icon: Package },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Refer & earn", icon: Gift, hint: "Get ₹100" },
      { label: "Help & support", icon: HelpCircle },
      { label: "Privacy policy", icon: ShieldCheck },
      { label: "Terms of service", icon: FileText },
    ],
  },
];

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <AppShell>
      <header className="relative overflow-hidden px-5 pt-[calc(env(safe-area-inset-top)+18px)] pb-8">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-warm opacity-95" />
        <div className="relative">
          <h1 className="text-xl font-extrabold text-white">My profile</h1>
          <div className="mt-5 flex items-center gap-4 rounded-3xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur-xl">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl font-extrabold text-primary shadow-glow">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-extrabold">{user?.name}</p>
              <p className="truncate text-[12px] opacity-90">{user?.email}</p>
            </div>
            <button
              aria-label="Edit profile"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/25 backdrop-blur"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-5">
        {groups.map((g) => (
          <section key={g.title} className="mt-6">
            <h2 className="text-sm font-bold text-muted-foreground">{g.title.toUpperCase()}</h2>
            <div className="mt-2 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              {g.items.map(({ label, icon: Icon, hint }) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1 text-[14px] font-semibold">{label}</span>
                  {hint && <span className="text-[12px] font-medium text-muted-foreground">{hint}</span>}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-3.5 text-[14px] font-bold text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">Feasty v1.0.0</p>
      </div>
    </AppShell>
  );
}
