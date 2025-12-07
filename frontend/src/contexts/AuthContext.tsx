"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api, User } from "@/services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    nome: string,
    email: string,
    cpf: string,
    password: string,
    userType: string
  ) => Promise<void>;
  logout: () => void;
  loaded: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ─── Load localStorage session ──────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR-safe

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.warn("⚠️ user inválido no localStorage. Limpando...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

      // opcional: aplica token automaticamente no backend
      (api as any).setToken?.(storedToken);
    }

    setLoaded(true);
  }, []);

  // ─── Login ───────────────────────────────────────────────────
  const login = async (email: string, senha: string) => {
    const response = await api.login({ email, senha });

    setToken(response.token);
    setUser(response.user);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    (api as any).setToken?.(response.token);
  };

  // ─── Register ────────────────────────────────────────────────
  const register = async (
    nome: string,
    email: string,
    cpf: string,
    password: string,
    userType: string
  ) => {
    console.log("🔵 [AUTH] Dados enviados:", {
      nome,
      email,
      password,
      cpf,
      userType,
    });

    const response = await api.register({
      nome,
      email,
      cpf,
      password,
      userType,
    });

    setUser(response.user);
    setToken(response.token);
  };

  // ─── Logout ───────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);

    // if (typeof window !== "undefined") {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    // }
    try {
      const event = new CustomEvent("cart-clear");
      window.dispatchEvent(event); // avisa o CartContext para limpar
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.userType === "admin",
        isClient: user?.userType === "cliente",
        loaded,
      }}
    >
      {loaded ? children : null}
    </AuthContext.Provider>
  );
};

// ─── Hook de acesso ─────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
