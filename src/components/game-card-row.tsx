import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { GameCard } from "./game-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface GameCardRowProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  title: string;
  games: Game[];
}

const GameCardRow = React.forwardRef<HTMLDivElement, GameCardRowProps>(
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
              <GameCard
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

GameCardRow.displayName = "GameCardRow";

export { GameCardRow };
