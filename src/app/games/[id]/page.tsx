import { getGame } from "@/app/api/games";
import { BentoBox } from "@/components/bento-box";
import { Game } from "@/types/game";
import { getColorFromURL } from "color-thief-node";
import Image from "next/image";
import rgbHex from "rgb-hex";

type GameProps = {
  params: {
    id: string;
  };
};

export default async function GamePage({ params }: GameProps) {
  const game: Game = await getGame(params.id);

  async function getPrimaryColour(): Promise<string> {
    const dominantColor = await getColorFromURL(game.background_image);
    return rgbHex(dominantColor[0], dominantColor[1], dominantColor[2]);
  }
  const imageColour = await getPrimaryColour();

  return (
    <section className="grid grid-cols-6 gap-4">
      <BentoBox
        className="p-6"
        style={{ backgroundColor: `#${imageColour}` }}>
        <h3 className="text-3xl">{game.name}</h3>
      </BentoBox>
      <BentoBox className="aspect-video col-span-2">
        <div className="relative w-full h-full">
          <Image
            src={game.background_image}
            alt={"Background Image"}
            fill
            priority
            sizes="1"
            className="object-cover rounded-3xl shadow shadow-transparent"
          />
        </div>
      </BentoBox>
    </section>
  );
}
