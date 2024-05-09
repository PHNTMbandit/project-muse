import { Store } from "@/types/store";

export const getGameStores = async (gameId: number): Promise<Store[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/games/${gameId}/stores?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`,
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
