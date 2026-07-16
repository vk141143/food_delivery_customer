import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, name: string) => {
    const u = { email, name };
    if (typeof window !== "undefined") localStorage.setItem("auth_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
