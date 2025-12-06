"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Store,
  Shield,
  User,
  LogOut,
  ShoppingCart,
  Receipt,
  Home,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";

export const NavBar = () => {
  const { user, logout, isAuthenticated, isAdmin, isClient } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-secondary-foreground hover:text-primary transition-colors"
          >
            <Store className="h-6 w-6 text-primary" />
            <span>Lojinha</span>
          </Link>

          {/* Links da Nav */}
          <div className="flex items-center gap-6">
            {/* Início */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Início
            </Link>

            {/* Produtos */}
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Produtos
            </Link>

            {/* Sobre */}
            <Link
              href="/about"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
            >
              <Info className="h-4 w-4" />
              Sobre
            </Link>

            {/* Admin */}
            {isAdmin && (
              <Link
                href="/admin/products"
                className="flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}

            {/* Carrinho */}

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Carrinho
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Autenticação */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2">
                {/* Pedidos */}
                <Link
                  href="/purchase"
                  className="flex items-center gap-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Receipt className="h-4 w-4" />
                  Pedidos
                </Link>

                {/* Perfil */}
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  <User className="h-4 w-4" />
                  {user?.nome || user?.email}
                </Link>

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                asChild
                variant="default"
                size="sm"
                className="gap-2 ml-2"
              >
                <Link href="/login">
                  <User className="h-4 w-4" />
                  Entrar
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
