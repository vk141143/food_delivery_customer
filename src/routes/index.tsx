import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Bell, Search, ChevronRight, Star, Clock, BadgePercent, Heart, Plus, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { categories, banners, restaurants, recommendedFoods, allFoods, offers } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Feasty — Order food from the best restaurants near you" },
      { name: "description", content: "Discover popular restaurants, exclusive offers and fast delivery on Feasty." },
    ],
  }),
});

function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <AppShell>
      <TopBar />
      <SearchBar />
      <Banners />
      <Categories />
      <SectionTitle title="Popular restaurants" href="/search" />
      <RestaurantList />
      <SectionTitle title="Recommended for you" href="/search" />
      <FoodGrid />
      <SectionTitle title="Featured offers" href="/offers" />
      <OffersRow />
      <div className="h-6" />
    </AppShell>
  );
}

function TopBar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 glass px-5 pt-[calc(env(safe-area-inset-top)+14px)] pb-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-muted-foreground">Hi {user?.name} 👋</p>
          <button className="mt-0.5 flex min-w-0 items-center gap-1.5 text-left">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate text-[15px] font-semibold text-foreground">
              221B Baker Street, Mumbai
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        </div>
        <button
          aria-label="Notifications"
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card shadow-soft transition-transform active:scale-95"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
        </button>
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="px-5 pt-4">
      <Link
        to="/search"
        className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-card px-4 shadow-soft transition-shadow hover:shadow-card"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
        <span className="text-[15px] text-muted-foreground">
          Search for <span className="font-medium text-foreground">biryani, pizza…</span>
        </span>
      </Link>
    </div>
  );
}

