import { createClient } from "@/utils/supabase/server";
import { Game } from "@/types/game";
import { GameDescriptionBox } from "@/components/game-description-box";
import { GameImageBox } from "@/components/game-image-box";
import { GameMetacriticBox } from "@/components/game-metacritic-box";
import { GameMovie } from "@/types/movies";
import { GameNameBox } from "@/components/game-name-box";
import { GameReviewBox } from "@/components/game-review-box";
import { GameScreenshot } from "@/types/screenshot";
import { GameScreenshotsBox } from "@/components/game-screenshots-box";
import { getColourPalette } from "@/utils/colour";
import { getGame, getGameMovies, getGameScreenshots } from "@/app/api/games";
import { getReview, getReviewAuthor, getReviews } from "./actions";
import DOMPurify from "isomorphic-dompurify";
import { Reviews } from "@/components/reviews";
import { BentoBox } from "@/components/ui/bento-box";
import { GameStoresBox } from "@/components/game-stores-box";
import { getGameStores } from "@/app/api/stores";
import { GameActionsBox } from "@/components/game-actions-box";

type GameProps = {
  params: {
    id: string;
  };
};

export default async function GamePage({ params }: GameProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const game: Game = await getGame(params.id);
  const gameMovie: GameMovie[] = await getGameMovies(params.id);
  const gameScreenshots: GameScreenshot[] = await getGameScreenshots(params.id);
  const colourPalette = await getColourPalette(game.background_image);
  const sanitizedDescription = DOMPurify.sanitize(game.description, {
    USE_PROFILES: { html: false },
  });
  const reviewData = await getReviews(game);
  const userReviewData = await getReview(game, user);
  const userReviewerData = await getReviewAuthor(user?.id);
  const gameStores = await getGameStores(game.id);

  return (
    <div>
      <section className="flex flex-col lg:grid grid-rows-11 grid-cols-12 gap-4">
        <GameNameBox
          game={game}
          boxColour={colourPalette[4]}
          className="col-span-4 flex items-center justify-between"
        />
        <GameReviewBox
          game={game}
          user={user}
          reviews={reviewData}
          reviewAuthor={userReviewerData}
          userReview={userReviewData}
          boxColour={colourPalette[0]}
          className="col-span-4 row-start-2 row-span-3"
        />
        <GameActionsBox
          game={game}
          user={user}
          boxColour={colourPalette[2]}
          className="col-span-4 row-start-5"
        />
        <GameImageBox
          backgroundImage={game.background_image}
          className=" col-start-5 col-span-8 row-span-5"
        />
        {/* <GameMetacriticBox
          boxColour={colourPalette[0]}
          metacriticPlatforms={game.metacritic_platforms}
          className="col-span-2 row-span-2 row-start-4"
        /> */}
        <GameScreenshotsBox
          screenshots={gameScreenshots}
          className="col-span-7 row-span-4"
        />
        <GameDescriptionBox
          description={sanitizedDescription}
          boxColour={colourPalette[0]}
          className="col-span-3 col-start-8 row-span-3"
        />
        <BentoBox
          boxColour={colourPalette[3]}
          className="col-span-2 col-start-11 row-span-2"
        />
        <BentoBox
          boxColour={colourPalette[3]}
          className="col-span-2 col-start-11 row-span-2"
        />
        <BentoBox
          boxColour={colourPalette[3]}
          className="col-span-3 col-start-8"
        />
      </section>
      <section className="flex flex-col gap-4 grid-cols-none grid-rows-none">
        <Reviews
          id="reviews"
          backgroundColour={colourPalette[3]}
          reviews={reviewData}
        />
        {colourPalette.map((palette, index) => (
          <BentoBox
            key={index}
            boxColour={palette}
            className="whitespace-break-spaces">
            {`[${index}]\n${palette.hex()}`}
          </BentoBox>
        ))}
      </section>
    </div>
  );
}
