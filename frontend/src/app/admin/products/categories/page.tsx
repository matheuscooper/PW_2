"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Category } from "@/services/api";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/useToast";
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

const CategoryList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Categoria deletada",
        description: "A categoria foi removida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível deletar a categoria.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gerenciar Categorias
            </h1>
            <p className="text-muted-foreground mt-2">
              Crie e organize suas categorias
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/admin/products/categories/create">
              <Plus className="h-4 w-4" />
              Nova Categoria
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60%]">Nome</TableHead>
                  <TableHead className="w-[20%]">ID</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: Category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.nome}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {category.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/categories/${category.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
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
                                Tem certeza que deseja deletar a categoria "
                                {category.nome}"? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category.id)}
                              >
                                Deletar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground">
              Nenhuma categoria cadastrada
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/admin/products/categories/create">
                Criar primeira categoria
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
