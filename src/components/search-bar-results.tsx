import * as React from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game-type";
import { Button } from "./ui/button";

export interface SearchBarResultsProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  games: Game[];
}

const SearchBarResults = React.forwardRef<
  HTMLDivElement,
  SearchBarResultsProps
>(({ games, className, children, ...props }, ref) => {
  return (
    <div
      className={cn("absolute border", className)}
      ref={ref}
      {...props}>
      {children}
      {games.map((game, index) => (
        <div key={index}>
          <Button variant={"link"}>{game.name}</Button>
        </div>
      ))}
    </div>
  );
});

SearchBarResults.displayName = "SearchBarResults";

export { SearchBarResults };
