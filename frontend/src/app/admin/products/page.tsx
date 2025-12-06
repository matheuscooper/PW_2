"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import Link from "next/link";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { toast } from "@/hooks/useToast";

import { Button } from "@/components/ui/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert";

import { Skeleton } from "@/components/ui/Skeleton";
import formatBRL from "@/utils/format";

export default function AdminProductList() {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products-admin"],
    queryFn: () => api.getProducts(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      toast({
        title: "Produto removido",
        description: "Soft delete aplicado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível remover o produto.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Gerenciar Produtos
            </h1>
            <p className="text-muted-foreground">
              Administre o catálogo da loja
            </p>
          </div>

          <div className="flex gap-3">
            <Button asChild className="gap-1">
              <Link href="/admin/products/categories">
                <Plus className="h-4 w-4" />
                Nova Categoria
              </Link>
            </Button>

            <Button asChild className="gap-2">
              <Link href="/admin/products/create">
                <Plus className="h-4 w-4" />
                Novo Produto
              </Link>
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* LOADING */}
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : products && products.length > 0 ? (
                products.map((product: any) => (
                  <TableRow
                    key={product.id}
                    className={
                      product.isDeleted === "1"
                        ? "bg-red-50 dark:bg-red-900/20"
                        : ""
                    }
                  >
                    <TableCell className="font-medium">
                      {product.nome}
                    </TableCell>

                    <TableCell>{product.categoria?.nome}</TableCell>

                    <TableCell className="text-price font-semibold">
                      {formatBRL(product.preco)}
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          product.estoque > 0
                            ? "text-foreground"
                            : "text-destructive"
                        }
                      >
                        {product.estoque}
                      </span>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      {product.isDeleted === "1" ? (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded">
                          Removido
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded">
                          Ativo
                        </span>
                      )}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        {/* DELETE */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirmar exclusão
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja remover "{product.nome}"?
                                Isso apenas ocultará o produto (soft delete).
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  deleteMutation.mutate(product.id)
                                }
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40" />
                    <p className="text-muted-foreground">
                      Nenhum produto cadastrado
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
