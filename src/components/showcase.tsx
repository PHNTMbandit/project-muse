"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Game } from "@/types/game";
import Image from "next/image";

export interface ShowcaseProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  games: Game[];
}

const Showcase = React.forwardRef<HTMLDivElement, ShowcaseProps>(
  ({ games, className, children, ...props }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 10000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full space-y-2">
          <CarouselContent>
            {games.map((game, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent className="flex relative aspect-video items-center justify-center overflow-hidden rounded-lg group">
                      <Image
                        src={game.background_image}
                        alt={game.name}
                        fill
                        priority
                        sizes="1"
                        className="object-cover  transition ease-in-out duration-700 opacity-100 group-hover:opacity-50 group-hover:scale-125 rounded-lg"
                      />
                      <div className="z-10 rounded-xl p-4 bg-white/5 shadow-lg ring-1 ring-black/5 backdrop-blur transition ease-in-out duration-700 opacity-0 scale-125 group-hover:scale-100 group-hover:opacity-100">
                        <h5>{game.name}</h5>
                        <h6>{game.metacritic}</h6>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-2 items-center justify-center">
            <CarouselPrevious />
            <div className="text-center text-sm text-muted-foreground">
              {current} of {count}
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    );
  }
);

Showcase.displayName = "Showcase";

export { Showcase };
