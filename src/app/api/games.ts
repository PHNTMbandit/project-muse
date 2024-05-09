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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchText}&search_precise=true&ordering=${ordering}&page_size=${size}`,
      { headers: { Accept: "application/json" } }
    );

    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGame = async (id: string): Promise<Game> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
      { headers: { Accept: "application/json" } }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGamesByGenre = async (genre: Genre): Promise<Game[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&genres=${genre.id}`,
      { headers: { Accept: "application/json" } }
    );
    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGameMovies = async (id: string): Promise<GameMovie[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${id}/movies?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
      { headers: { Accept: "application/json" } }
    );
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGameScreenshots = async (
  game_pk: string
): Promise<GameScreenshot[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${game_pk}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
      { headers: { Accept: "application/json" } }
    );
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
