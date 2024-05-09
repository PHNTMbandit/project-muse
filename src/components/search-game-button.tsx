import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Game } from "@/types/game";
import {
  removeObjectsWithDuplicateStartingString as filterPlatforms,
  getPlatformIconFamily,
} from "@/utils/platform-icons";

export interface SearchGameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  game: Game;
}

const SearchGameButton = React.forwardRef<
  HTMLButtonElement,
  SearchGameButtonProps
>(({ game, className, children, ...props }, ref) => {
  const filteredPlatforms = filterPlatforms(game.platforms);

  return (
    <Button
      className={cn("flex gap-4", className)}
      ref={ref}
      {...props}>
      {children}
      <h6>{game.name}</h6>
      {filteredPlatforms && (
        <ul className="flex gap-2 items-center">
          {filteredPlatforms
            .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
            .map((platform, index) => {
              return (
                <li key={index}>
                  {getPlatformIconFamily(platform.platform.name)}
                </li>
              );
            })}
        </ul>
      )}
    </Button>
  );
});

SearchGameButton.displayName = "SearchGameButton";

export { SearchGameButton };
