import { getGamesByGenre, getGames } from "../api/games";
import { GamePreviewCardRow } from "@/components/game-preview-card-row";
import { getGenres } from "../api/genres";

export default async function GamePage() {
  const popularGames = await getGames({ searchText: "", size: 50 });
  const newGames = await getGames({ ordering: "released", size: 50 });
  const genres = await getGenres();

  return (
    <main className="flex flex-col items-center gap-8">
      <GamePreviewCardRow
        categoryTitle="Popular"
        games={popularGames}
      />
      <GamePreviewCardRow
        categoryTitle="New"
        games={newGames}
      />
      {genres
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(async (genre, index) => {
          const games = await getGamesByGenre(genre);
          return (
            <GamePreviewCardRow
              key={index}
              categoryTitle={genre.name}
              games={games}
            />
          );
        })}
    </main>
  );
}
