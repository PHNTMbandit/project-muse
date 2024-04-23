import { getGame, getGameMovies, getGameScreenshots } from "@/app/api/games";
import { BentoBox } from "@/components/bento-box";
import { Game } from "@/types/game";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getColourPalette,
  getMetacriticColour,
  getPrimaryColour,
} from "@/utils/colour";
import getPlatformIcon, {
  removeObjectsWithDuplicateStartingString as filterSimilarPlatforms,
} from "@/utils/platform-icons";
import { GameMovie } from "@/types/movies";
import { GameScreenshot } from "@/types/screenshot";
import { Slideshow } from "@/components/slideshow";
import { formatDate } from "@/utils/date";
import { LikeButton } from "@/components/like-button";

type GameProps = {
  params: {
    id: string;
  };
};

export default async function GamePage({ params }: GameProps) {
  const game: Game = await getGame(params.id);
  const gameMovie: GameMovie[] = await getGameMovies(params.id);
  const gameScreenshots: GameScreenshot[] = await getGameScreenshots(params.id);
  const imageColourPalette = await getColourPalette(game.background_image);
  const sanitizedDescription = DOMPurify.sanitize(game.description, {
    USE_PROFILES: { html: false },
  });
  const filteredPlatforms = filterSimilarPlatforms(game.platforms);

  return (
    <section className="flex flex-col lg:grid grid-cols-6 gap-4">
      {imageColourPalette.map((palette, index) => (
        <BentoBox
          key={index}
          boxColour={palette}
          className="whitespace-break-spaces">
          {`[${index}]\n\n${palette.hex()}`}
        </BentoBox>
      ))}{" "}
      <div className="flex flex-col space-y-4 col-span-2">
        <div className="flex gap-4">
          <BentoBox
            boxColour={imageColourPalette[3]}
            className="grow">
            <h3 className="text-3xl">{game.name}</h3>
          </BentoBox>
          <BentoBox
            boxColour={imageColourPalette[4]}
            className="flex flex-wrap items-center justify-around gap-2">
            {filteredPlatforms
              .sort((a, b) => b.platform.name.localeCompare(a.platform.name))
              .map((platform, index) => {
                return (
                  <div key={index}>
                    {getPlatformIcon(platform.platform.name)}
                  </div>
                );
              })}
          </BentoBox>
        </div>
        <BentoBox
          className="basis-1/5 grow"
          boxColour={imageColourPalette[0]}></BentoBox>
        {game.metacritic_platforms.length > 0 && (
          <BentoBox
            className="basis-2/5 flex-none"
            boxColour={imageColourPalette[3]}
            header="Metacritic"></BentoBox>
        )}
      </div>
      <div className="aspect-video relative w-full h-full col-span-4">
        <Image
          src={game.background_image}
          alt={"Background Image"}
          fill
          priority
          sizes="1"
          className="object-cover rounded-3xl shadow shadow-transparent"
        />
      </div>
      <Slideshow
        className="col-span-3 "
        images={gameScreenshots.map((screenshot) => screenshot.image)}
      />
      <div className="flex flex-col space-y-4 col-span-3">
        <BentoBox
          boxColour={imageColourPalette[0]}
          header="About"
          className="basis-1/2 flex-none overflow-x-auto">
          <p
            className="line-clamp-6"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </BentoBox>
        <div className="basis-1/2 grow flex gap-4">
          <BentoBox
            boxColour={imageColourPalette[2]}
            header="Reviews"
            className="basis-1/2 flex flex-wrap gap-4">
            {/* {game.metacritic_platforms
              .sort((a, b) =>
                b.metascore.toString().localeCompare(a.metascore.toString())
              )
              .map((metacriticPlatform, index) => {
                const metacriticColour = getMetacriticColour(
                  metacriticPlatform.metascore
                );
                return (
                  <Link
                    key={index}
                    href={metacriticPlatform.url}
                    target={"_blank"}>
                    <Button
                      className="align-bottom gap-3"
                      style={{ backgroundColor: `#${metacriticColour}` }}>
                      {getPlatformIcon(metacriticPlatform.url)}
                      <p className="group-hover:text-background font-extrabold text-xl">
                        {metacriticPlatform.metascore}
                      </p>
                    </Button>
                  </Link>
                );
              })} */}
            {/* {game.platforms
            .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
            .map((platform, index) => {
              const platformIcon = getPlatformIcon(platform.platform.name);
              const formattedDate = formatDate(platform.released_at);
              console.log(platform.released_at);

              return (
                <div
                  key={index}
                  className="flex gap-4 justify-between">
                  <div className="flex gap-2">
                    {platformIcon}
                    <p>{platform.platform.name}</p>
                  </div>
                  <p>{formattedDate}</p>
                </div>
              );
            })} */}
          </BentoBox>
          <BentoBox
            boxColour={imageColourPalette[3]}
            header="Reviews"
            className="basis-1/2">
            <div className="flex flex-wrap gap-4"></div>
          </BentoBox>
        </div>
      </div>
    </section>
  );
}
