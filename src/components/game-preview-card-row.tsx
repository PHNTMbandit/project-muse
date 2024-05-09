import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game";
import { GamePreviewCard } from "./game-preview-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface GamePreviewCardRowProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  categoryTitle: string;
  games: Game[];
}

const GamePreviewCardRow = React.forwardRef<
  HTMLDivElement,
  GamePreviewCardRowProps
>(({ categoryTitle, games, className, children, ...props }, ref) => {
  return (
    <div
      className={cn("space-y-2 w-full", className)}
      ref={ref}
      {...props}>
      {children}
      <Carousel>
        <h4 className="ml-4">{categoryTitle}</h4>
        <div className="flex ml-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <CarouselContent className="-ml-4 p-2 mr-4">
          {games
            .sort((a, b) => b.ratings_count - a.ratings_count)
            .map((game, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/5">
                <GamePreviewCard
                  key={index}
                  game={game}
                  className="w-full h-full"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
});

GamePreviewCardRow.displayName = "GamePreviewCardRow";

export { GamePreviewCardRow };
