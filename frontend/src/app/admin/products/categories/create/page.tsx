"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/useToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

const CategoryForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  const [isSaving, setIsSaving] = useState(false);

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: () => api.getCategory(id!),
    enabled: isEditing,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        nome: category.nome,
      });
    }
  }, [category, form]);

  const createMutation = useMutation({
    mutationFn: (nome: string) => {
      console.log("API CATEGORY", nome);
      return api.createCategory(nome);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Categoria criada",
        description: "A categoria foi criada com sucesso.",
      });
      router.push("/admin/products/categories");
    },
    onError: () => {
      toast({
        title: "Erro ao criar",
        description: "Não foi possível criar a categoria.",
        variant: "destructive",
      });
      setIsSaving(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: FormValues) => api.updateCategory(id!, data.nome),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      toast({
        title: "Categoria atualizada",
        description: "A categoria foi atualizada com sucesso.",
      });
      router.push("/admin/products/categories");
    },
    onError: (err) => {
      console.log("erro", err);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar a categoria.",
        variant: "destructive",
      });
      setIsSaving(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("enviado", data);
    setIsSaving(true);
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data.nome);
    }
  };

  if (isEditing && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Skeleton className="h-10 w-48 mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/products/categories")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEditing ? "Editar Categoria" : "Nova Categoria"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Categoria *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Eletrônicos"
                          {...field}
                          disabled={isSaving}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Salvando..." : "Salvar Categoria"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryForm;
