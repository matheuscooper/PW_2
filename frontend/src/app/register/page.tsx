"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useToast } from "@/hooks/useToast";
import { UserPlus, Store } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";

const Register = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState(""); // <-- Novo estado para CPF
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("client");
  const { register } = useAuth();
  const navigate = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- VALIDAÇÕES ---
    if (!nome.trim() || nome.length < 3) {
      console.log("❌ [REGISTER] Nome inválido");
      return toast({
        title: "Nome inválido",
        description: "Digite seu nome completo.",
        variant: "destructive",
      });
    }

    if (!cpf.trim() || cpf.length < 11) {
      console.log("❌ [REGISTER] CPF inválido");
      return toast({
        title: "CPF inválido",
        description: "Digite um CPF válido.",
        variant: "destructive",
      });
    }

    if (!email.trim()) {
      console.log("❌ [REGISTER] Email vazio");
      return toast({
        title: "E-mail obrigatório",
        description: "Digite seu e-mail.",
        variant: "destructive",
      });
    }

    if (!password || password.length < 6) {
      console.log("❌ [REGISTER] Senha fraca");
      return toast({
        title: "Senha fraca",
        description: "A senha deve ter ao menos 6 caracteres.",
        variant: "destructive",
      });
    }

    if (password !== confirmPassword) {
      console.log("❌ [REGISTER] Senhas não coincidem");
      return toast({
        title: "Senhas não coincidem",
        description: "Digite a mesma senha nos dois campos.",
        variant: "destructive",
      });
    }

    console.log("🟦 [REGISTER] Validações OK, enviando para API...");

    setIsLoading(true);

    try {
      console.log("📡 [REGISTER] Chamando register()...");
      const result = await register(nome, email, cpf, password, userType);
      console.log("🟢 [REGISTER] Sucesso:", result);

      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo à Lojinha!",
      });

      navigate.push("/");
    } catch (err: any) {
      console.log("🔴 [REGISTER] Erro na API:", err);

      toast({
        title: "Erro no cadastro",
        description: err.message || "Houve um erro ao cadastrar.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("⚪ [REGISTER] isLoading = false");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Store className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Criar Conta</CardTitle>
          <CardDescription>
            Cadastre-se para começar suas compras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="client">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <PasswordInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                "Cadastrando..."
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Cadastrar
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
