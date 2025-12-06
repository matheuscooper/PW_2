import { Truck, Shield, CreditCard, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "Em compras acima de R$ 99",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Proteção em todas as transações",
  },
  {
    icon: CreditCard,
    title: "Parcele em até 12x",
    description: "Sem juros no cartão",
  },
  {
    icon: Headphones,
    title: "Atendimento 24/7",
    description: "Suporte sempre disponível",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
