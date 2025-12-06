"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { ProductCard } from "@/views/product/list/ProductCard";
import { ProductSkeleton } from "@/views/product/list/ProductSkeleton";
import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { BenefitsSection } from "@/components/BenefitsSection/BenefitsSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Package, Tag, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { OfferProducts } from "@/views/product/list/OfferProduct";

const Home = () => {
  // Produtos gerais (para destaque e mais vendidos)
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products-featured"],
    queryFn: api.getProducts,
  });

  // Ofertas
  // const {
  //   data: offers,
  //   isLoading: isOffersLoading,
  //   error: offersError,
  // } = useQuery({
  //   queryKey: ["products-offers"],
  //   queryFn: async () => {
  //     console.log("🔥 Iniciando request GET /offers/list...");
  //     const res = await api.getOfferProducts();
  //     console.log("📦 Resposta bruta da API de ofertas:", res);

  //     return res?.offers ?? [];
  //   },
  // });

  const featuredProducts = products?.slice(0, 4);
  const bestSellers = products?.slice(4, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Carousel */}
      <section className="container mx-auto px-4 py-6">
        <HeroBanner />
      </section>

      {/* Benefits */}
      <BenefitsSection />

      {/* Ofertas Relâmpago
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sale/10 rounded-lg">
              <Tag className="h-6 w-6 text-sale" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Ofertas Relâmpago
            </h2>
            <Badge variant="destructive" className="ml-2">
              HOT
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Aproveite enquanto durarem os estoques
          </p>
        </div>

        {isOffersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : offers && offers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
            <p>Nenhuma oferta disponível no momento</p>
          </div>
        )}
      </section> */}
      <OfferProducts limit={5} />

      {/* Produtos em Destaque */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Produtos em Destaque
              </h2>
            </div>
            <p className="text-muted-foreground">
              Seleção especial da nossa loja
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 hidden md:flex"
          >
            <Link href="/products">
              Ver Todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
            <p>Nenhum produto disponível no momento</p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/products">
              Ver Todos os Produtos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mais Vendidos */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Mais Vendidos
            </h2>
            <Badge variant="outline" className="ml-2">
              Popular
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Os produtos favoritos dos nossos clientes
          </p>
        </div>

        {isProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products && bestSellers && bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
            <p>Nenhum produto disponível no momento</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
