import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const stored = typeof window !== "undefined" ? localStorage.getItem(`user_${email}`) : null;
    if (!stored) {
      setError("No account found. Please register first.");
      return;
    }
    const user = JSON.parse(stored);
    if (user.password !== password) {
      setError("Incorrect password.");
      return;
    }
    login(email, user.name);
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-primary text-3xl shadow-glow">
            🍔
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Feasty account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 w-full rounded-2xl border border-border bg-card pl-11 pr-12 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-gradient-primary text-[15px] font-bold text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
