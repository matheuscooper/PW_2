import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ShoppingBag,
  Heart,
  Shield,
  Truck,
  Award,
  Users,
  Star,
  Sparkles,
  Target,
  Zap,
  Globe,
  HeartHandshake,
} from "lucide-react";

const About = () => {
  const stats = [
    { value: "10K+", label: "Clientes Satisfeitos", icon: Users },
    { value: "5K+", label: "Produtos Vendidos", icon: ShoppingBag },
    { value: "4.9", label: "Avaliação Média", icon: Star },
    { value: "24h", label: "Suporte Dedicado", icon: Zap },
  ];

  const values = [
    {
      icon: Heart,
      title: "Paixão pelo Cliente",
      description:
        "Cada decisão é tomada pensando em você. Sua satisfação é nossa prioridade número um.",
    },
    {
      icon: Shield,
      title: "Confiança e Segurança",
      description:
        "Transações 100% seguras com criptografia de ponta e proteção total dos seus dados.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description:
        "Selecionamos apenas os melhores produtos para oferecer a você experiências excepcionais.",
    },
    {
      icon: Truck,
      title: "Entrega Expressa",
      description:
        "Logística otimizada para que seus produtos cheguem rápido e em perfeitas condições.",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "O Início",
      description:
        "Nascemos com o sonho de revolucionar o e-commerce brasileiro.",
    },
    {
      year: "2021",
      title: "Expansão",
      description: "Alcançamos 1.000 clientes e expandimos nosso catálogo.",
    },
    {
      year: "2022",
      title: "Inovação",
      description: "Lançamos nossa plataforma própria com tecnologia de ponta.",
    },
    {
      year: "2023",
      title: "Reconhecimento",
      description: "Premiados como uma das lojas mais confiáveis do Brasil.",
    },
    {
      year: "2024",
      title: "O Futuro",
      description: "Continuamos crescendo e inovando para você.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Conheça Nossa História
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Transformando
              </span>
              <br />
              <span className="text-foreground">a Forma de Comprar</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Somos mais que uma loja online. Somos uma comunidade dedicada a
              trazer os melhores produtos com a melhor experiência de compra.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-lg">
                <Link href="/products">Explorar Produtos</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-lg"
              >
                <Link href="/register">Criar Conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Nossa Missão
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Conectando Pessoas aos Melhores Produtos
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa missão é democratizar o acesso a produtos de qualidade,
                oferecendo uma experiência de compra excepcional, preços justos
                e um atendimento que realmente se importa com você.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que comprar online deve ser simples, seguro e
                prazeroso. Por isso, investimos constantemente em tecnologia e
                processos para garantir sua satisfação em cada etapa.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary/30 rounded-full" />
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-accent/30 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
                </div>

                <div className="relative z-10 text-center p-8">
                  <Globe className="w-24 h-24 text-primary mx-auto mb-4 opacity-80" />
                  <p className="text-2xl font-bold text-foreground">
                    100% Online
                  </p>
                  <p className="text-muted-foreground">Em todo o Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <HeartHandshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Nossos Valores
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O Que Nos Move
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam cada ação nossa e definem quem somos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Nossa Jornada
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Uma História de Evolução
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/30" />

                  {/* Content */}
                  <div
                    className={`flex-1 pl-20 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors">
                      <span className="text-3xl font-bold text-primary">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a milhares de clientes satisfeitos e descubra uma nova
              forma de comprar online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ver Produtos
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/register">
                  <Users className="w-5 h-5 mr-2" />
                  Criar Conta Grátis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
