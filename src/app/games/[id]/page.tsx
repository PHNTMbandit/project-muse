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
    <section className="flex flex-wrap justify-center gap-4">
      <div>
        <BentoBox
          className="p-6 w-72 flex-none"
          style={{ backgroundColor: `#${imageColour}` }}>
          <h3 className="text-3xl">{game.name}</h3>
        </BentoBox>
        <BentoBox
          className="p-6 w-56 space-y-2"
          style={{ backgroundColor: `#${imageColour}` }}>
          {game.platforms.map((platform, index) => (
            <div
              key={index}
              className="flex gap-4 justify-between">
              <p>{platform.platform.name}</p>
              <p>{platform.released_at}</p>
            </div>
          ))}
        </BentoBox>
      </div>
      <BentoBox className="aspect-video w-96 flex-none">
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
      <BentoBox
        className="p-6 w-96"
        style={{ backgroundColor: `#${imageColour}` }}>
        <p className="">{game.description.replace(/<\/?p>/g, "")}</p>
      </BentoBox>
    </section>
  );
}
