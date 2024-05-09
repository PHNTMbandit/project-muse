import { Genre } from "@/types/genre";

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    const result = await response.json();
    const data = result.results;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
