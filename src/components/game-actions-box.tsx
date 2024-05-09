import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { FavouriteButton } from "./favourite-button";
import { Game } from "@/types/game";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export interface GameActionsBoxProps extends BentoBoxProps {
  game: Game;
  user: User | null;
}

const GameActionsBox = React.forwardRef<HTMLDivElement, GameActionsBoxProps>(
  ({ game, user, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("flex items-center gap-4", className)}
        ref={ref}
        {...props}>
        {children}
        {user ? (
          <>
            <FavouriteButton
              game={game}
              user={user}
              className=" scale-125"
            />
            <p>You have no friends who have favourited {game.name}</p>
          </>
        ) : (
          <p>
            <Link
              href={"/sign-up"}
              className="font-bold hover:underline">
              Sign up
            </Link>{" "}
            or{" "}
            <Link
              href={"/log-in"}
              className="font-bold hover:underline">
              Log in
            </Link>{" "}
            to favourite game
          </p>
        )}
      </BentoBox>
    );
  }
);

GameActionsBox.displayName = "GameActionsBox";

export { GameActionsBox };
