// "use client";

// import { useState } from "react";
// import { api } from "@/services/api";
// import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";

// export function useProfile() {
//   const { user, refreshUser } = useAuth(); // Você já tem essa função? Se não, crio.
//   const { toast } = useToast();

//   const [isLoading, setIsLoading] = useState(false);

//   // Atualizar informações básicas (nome e email)
//   async function updateProfile(data: { nome?: string; email?: string }) {
//     try {
//       setIsLoading(true);

//       await api.updateUser(data);
//       await refreshUser?.(); // Atualiza o contexto com os novos dados

//       toast({
//         title: "Perfil atualizado!",
//         description: "Suas informações foram salvas com sucesso.",
//       });
//     } catch (err: any) {
//       toast({
//         title: "Erro ao atualizar perfil",
//         description: err.message || "Tente novamente mais tarde.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Atualizar senha
//   async function changePassword(senha: string) {
//     try {
//       setIsLoading(true);

//       await api.updateUser({ senha });

//       toast({
//         title: "Senha alterada!",
//         description: "Sua senha foi atualizada com sucesso.",
//       });
//     } catch (err: any) {
//       toast({
//         title: "Erro ao alterar senha",
//         description: err.message || "Tente novamente mais tarde.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return {
//     user,
//     isLoading,
//     updateProfile,
//     changePassword,
//   };
// }
