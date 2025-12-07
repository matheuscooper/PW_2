"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";
import { Separator } from "@/components/ui/Separator";
import { toast } from "@/hooks/useToast";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  QrCode,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import formatBRL from "@/utils/format";

const Checkout = () => {
  const navigate = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const [formData, setFormData] = useState({
    fullName: user?.nome || "",
    email: user?.email || "",
    phone: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔥 handleSubmit chamado!");

    if (!user?.id) {
      console.log("❌ user.id não encontrado!", user);
      toast({
        title: "Erro",
        description: "Você precisa estar logado para finalizar a compra.",
        variant: "destructive",
      });
      navigate.push("/login");
      return;
    }

    console.log("🧩 User logado:", user.id);
    console.log("🛒 Items no carrinho:", items);

    setIsProcessing(true);

    try {
      const purchaseData = {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.product.id,
          quantidade: item.quantity,
        })),
      };

      console.log("📦 Payload enviado para API:", purchaseData);

      const response = await api.createPurchase(purchaseData);

      console.log("✅ Resposta do backend:", response);

      clearCart();

      toast({
        title: "Compra realizada!",
        description: `Pedido #${response.purchaseId.slice(0, 8)} registrado.`,
      });

      navigate.push("/purchase");
    } catch (error: any) {
      console.error("💥 ERRO AO FINALIZAR COMPRA:", error);
      console.log("📡 ERRO RECEBIDO DO BACKEND:", error?.response?.data);

      toast({
        title: "Erro ao finalizar compra",
        description: error?.response?.data?.error || error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const shipping = totalPrice > 200 ? 0 : 19.9;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/cart" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Carrinho
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Dados Pessoais
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Endereço de Entrega
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleInputChange}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Rua *</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="SP"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Forma de Pagamento
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "credit"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="credit" id="credit" />
                    <Label
                      htmlFor="credit"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <CreditCard className="w-5 h-5 text-primary" />
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "debit"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="debit" id="debit" />
                    <Label
                      htmlFor="debit"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <CreditCard className="w-5 h-5 text-primary" />
                      Cartão de Débito
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "pix"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="pix" id="pix" />
                    <Label
                      htmlFor="pix"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <QrCode className="w-5 h-5 text-primary" />
                      PIX
                      <span className="ml-auto text-sm text-sale font-medium">
                        5% de desconto
                      </span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "boleto"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label
                      htmlFor="boleto"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <Banknote className="w-5 h-5 text-primary" />
                      Boleto Bancário
                    </Label>
                  </div>
                </RadioGroup>

                {(paymentMethod === "credit" || paymentMethod === "debit") && (
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border mt-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardNumber">Número do Cartão *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardName">Nome no Cartão *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Validade *</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvv">CVV *</Label>
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="000"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-muted-foreground">
                      O QR Code para pagamento será gerado após a confirmação do
                      pedido.
                    </p>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-muted-foreground">
                      O boleto será gerado após a confirmação e enviado para seu
                      e-mail.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24 space-y-4">
                <h2 className="text-xl font-semibold">Resumo do Pedido</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          IMG
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">
                          {item.product.nome}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          R${" "}
                          {formatBRL(
                            Number(item.product.preco) * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatBRL(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={shipping === 0 ? "text-sale" : ""}>
                      {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between text-sale">
                      <span>Desconto PIX (5%)</span>
                      <span>- {formatBRL(finalTotal * 0.05)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    R${" "}
                    {paymentMethod === "pix"
                      ? (finalTotal * 0.95).toFixed(2)
                      : finalTotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Finalizar Pedido"
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compra 100% segura</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Truck className="w-4 h-4" />
                  <span>Frete grátis acima de R$ 200</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
