import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { Card } from "./card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface CardRowProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  title: string;
  games: Game[];
}

const CardRow = React.forwardRef<HTMLDivElement, CardRowProps>(
  ({ games, title, className, children, ...props }, ref) => {
    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h3>{title}</h3>
        <ScrollArea className="w-full h-fit whitespace-nowrap snap-x snap-start">
          <div className="flex m-2 mb-4 gap-4 snap-center">
            {games.map((game, index) => (
              <Card
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

CardRow.displayName = "CardRow";

export { CardRow };
