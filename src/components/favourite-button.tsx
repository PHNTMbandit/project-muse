"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PiStarBold, PiStarFill } from "react-icons/pi";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Game } from "@/types/game";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export interface FavouriteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  game: Game;
  user: User;
}

const FavouriteButton = React.forwardRef<
  HTMLButtonElement,
  FavouriteButtonProps
>(({ game, user, className, children, ...props }, ref) => {
  const { toast } = useToast();
  const supabase = createClient();
  const [isFavourited, setIsFavourited] = React.useState(false);
  const [favourites, setFavourites] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      await supabase
        .from("favourites")
        .select("id")
        .eq("user_id", user?.id)
        .eq("game_id", game.id)
        .then((response) => {
          if (response.data && response.data?.length > 0) {
            setIsFavourited(true);
          } else {
            setIsFavourited(false);
          }
        });

      await supabase
        .from("favourites")
        .select("id")
        .eq("game_id", game.id)
        .then((response) => {
          if (response.data) {
            setFavourites(response.data.length);
          }
        });
    };

    fetchData();
  }, [
    game.id,
    isFavourited,
    setIsFavourited,
    favourites,
    setFavourites,
    supabase,
    user?.id,
  ]);

  async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isFavourited) {
      await supabase
        .from("favourites")
        .insert({ game_id: game.id, user_id: user?.id })
        .then(() => setIsFavourited(true));
    } else {
      await supabase
        .from("favourites")
        .delete()
        .eq("user_id", user?.id)
        .eq("game_id", game.id)
        .then(() => setIsFavourited(false));
    }

    toast({
      title: isFavourited ? "Removed from favourites" : "Added to favourites",
      description: `${game.name}`,
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });
  }

  return (
    <Button
      className={cn("flex gap-2 items-center", className)}
      size={"icon"}
      ref={ref}
      variant={"outline"}
      {...props}
      onClick={onClick}>
      {children}
      {isFavourited ? <PiStarFill /> : <PiStarBold />}
      {favourites}
    </Button>
  );
});

FavouriteButton.displayName = "FavouriteButton";

export { FavouriteButton };
