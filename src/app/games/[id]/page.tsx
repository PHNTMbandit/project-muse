import { getGame, getGameMovies, getGameScreenshots } from "@/app/api/games";
import { BentoBox } from "@/components/bento-box";
import { Game } from "@/types/game";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getColourPalette, getMetacriticColour } from "@/utils/colour";
import getPlatformIcon, {
  removeObjectsWithDuplicateStartingString as filterSimilarPlatforms,
} from "@/utils/platform-icons";
import { GameMovie } from "@/types/movies";
import { GameScreenshot } from "@/types/screenshot";
import { Slideshow } from "@/components/slideshow";
import { formatDate } from "@/utils/date";
import { LikeButton } from "@/components/like-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex flex-col lg:grid grid-rows-12 grid-cols-12 gap-4">
      <BentoBox
        boxColour={imageColourPalette[4]}
        className="col-span-4 flex items-center">
        <h3 className="text-3xl">{game.name}</h3>
      </BentoBox>
      {/* <BentoBox
        boxColour={imageColourPalette[4]}
        className="flex flex-wrap items-center justify-center gap-2">
        {filteredPlatforms
          .sort((a, b) => b.platform.name.localeCompare(a.platform.name))
          .map((platform, index) => {
            return (
              <div key={index}>{getPlatformIcon(platform.platform.name)}</div>
            );
          })}
      </BentoBox> */}
      <div className="aspect-video relative w-full h-full col-start-5 col-span-8 row-span-6">
        <Image
          src={game.background_image}
          alt={"Background Image"}
          fill
          priority
          sizes="1"
          className="object-cover rounded-3xl shadow shadow-transparent"
        />
      </div>
      <BentoBox
        className="col-span-4 row-span-3 row-start-2"
        boxColour={imageColourPalette[0]}></BentoBox>
      <BentoBox
        className="col-span-4 row-span-2 row-start-5"
        boxColour={imageColourPalette[3]}>
        <LikeButton
          game={game}
          user={user}
          className=" scale-125"
        />
      </BentoBox>
      <Slideshow
        className="col-span-7 row-span-5"
        images={gameScreenshots.map((screenshot) => screenshot.image)}
      />
      <BentoBox
        boxColour={imageColourPalette[0]}
        header="About"
        className="col-span-5 col-start-8 row-span-4">
        <ScrollArea className="h-32">
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </ScrollArea>
      </BentoBox>
      <BentoBox
        boxColour={imageColourPalette[2]}
        header="Reviews"
        className="col-span-5 col-start-8"></BentoBox>
      {imageColourPalette.map((palette, index) => (
        <BentoBox
          key={index}
          boxColour={palette}
          className="whitespace-break-spaces col-span-2">
          {`[${index}]\n${palette.hex()}`}
        </BentoBox>
      ))}
    </section>
  );
}
