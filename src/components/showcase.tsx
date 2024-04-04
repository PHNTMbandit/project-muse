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
import { Game } from "@/types/game-type";
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
        className={cn("flex flex-col justify-center items-center", className)}
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
          className="w-screen xl:w-1/2">
          <CarouselContent>
            {games.map((game, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent className="flex relative aspect-video items-center justify-center">
                      <Image
                        src={game.background_image}
                        alt={game.name}
                        fill
                        priority
                        sizes="1"
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    );
  }
);

Showcase.displayName = "Showcase";

export { Showcase };
