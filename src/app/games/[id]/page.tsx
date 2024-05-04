import { BentoBox } from "@/components/ui/bento-box";
import { createClient } from "@/utils/supabase/server";
import { Game } from "@/types/game";
import { GameDescriptionBox } from "@/components/game-description-box";
import { GameImageBox } from "@/components/game-image-box";
import { GameMovie } from "@/types/movies";
import { GameNameBox } from "@/components/game-name-box";
import { GameReviewBox } from "@/components/game-review-box";
import { GameScreenshot } from "@/types/screenshot";
import { GameScreenshotsBox } from "@/components/game-screenshots-box";
import { getColourPalette } from "@/utils/colour";
import { getGame, getGameMovies, getGameScreenshots } from "@/app/api/games";
import DOMPurify from "isomorphic-dompurify";
import { Review } from "@/components/review";
import { User } from "@supabase/supabase-js";

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

  const reviewData = await supabase
    .from("reviews")
    .select()
    .eq("game_id", game.id);

  return (
    <section className="flex flex-col lg:grid grid-rows-12 grid-cols-12 gap-4">
      <GameNameBox
        gameName={game.name}
        platforms={game.platforms}
        boxColour={colourPalette[4]}
        className="col-span-4 flex items-center justify-between max-h-20"
      />
      <GameReviewBox
        game={game}
        user={user}
        reviewAmount={reviewData.data?.length}
        boxColour={colourPalette[3]}
        className="col-span-4 row-start-2 row-span-2"
      />
      <GameImageBox
        backgroundImage={game.background_image}
        className=" col-start-5 col-span-8 row-span-6"
      />
      <BentoBox
        className="col-span-4 row-span-3 row-start-4"
        boxColour={colourPalette[0]}
      />
      <GameScreenshotsBox
        screenshots={gameScreenshots}
        className="col-span-7 row-span-5"
      />
      <GameDescriptionBox
        description={sanitizedDescription}
        boxColour={colourPalette[0]}
        className="col-span-5 col-start-8 row-span-4"
      />
      <BentoBox
        boxColour={colourPalette[2]}
        header="Reviews"
        className="col-span-5 col-start-8"
      />
      {reviewData.data?.map(async (review, index) => {
        const { data } = await supabase
          .from("profiles")
          .select()
          .eq("id", review.reviewer_id)
          .single();

        return (
          <Review
            key={index}
            rating={review.rating}
            text={review.text}
            reviewerUsername={data?.username}
            boxColour={colourPalette[3]}
            className="col-span-12"
          />
        );
      })}
      {colourPalette.map((palette, index) => (
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
