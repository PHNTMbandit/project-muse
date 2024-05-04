import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { ReviewButton } from "./review-button";
import { Game } from "@/types/game";
import { User } from "@supabase/supabase-js";

export interface GameReviewBoxProps extends BentoBoxProps {
  game: Game;
  reviewAmount: number | undefined;
  user: User | null;
}

const GameReviewBox = React.forwardRef<HTMLDivElement, GameReviewBoxProps>(
  ({ game, user, reviewAmount, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        <h4>{reviewAmount} Reviews</h4>
        <ReviewButton
          game={game}
          user={user}
        />
        {children}
      </BentoBox>
    );
  }
);

GameReviewBox.displayName = "GameReviewBox";

export { GameReviewBox };
