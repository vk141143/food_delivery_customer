import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, ArrowLeft, TrendingUp, Star, Clock, X, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { categories, restaurants, allFoods } from "@/lib/mock-data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search — Feasty" }] }),
});

const trending = ["Biryani", "Pizza", "Burger", "Momos", "Cold coffee", "Ice cream", "Dosa", "Noodles"];

function SearchPage() {
  const [query, setQuery] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();

  const matchedRestaurants = useMemo(
    () => (q ? restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)) : []),
    [q],
  );

  const matchedFoods = useMemo(
    () => (q ? allFoods.filter((f) => f.name.toLowerCase().includes(q) || f.restaurant.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)) : []),
    [q],
  );

  const hasResults = matchedRestaurants.length > 0 || matchedFoods.length > 0;

  return (
    <AppShell>
      <header className="sticky top-0 z-30 glass px-5 pt-[calc(env(safe-area-inset-top)+14px)] pb-3">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Back" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex h-11 flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-3">
            <SearchIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Restaurants, dishes, cuisines"
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search results */}
      {q ? (
        <div className="px-5 pt-4">
          {!hasResults && (
            <div className="flex flex-col items-center py-16 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-3 text-[15px] font-bold">No results for "{query}"</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different dish or restaurant name</p>
            </div>
          )}

          {matchedRestaurants.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-3 text-sm font-bold text-muted-foreground">RESTAURANTS</h2>
              <div className="space-y-3">
                {matchedRestaurants.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => navigate({ to: "/restaurant/$id", params: { id: r.id } })}
                    className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft text-left transition-all hover:shadow-card"
                  >
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: r.gradient }}>
                      {r.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold">{r.name}</p>
                      <p className="truncate text-[12px] text-muted-foreground">{r.cuisine}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-0.5 font-bold text-success">
                          <Star className="h-3 w-3 fill-current" /> {r.rating}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-0.5">
                          <Clock className="h-3 w-3" /> {r.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {matchedFoods.length > 0 && (
            <section className="mb-6">
              <h2 className="mb-3 text-sm font-bold text-muted-foreground">DISHES</h2>
              <div className="space-y-3">
                {matchedFoods.map((f) => (
                  <div key={f.id} className="flex items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft">
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
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-[13px] font-extrabold">₹{f.discountPrice ?? f.price}</span>
                        {f.discountPrice && <span className="text-[11px] text-muted-foreground line-through">₹{f.price}</span>}
                      </div>
                    </button>
                    <button
                      onClick={() => addItem(f)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform active:scale-90"
                    >
                      <Plus className="h-4 w-4" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <>
          {/* Trending */}
          <section className="px-5 pt-5">
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> TRENDING SEARCHES
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {trending.map((t) => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] font-medium shadow-soft transition-transform active:scale-95"
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* All restaurants */}
          <section className="px-5 pt-7">
            <h2 className="text-sm font-bold text-muted-foreground">ALL RESTAURANTS</h2>
            <div className="mt-3 space-y-3">
              {restaurants.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate({ to: "/restaurant/$id", params: { id: r.id } })}
                  className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 shadow-soft text-left transition-all hover:shadow-card"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: r.gradient }}>
                    {r.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold">{r.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{r.cuisine}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-0.5 font-bold text-success">
                        <Star className="h-3 w-3 fill-current" /> {r.rating}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-0.5">
                        <Clock className="h-3 w-3" /> {r.deliveryTime}
                      </span>
                      {r.freeDelivery && <><span>·</span><span className="font-semibold text-accent">Free delivery</span></>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Cuisines */}
          <section className="px-5 pt-7 pb-4">
            <h2 className="text-sm font-bold text-muted-foreground">POPULAR CUISINES</h2>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {categories.slice(0, 9).map((c) => (
                <button
                  key={c.name}
                  onClick={() => setQuery(c.name)}
                  className={`flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br ${c.color} p-4 shadow-soft transition-transform active:scale-95`}
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-[12px] font-semibold">{c.name}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}
