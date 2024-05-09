import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { GamePlatformIcons } from "./game-platform-icons";
import { Game } from "@/types/game";

export interface GameNameBoxProps extends BentoBoxProps {
  game: Game;
}

const GameNameBox = React.forwardRef<HTMLDivElement, GameNameBoxProps>(
  ({ game, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h3 className="text-2xl font-extrabold uppercase">{game.name}</h3>
        <GamePlatformIcons platforms={game.platforms} />
      </BentoBox>
    );
  }
);

GameNameBox.displayName = " GameNameBox";

export { GameNameBox };
