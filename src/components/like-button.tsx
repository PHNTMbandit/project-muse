"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Game } from "@/types/game";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export interface LikeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  game: Game;
  user: User;
}

const LikeButton = React.forwardRef<HTMLButtonElement, LikeButtonProps>(
  ({ game, user, className, children, ...props }, ref) => {
    const { toast } = useToast();
    const supabase = createClient();
    const [isLike, setIsLike] = React.useState(false);
    const [likes, setLikes] = React.useState(0);

    React.useEffect(() => {
      const fetchLike = async () => {
        await supabase
          .from("likes")
          .select("id")
          .eq("user_id", user.id)
          .eq("game_id", game.id)
          .then((response) => {
            if (response.data && response.data?.length > 0) {
              setIsLike(true);
            } else {
              setIsLike(false);
            }
          });
      };

      const fetchLikes = async () => {
        await supabase
          .from("likes")
          .select()
          .eq("game_id", game.id)
          .then((response) => {
            if (response.data) {
              setLikes(response.data?.length);
            }
          });
      };

      fetchLike();
      fetchLikes();
    }, [game.id, likes, setLikes, isLike, setIsLike, supabase, user?.id]);

    async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (!isLike) {
        await supabase
          .from("likes")
          .insert({ game_id: game.id, user_id: user?.id })
          .then((result) => setIsLike(true));
      } else {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", user?.id)
          .eq("game_id", game.id)
          .then((result) => setIsLike(false));
      }

      toast({
        title: isLike ? "Unliked" : "Liked",
        description: `${game.name}`,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    }

    return (
      <Button
        className={cn("", className)}
        variant={"ghost"}
        size={"icon"}
        ref={ref}
        {...props}
        onClick={onClick}>
        {children}
        {isLike ? (
          <PiHeartStraightFill className="" />
        ) : (
          <PiHeartStraightLight className="" />
        )}
        {likes}
      </Button>
    );
  }
);

LikeButton.displayName = "LikeButton";

export { LikeButton };
