import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export interface CategoryCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  game: Game;
}

const CategoryCard = React.forwardRef<HTMLButtonElement, CategoryCardProps>(
  ({ game, className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-36 sm:w-56 mb-2 rounded-sm overflow-hidden group hover:outline",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <AspectRatio
          ratio={16 / 9}
          className="flex justify-center items-center">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            priority
            sizes="1"
            className="object-cover transition ease-in-out duration-300 sm:group-hover:brightness-50 sm:group-hover:scale-125"
          />
          <h4 className="absolute p-4 text-wrap opacity-0 transition ease-in-out duration-300 sm:group-hover:opacity-100">
            {game.name}
          </h4>
          <div className="absolute"></div>
        </AspectRatio>
      </button>
    );
  }
);

CategoryCard.displayName = "CategoryCard";

export { CategoryCard };
