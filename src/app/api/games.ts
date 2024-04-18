import { Game } from "@/types/game-type";

export const getGames = async (searchText: string): Promise<Game[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchText}&search_precise=true`
    );

    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGame = async (id: string): Promise<Game[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
