import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export interface CardProps extends React.InputHTMLAttributes<HTMLDivElement> {
  game: Game;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ game, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-56 border rounded-md overflow-hidden group",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <AspectRatio
          ratio={16 / 9}
          className="flex p-2 justify-center items-start">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            sizes="1"
            className="object-cover"
          />
          <h4 className="absolute hidden group-hover:block">{game.name}</h4>
        </AspectRatio>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
