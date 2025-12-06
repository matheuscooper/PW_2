import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/useToast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id!),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    toast({
      title: "Produto adicionado!",
      description: `${product?.nome} foi adicionado ao carrinho.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-20 w-20 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Produto não encontrado
          </h2>
          <Button asChild>
            <Link href="/products">Voltar para Produtos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const preco = parseFloat(product.preco);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/products" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Produtos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="rounded-lg border border-border bg-muted flex items-center justify-center aspect-square">
            <Package className="h-40 w-40 text-muted-foreground opacity-40" />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.categoria.nome}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {product.nome}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-price">
                R$ {preco.toFixed(2)}
              </span>
            </div>

            {product.descricao && (
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{product.descricao}</p>
              </div>
            )}

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Disponibilidade:</span>
                <span
                  className={`font-medium ${
                    product.estoque && product.estoque > 0
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {product.estoque && product.estoque > 0
                    ? `${product.estoque} em estoque`
                    : "Fora de estoque"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Categoria:</span>
                <span className="font-medium text-foreground">
                  {product.categoria.nome}
                </span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleAddToCart}
                disabled={!product.estoque || product.estoque === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/products">Continuar Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
