import { getGame } from "@/app/api/games";
import { Game } from "@/types/game";
import Image from "next/image";

type GameProps = {
  params: {
    id: string;
  };
};

export default async function GamePage({ params }: GameProps) {
  const game: Game = await getGame(params.id);

  return <div>{game.name}</div>;
}
