"use client";

import Link from "next/link";
import { Product } from "@/services/api";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Package, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import formatBRL from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const preco = parseFloat(product.preco);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);

    toast({
      title: "Adicionado ao carrinho!",
      description: product.nome,
    });
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-shadow-card">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
          <Package className="h-24 w-24 text-muted-foreground/40 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <CardContent className="p-4 space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.categoria?.nome}
          </Badge>

          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.nome}
          </h3>

          {product.descricao && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descricao}
            </p>
          )}

          <span className="text-2xl font-bold text-price">
            {formatBRL(preco)}
          </span>

          <p className="text-xs text-muted-foreground">
            {product.estoque > 0
              ? `${product.estoque} em estoque`
              : "Fora de estoque"}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button asChild className="flex-1" variant="outline">
          <Link href={`/products/${product.id}`}>Ver Detalhes</Link>
        </Button>

        <Button
          size="icon"
          onClick={handleAddToCart}
          disabled={product.estoque === 0}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
