import { Platform } from "@/types/platform";

export const getPlatform = async (id: number): Promise<Platform> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAWG_URL}/platforms/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    const result: Platform = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
