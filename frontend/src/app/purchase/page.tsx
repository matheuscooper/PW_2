"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { api, Purchase } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Package,
  Calendar,
  ChevronRight,
  ShoppingBag,
  Receipt,
} from "lucide-react";
import formatBRL from "@/utils/format";

const PurchaseHistory = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) return;

      try {
        const data = await api.getPurchaseHistory(user.id);
        setPurchases(data);
        console.log("📦 RESPOSTA DO BACKEND:", purchases);
      } catch (err) {
        setError("Erro ao carregar histórico de compras");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">
            Faça login para ver seu histórico
          </h2>
          <Button asChild>
            <Link href="/login">Fazer Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Receipt className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Histórico de Compras
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
                <Separator className="my-4" />
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </Button>
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Package className="w-20 h-20 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-semibold">Nenhuma compra realizada</h2>
            <p className="text-muted-foreground">
              Você ainda não fez nenhuma compra. Explore nossos produtos!
            </p>
            <Button asChild className="mt-4">
              <Link href="/products">Ver Produtos</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase.purchaseId}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        Pedido #{purchase.purchaseId.slice(0, 8)}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(purchase.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {formatBRL(purchase.total)}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Concluído
                    </span>
                  </div>
                </div>

                {purchase.items && purchase.items.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      {purchase.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {item.product?.nome ||
                                `Produto #${
                                  item.nome ||
                                  `Produto #${item.productId.slice(0, 8)}`
                                }
`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qtd: {item.quantidade} × R${" "}
                              {parseFloat(item.precoUnitario).toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            R${" "}
                            {(
                              item.quantidade * parseFloat(item.precoUnitario)
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Separator className="my-4" />

                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-2">
                    Ver detalhes
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