function Banners() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="mt-5 px-5" aria-label="Offers">
      <div className="relative h-40 overflow-hidden rounded-3xl shadow-card">
        {banners.map((b, i) => (
          <div
            key={b.id}
            className="absolute inset-0 flex items-center justify-between p-5 transition-opacity duration-700"
            style={{ background: b.gradient, opacity: i === idx ? 1 : 0 }}
            aria-hidden={i !== idx}
          >
            <div className="max-w-[65%] text-white">
              <span className="inline-flex rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur">
                {b.tag}
              </span>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-balance">{b.title}</h2>
              <p className="mt-1 text-[13px] font-medium opacity-90">{b.subtitle}</p>
            </div>
            <div className="text-[72px] leading-none drop-shadow-lg">{b.emoji}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <span
            key={i}
            className={
              "h-1.5 rounded-full transition-all " +
              (i === idx ? "w-6 bg-primary" : "w-1.5 bg-border")
            }
          />
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const [selected, setSelected] = useState<string | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered = selected
    ? allFoods.filter(
        (f) =>
          f.name.toLowerCase().includes(selected.toLowerCase()) ||
          f.restaurant.toLowerCase().includes(selected.toLowerCase()) ||
          f.description.toLowerCase().includes(selected.toLowerCase()) ||
          // match category name to cuisine keywords
          (() => {
            const map: Record<string, string[]> = {
              Pizza: ["pizza"],
              Burger: ["burger"],
              Biryani: ["biryani"],
              "South Indian": ["dosa", "idli", "uttapam", "south indian", "filter coffee"],
              "North Indian": ["butter chicken", "dal makhani", "naan", "paneer tikka", "seekh", "tandoor", "north indian", "mughlai", "korma"],
              Chinese: ["fried rice", "manchurian", "noodles", "dim sum", "chinese", "wok"],
              Desserts: ["cake", "gulab", "tiramisu", "cheesecake", "dessert", "sweet"],
              Drinks: ["coffee", "smoothie", "drink"],
              Healthy: ["salad", "bowl", "wrap", "acai", "healthy", "green"],
              Breakfast: ["dosa", "idli", "uttapam", "breakfast", "pancake"],
              Snacks: ["fries", "rings", "garlic bread", "snack"],
              "Ice Cream": ["ice cream"],
            };
            const keywords = map[selected] ?? [];
            return keywords.some(
              (k) =>
                f.name.toLowerCase().includes(k) ||
                f.description.toLowerCase().includes(k) ||
                f.restaurant.toLowerCase().includes(k),
            );
          })()
      )
    : [];

  return (
    <section className="mt-6" aria-label="Categories">
      <div className="flex items-baseline justify-between px-5">
        <h2 className="text-lg font-bold">What's on your mind?</h2>
        {selected && (
          <button
            onClick={() => setSelected(null)}
            className="text-[13px] font-semibold text-primary"
          >
            Clear
          </button>
        )}
      </div>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-1">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelected(selected === c.name ? null : c.name)}
            className="group flex w-[76px] shrink-0 flex-col items-center gap-2"
          >
            <span
              className={`grid h-[76px] w-[76px] place-items-center rounded-3xl bg-gradient-to-br ${c.color} text-4xl shadow-soft transition-all group-hover:-translate-y-0.5 group-active:scale-95 ${
                selected === c.name ? "ring-2 ring-primary ring-offset-2 scale-95" : ""
              }`}
            >
              {c.emoji}
            </span>
            <span
              className={"text-center text-[12px] font-medium leading-tight " + (selected === c.name ? "text-primary font-bold" : "text-foreground")}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Category items bottom sheet */}
      {selected && (
        <div className="mt-4 px-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[15px] font-extrabold">
              {categories.find((c) => c.name === selected)?.emoji} {selected}
            </h3>
            <span className="text-[12px] text-muted-foreground">{filtered.length} items</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <p className="text-3xl">🍽️</p>
              <p className="mt-2 text-[14px] font-semibold text-muted-foreground">No items found for {selected}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft"
                >
                  <button
                    onClick={() => navigate({ to: "/restaurant/$id", params: { id: f.restaurantId } })}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl"
                    style={{ background: f.gradient }}
                  >
                    {f.emoji}
                  </button>
                  <button
                    onClick={() => navigate({ to: "/restaurant/$id", params: { id: f.restaurantId } })}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-[14px] font-bold">{f.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{f.restaurant}</p>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-[13px] font-extrabold">₹{f.discountPrice ?? f.price}</span>
                      {f.discountPrice && (
                        <span className="text-[11px] text-muted-foreground line-through">₹{f.price}</span>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => addItem(f)}
                    aria-label={`Add ${f.name}`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform active:scale-90"
                  >
                    <Plus className="h-4 w-4" strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return (
    <div className="mt-7 flex items-baseline justify-between px-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <Link to={href} className="flex items-center gap-0.5 text-[13px] font-semibold text-primary">
        See all <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function VegBadge({ isVeg }: { isVeg?: boolean }) {
  return (
    <span
      className={
        "inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-[1.5px] " +
        (isVeg ? "border-success" : "border-destructive")
      }
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className={"h-1.5 w-1.5 rounded-full " + (isVeg ? "bg-success" : "bg-destructive")}
      />
    </span>
  );
}

function RestaurantList() {
  return (
    <div className="no-scrollbar mt-3 flex gap-4 overflow-x-auto px-5 pb-2">
      {restaurants.map((r) => (
        <Link
          key={r.id}
          to="/restaurant/$id"
          params={{ id: r.id }}
          className="group w-[260px] shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
        >
          <div
            className="relative flex h-36 items-center justify-center text-6xl"
            style={{ background: r.gradient }}
          >
            <span className="drop-shadow-md">{r.emoji}</span>
            <button
              aria-label="Add to wishlist"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft transition-transform active:scale-90"
            >
              <Heart className="h-4 w-4 text-foreground" />
            </button>
            {r.offer && (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <BadgePercent className="h-3 w-3" /> {r.offer}
              </span>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-[15px] font-bold">{r.name}</h3>
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-success/10 px-1.5 py-0.5 text-[12px] font-bold text-success">
                <Star className="h-3 w-3 fill-current" /> {r.rating}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{r.cuisine}</p>
            <div className="mt-2 flex items-center gap-2 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {r.deliveryTime}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{r.distance}</span>
              {r.freeDelivery && (
                <>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="font-semibold text-accent">Free delivery</span>
                </>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function FoodGrid() {
  const { addItem } = useCart();
  return (
    <div className="mt-3 grid grid-cols-2 gap-3 px-5 sm:grid-cols-2">
      {recommendedFoods.map((f) => (
        <article
          key={f.id}
          className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
        >
          <div
            className="relative flex h-32 items-center justify-center text-5xl"
            style={{ background: f.gradient }}
          >
            <span>{f.emoji}</span>
            <button
              aria-label="Add to wishlist"
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-soft"
            >
              <Heart className="h-3.5 w-3.5" />
            </button>
            {f.discountPrice && (
              <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-glow">
                {Math.round(((f.price - f.discountPrice) / f.price) * 100)}% OFF
              </span>
            )}
          </div>
          <div className="p-3">
            <div className="flex items-center gap-1.5">
              <VegBadge isVeg={f.isVeg} />
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-success">
                <Star className="h-3 w-3 fill-current" /> {f.rating}
              </span>
            </div>
            <h3 className="mt-1 truncate text-[14px] font-bold">{f.name}</h3>
            <p className="truncate text-[11px] text-muted-foreground">{f.restaurant}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-extrabold text-foreground">
                  ₹{f.discountPrice ?? f.price}
                </span>
                {f.discountPrice && (
                  <span className="text-[11px] text-muted-foreground line-through">₹{f.price}</span>
                )}
              </div>
              <button
                aria-label={`Add ${f.name}`}
                onClick={() => addItem(f)}
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform active:scale-90"
              >
                <Plus className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function OffersRow() {
  return (
    <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5 pb-2">
      {offers.map((o) => (
        <div
          key={o.id}
          className="relative flex w-[260px] shrink-0 items-center gap-4 overflow-hidden rounded-3xl p-4 text-white shadow-card"
          style={{ background: o.gradient }}
        >
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/25 text-2xl backdrop-blur">
            <BadgePercent className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold leading-tight">{o.title}</p>
            <p className="truncate text-[12px] opacity-90">{o.subtitle}</p>
            <p className="mt-1 inline-flex rounded-md bg-white/25 px-1.5 py-0.5 text-[11px] font-bold tracking-wider backdrop-blur">
              {o.code}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
