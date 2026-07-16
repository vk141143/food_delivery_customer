import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, MapPin, BadgePercent, Heart, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { restaurants, allFoods } from "@/lib/mock-data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/restaurant/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const restaurant = restaurants.find((r) => r.id === id);
  const foods = allFoods.filter((f) => f.restaurantId === id);

  if (!restaurant) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
          <p className="text-2xl">🍽️</p>
          <h2 className="mt-4 text-xl font-extrabold">Restaurant not found</h2>
          <button onClick={() => navigate({ to: "/" })} className="mt-4 text-sm font-semibold text-primary">
            Go home
          </button>
        </div>
      </AppShell>
    );
  }

  // Group foods by category (veg / non-veg)
  const vegItems = foods.filter((f) => f.isVeg);
  const nonVegItems = foods.filter((f) => !f.isVeg);

  return (
    <AppShell>
      {/* Hero */}
      <div className="relative h-52 w-full" style={{ background: restaurant.gradient }}>
        <div className="absolute inset-0 flex items-center justify-center text-8xl drop-shadow-lg">
          {restaurant.emoji}
        </div>
        <button
          onClick={() => navigate({ to: "/" })}
          className="absolute left-4 top-[calc(env(safe-area-inset-top)+12px)] grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          className="absolute right-4 top-[calc(env(safe-area-inset-top)+12px)] grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white backdrop-blur"
        >
          <Heart className="h-5 w-5" />
        </button>
        {restaurant.offer && (
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur">
            <BadgePercent className="h-3.5 w-3.5" /> {restaurant.offer}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold">{restaurant.name}</h1>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{restaurant.cuisine}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-success/10 px-2.5 py-1.5 text-[14px] font-extrabold text-success">
            <Star className="h-4 w-4 fill-current" /> {restaurant.rating}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" /> {restaurant.deliveryTime}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" /> {restaurant.distance}
          </span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="font-medium">Min order ₹{restaurant.minOrder}</span>
          {restaurant.freeDelivery && (
            <>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="font-semibold text-accent">Free delivery</span>
            </>
          )}
        </div>

        <div className="my-4 h-px bg-border" />
      </div>

      {/* Menu sections */}
      {vegItems.length > 0 && (
        <MenuSection title="🥦 Veg" items={vegItems} onAdd={addItem} />
      )}
      {nonVegItems.length > 0 && (
        <MenuSection title="🍗 Non-Veg" items={nonVegItems} onAdd={addItem} />
      )}

      <div className="h-6" />
    </AppShell>
  );
}

function MenuSection({ title, items, onAdd }: { title: string; items: ReturnType<typeof allFoods>; onAdd: (f: any) => void }) {
  return (
    <section className="px-5 mb-6">
      <h2 className="mb-3 text-[15px] font-extrabold text-foreground">{title}</h2>
      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="flex gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft">
            <div
              className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl text-4xl"
              style={{ background: f.gradient }}
            >
              {f.emoji}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      "inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-[1.5px] " +
                      (f.isVeg ? "border-success" : "border-destructive")
                    }
                  >
                    <span className={"h-1.5 w-1.5 rounded-full " + (f.isVeg ? "bg-success" : "bg-destructive")} />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-success">
                    <Star className="h-3 w-3 fill-current" /> {f.rating}
                  </span>
                </div>
                <h3 className="mt-1 text-[14px] font-bold leading-tight">{f.name}</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{f.description}</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[15px] font-extrabold">₹{f.discountPrice ?? f.price}</span>
                  {f.discountPrice && (
                    <span className="text-[11px] text-muted-foreground line-through">₹{f.price}</span>
                  )}
                </div>
                <button
                  onClick={() => onAdd(f)}
                  aria-label={`Add ${f.name}`}
                  className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform active:scale-90"
                >
                  <Plus className="h-4 w-4" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
