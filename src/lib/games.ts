import { Game } from "@/types/game-type";

export const getGames = async (searchText: string): Promise<Game[]> => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=c6943abbb7814deb848086e444ca3c3e&search=${searchText}&search_precise=true`
    );

    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
