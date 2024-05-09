import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Game } from "@/types/game";
import getPlatformIcon from "@/utils/platform-icons";

export interface GameReleasedBoxProps extends BentoBoxProps {
  game: Game;
}

const GameReleasedBox = React.forwardRef<HTMLDivElement, GameReleasedBoxProps>(
  ({ game, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("flex flex-wrap gap-2", className)}
        ref={ref}
        {...props}>
        {children}
        {game.platforms
          //   .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
          .map((platform, index) => {
            const icon = getPlatformIcon(platform.platform.name);
            return (
              <div
                key={index}
                className="grow flex items-center justify-between">
                {icon}
                <p className="text-right">{platform.released_at}</p>
              </div>
            );
          })}
      </BentoBox>
    );
  }
);

GameReleasedBox.displayName = "GameReleasedBox";

export { GameReleasedBox };
