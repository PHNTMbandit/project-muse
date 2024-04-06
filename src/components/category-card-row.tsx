import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { CategoryCard } from "./category-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface CategoryCardRowProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  title: string;
  games: Game[];
}

const CategoryCardRow = React.forwardRef<HTMLDivElement, CategoryCardRowProps>(
  ({ games, title, className, children, ...props }, ref) => {
    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h3>{title}</h3>
        <ScrollArea className="w-full h-fit whitespace-nowrap snap-x snap-start">
          <div className="flex m-1 mb-2 gap-4 snap-center">
            {games.map((game, index) => (
              <CategoryCard
                key={index}
                game={game}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }
);

CategoryCardRow.displayName = "CategoryCardRow";

export { CategoryCardRow };
