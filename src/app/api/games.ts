import { Game } from "@/types/game";
import { Genre } from "@/types/genre";
import { GameMovie } from "@/types/movies";
import { GameScreenshot } from "@/types/screenshot";

export interface GameQueryProps {
  ordering?: string;
  searchText?: string;
  size?: number;
}

export const getGames = async ({
  ordering,
  searchText,
  size,
}: GameQueryProps): Promise<Game[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAWG_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchText}&search_precise=true&ordering=${ordering}&page_size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.results;
};

export const getGame = async (id: string): Promise<Game> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
};

export const getGamesByGenre = async (genre: Genre): Promise<Game[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAWG_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&genres=${genre.id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();
  return result.results;
};

export const getGameMovies = async (id: string): Promise<GameMovie[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${id}/movies?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();
  return result.results;
};

export const getGameScreenshots = async (
  game_pk: string
): Promise<GameScreenshot[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${game_pk}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();
  return result.results;
};
