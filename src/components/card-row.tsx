import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { Card } from "./card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface CardRowProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  games: Game[];
}

const CardRow = React.forwardRef<HTMLDivElement, CardRowProps>(
  ({ games, className, children, ...props }, ref) => {
    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <ScrollArea className="w-screen whitespace-nowrap pb-4">
          <div className="flex gap-4 ">
            {games.map((game, index) => (
              <Card
                key={index}
                game={game}
              />
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
            className=""
          />
        </ScrollArea>
      </div>
    );
  }
);

CardRow.displayName = "CardRow";

export { CardRow };
