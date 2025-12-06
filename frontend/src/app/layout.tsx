import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "Lojinha",
  description: "Loja feita com Next.js + backend próprio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-background antialiased overflow-visible">
        <Providers>
          <AuthProvider>
            <CartProvider>
              <NavBar />
              <main>{children}</main>
            </CartProvider>
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
