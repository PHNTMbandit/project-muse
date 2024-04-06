import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export interface GameCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  game: Game;
}

const GameCard = React.forwardRef<HTMLButtonElement, GameCardProps>(
  ({ game, className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-36 sm:w-56 mb-2 rounded-xl overflow-hidden group hover:outline",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <AspectRatio ratio={16 / 9}>
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            priority
            sizes="1"
            className="object-cover"
          />
        </AspectRatio>
        <div className="text-left p-4 bg-secondary h-full">
          <h4>{game.name}</h4>
        </div>
      </button>
    );
  }
);

GameCard.displayName = "GameCard";

export { GameCard };
