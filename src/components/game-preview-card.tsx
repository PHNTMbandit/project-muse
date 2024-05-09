import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game";
import { GamePlatformIcons } from "./game-platform-icons";
import * as React from "react";
import Color from "color";
import Image from "next/image";
import Link from "next/link";

export interface GamePreviewCardProps extends BentoBoxProps {
  game: Game;
}

const GamePreviewCard = React.forwardRef<
  HTMLAnchorElement,
  GamePreviewCardProps
>(({ game, className, children, ...props }, ref) => {
  return (
    <Link href={`/games/${game.id}`}>
      <BentoBox
        interactable={true}
        boxColour={Color.rgb(255, 255, 255)}
        className={cn("group flex flex-col", className)}
        {...props}>
        {children}
        <div className="relative w-full aspect-video">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            priority
            sizes="1"
            className="rounded-xl object-cover"
          />
        </div>
        <h6 className="mt-2">{game.name}</h6>
        <GamePlatformIcons
          platforms={game.platforms}
          className="grow place-content-end"
        />
      </BentoBox>
    </Link>
  );
});

GamePreviewCard.displayName = "GamePreviewCard";

export { GamePreviewCard };
