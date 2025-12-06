"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { api, CreateProductDTO } from "@/services/api";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Text";

import { CategoryDropdown } from "@/components/ui/Combobox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { toast } from "@/hooks/useToast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

const productSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.string().refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
    message: "Preço inválido",
  }),
  estoque: z.string().optional(),
  categoriaId: z.string().min(1, "Categoria obrigatória"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm({ params }: { params: { id?: string } }) {
  const id = params?.id;
  const isEditMode = !!id;

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      preco: "",
      estoque: "",
      categoriaId: "",
    },
  });

  // PRODUCT QUERY
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id as string),
    enabled: isEditMode,
  });

  // CATEGORY QUERY
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
  });
  console.log("📦 categories:", categories);

  // Preencher o form se estiver editando
  useEffect(() => {
    if (product) {
      form.reset({
        nome: product.nome,
        descricao: product.descricao || "",
        preco: product.preco,
        estoque: product.estoque?.toString() || "",
        categoriaId: product.categoriaId,
      });
    }
  }, [product]);

  // CREATE MUTATION
  const createMutation = useMutation({
    mutationFn: (data: CreateProductDTO) => api.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Produto criado!" });
      router.push("/admin/products");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o produto",
        variant: "destructive",
      });
    },
  });

  // UPDATE MUTATION
  const updateMutation = useMutation({
    mutationFn: (data: CreateProductDTO) => api.updateProduct(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Produto atualizado!" });
      router.push("/admin/products");
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar",
        variant: "destructive",
      });
    },
  });

  // SUBMIT HANDLER
  const onSubmit = (data: ProductFormData) => {
    const payload: CreateProductDTO = {
      nome: data.nome,
      descricao: data.descricao || undefined,
      preco: data.preco,
      estoque: data.estoque ? Number(data.estoque) : undefined,
      categoriaId: data.categoriaId,
    };

    isEditMode
      ? updateMutation.mutate(payload)
      : createMutation.mutate(payload);
  };

  const loadingAll = productLoading || categoriesLoading;
  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isEditMode
            ? "Atualize os dados"
            : "Preencha para criar um novo produto"}
        </p>

        {loadingAll ? (
          <div className="space-y-4 bg-card p-6 border rounded-lg">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 bg-card p-6 border rounded-lg"
            >
              {/* NOME */}
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nome do produto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIÇÃO */}
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descreva o produto..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* PREÇO */}
              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ESTOQUE */}
              <FormField
                control={form.control}
                name="estoque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* CATEGORIA */}
              <FormField
                control={form.control}
                name="categoriaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>

                    <CategoryDropdown
                      key={categories?.length || 0}
                      categories={categories ?? []}
                      value={field.value}
                      onChange={field.onChange}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isEditMode ? "Atualizar" : "Criar Produto"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
