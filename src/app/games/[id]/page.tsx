import { getGame } from "@/app/api/games";
import { getPlatformIcon } from "@/app/api/platforms";
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
    <section className="flex flex-col lg:grid grid-cols-6 gap-4">
      <div className="flex flex-col space-y-4 col-span-2">
        <BentoBox
          className="p-6"
          style={{ backgroundColor: `#${imageColour}` }}>
          <h3 className="text-3xl">{game.name}</h3>
        </BentoBox>
        <BentoBox
          className="p-6 col-span-3 grow h-40"
          style={{ backgroundColor: `#${imageColour}` }}>
          <p className="text-ellipsis overflow-hidden h-full">
            {game.description.replace(/<\/?p>/g, "")}
          </p>
        </BentoBox>
        <BentoBox
          className="p-6 space-y-2"
          style={{ backgroundColor: `#${imageColour}` }}>
          {game.platforms
            .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
            .map((platform, index) => {
              const PlatformIcon = getPlatformIcon(platform.platform.name);
              return (
                <div
                  key={index}
                  className="flex gap-4 justify-between">
                  <div className="flex gap-2">
                    <PlatformIcon />
                    <p>{platform.platform.name}</p>
                  </div>
                  <p>{platform.released_at}</p>
                </div>
              );
            })}
        </BentoBox>
      </div>
      <BentoBox className="aspect-video col-span-4">
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
