import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Package, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: Package },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 glass"
    >
      <ul className="mx-auto flex max-w-2xl items-center justify-around px-2 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="group flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors"
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={
                    "relative flex h-9 w-9 items-center justify-center rounded-full transition-all " +
                    (active
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground group-hover:text-foreground")
                  }
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
                </span>
                <span
                  className={
                    "text-[10px] font-medium transition-colors " +
                    (active ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
