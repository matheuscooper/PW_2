"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Product } from "@/services/api";
import { useAuth } from "./AuthContext";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loaded } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const storageKey = useMemo(
    () => (user ? `cart_${user.id}` : "cart_guest"),
    [user]
  );

  console.log("🧩 [CART] Render:", {
    loaded,
    hydrated,
    userId: user?.id,
    storageKey,
    items,
  });

  // ────────────────────────────────────────────────────────────────
  // 1) CARREGAR O CARRINHO
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) {
      console.log("⏳ [CART] Aguardando AuthContext carregar...");
      return;
    }

    console.log("📥 [CART] Tentando carregar carrinho de:", storageKey);
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("✅ [CART] Carregado:", parsed);
        setItems(parsed);
      } catch (e) {
        console.warn("⚠ [CART] Erro ao parsear carrinho salvo:", e);
        setItems([]);
      }
    } else {
      console.log("📭 [CART] Nenhum carrinho encontrado.");
      setItems([]);
    }

    setHydrated(true); // ← ESSENCIAL: só agora estamos autorizados a salvar
  }, [storageKey, loaded]);

  // ────────────────────────────────────────────────────────────────
  // 2) SALVAR O CARRINHO SEMPRE QUE items mudar
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) {
      console.log("⏳ [CART] Não vou salvar ainda (loaded = false)");
      return;
    }
    if (!hydrated) {
      console.log("⏳ [CART] Não vou salvar ainda (hydrated = false)");
      return;
    }

    console.log("💾 [CART] Salvando em:", storageKey, items);
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey, loaded, hydrated]);

  // ────────────────────────────────────────────────────────────────
  // 3) LIMPAR OO REALIZAR LOGOUT - MAS PERMANECER COM O QUE TEMOS NO CARRINHO
  // ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleClear = () => {
      console.log("🧨 [CART] Logout → limpando carrinho");
      setHydrated(false);
      setItems([]);
    };

    window.addEventListener("cart-clear", handleClear);
    return () => window.removeEventListener("cart-clear", handleClear);
  }, []);

  // ────────────────────────────────────────────────────────────────
  // FUNÇÕES DO CARRINHO
  // ────────────────────────────────────────────────────────────────
  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        const next = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log("➕ [CART] Atualizado:", next);
        return next;
      }

      const next = [...prev, { product, quantity }];
      console.log("🛒 [CART] Adicionado:", next);
      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      console.log("🗑 [CART] Removido:", next);
      return next;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);

    setItems((prev) => {
      const next = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      console.log("✏ [CART] Quantidade atualizada:", next);
      return next;
    });
  };

  const clearCart = () => {
    console.log("🧹 [CART] clearCart()");
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.product.preco) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
