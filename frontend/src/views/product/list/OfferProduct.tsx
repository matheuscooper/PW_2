import { useQuery } from "@tanstack/react-query";
import { api, OfferProduct } from "@/services/api";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Package, ShoppingCart, Tag, Flame } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ProductSkeleton } from "./ProductSkeleton";

interface OfferProductCardProps {
  product: OfferProduct;
}

const OfferProductCard = ({ product }: OfferProductCardProps) => {
  const originalPrice = parseFloat(product.originalPrice);
  const discountedPrice = parseFloat(product.discountedPrice);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Adiciona ao carrinho com o preço com desconto
    addToCart({
      ...product,
      preco: product.discountedPrice,
    });
    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.nome} com ${product.discount} de desconto`,
    });
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:shadow-sale/20 border-sale/20 relative">
      {/* Badge de desconto */}
      <div className="absolute top-3 right-3 z-10">
        <Badge className="bg-sale text-sale-foreground font-bold text-sm px-2 py-1 flex items-center gap-1">
          <Flame className="h-3 w-3" />-{product.discount}
        </Badge>
      </div>

      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-sale/5 to-sale/10 flex items-center justify-center overflow-hidden relative">
          <Package className="h-24 w-24 text-sale/40 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 group-hover:text-sale transition-colors">
            {product.nome}
          </h3>

          {product.descricao && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descricao}
            </p>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-sale">
              R$ {discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              R$ {originalPrice.toFixed(2)}
            </span>
          </div>

          {product.estoque !== undefined && (
            <p className="text-xs text-muted-foreground">
              {product.estoque > 0
                ? `${product.estoque} em estoque`
                : "Fora de estoque"}
            </p>
          )}
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button asChild className="flex-1" variant="outline">
          <Link href={`/products/${product.id}`}>Ver Detalhes</Link>
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={handleAddToCart}
          disabled={product.estoque === 0}
          className="bg-sale hover:bg-sale/90"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface OfferProductsProps {
  limit?: number;
}

export const OfferProducts = ({ limit = 5 }: OfferProductsProps) => {
  const {
    data: offerProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offer-products", limit],
    queryFn: () => api.getOfferProducts(),
  });

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
        <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
        <p>Erro ao carregar ofertas</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sale/10 rounded-lg">
            <Tag className="h-6 w-6 text-sale" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Ofertas Especiais
          </h2>
          <Badge className="ml-2 bg-sale text-sale-foreground animate-pulse">
            <Flame className="h-3 w-3 mr-1" />
            10% OFF
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Os melhores produtos com desconto exclusivo
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : offerProducts && offerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {offerProducts.map((product) => (
            <OfferProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-40" />
          <p>Nenhuma oferta disponível no momento</p>
        </div>
      )}
    </section>
  );
};
