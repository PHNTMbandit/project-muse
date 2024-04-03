import { Game } from "@/types/game-type";

export const getGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=c6943abbb7814deb848086e444ca3c3e&dates=2019-09-01,2019-09-30&platforms=18,1,7"
    );

    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
