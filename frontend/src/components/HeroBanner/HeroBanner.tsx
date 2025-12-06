import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

const banners = [
  {
    id: 1,
    title: "Super Ofertas de Verão",
    subtitle: "Até 70% OFF em produtos selecionados",
    cta: "Aproveitar Agora",
    gradient: "from-sale/90 via-sale/70 to-primary/80",
  },
  {
    id: 2,
    title: "Lançamentos da Semana",
    subtitle: "Novidades incríveis com preços especiais",
    cta: "Ver Lançamentos",
    gradient: "from-secondary via-secondary/80 to-accent/60",
  },
  {
    id: 3,
    title: "Frete Grátis",
    subtitle: "Em compras acima de R$ 99",
    cta: "Comprar Agora",
    gradient: "from-accent via-primary/60 to-secondary/80",
  },
];

export const HeroBanner = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Card
              className={`relative overflow-hidden border-0 bg-gradient-to-r ${banner.gradient} shadow-2xl`}
            >
              <div className="px-8 py-16 md:py-24 lg:py-32">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-sale-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Zap className="h-4 w-4 text-sale-foreground fill-current" />
                    <span className="text-sm font-bold text-sale-foreground">
                      OFERTA IMPERDÍVEL
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    {banner.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90">
                    {banner.subtitle}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="gap-2 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Link href="/products">
                      {banner.cta}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};
