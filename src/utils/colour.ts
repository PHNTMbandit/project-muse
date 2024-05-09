import Color from "color";
import { Palette, getColorFromURL, getPaletteFromURL } from "color-thief-node";

export async function getPrimaryColour(imageUrl: string): Promise<Color> {
  const dominantColor: Palette = await getColorFromURL(imageUrl);
  return Color.rgb(dominantColor);
}

export async function getColourPalette(imageUrl: string): Promise<Color[]> {
  const colorPalette: Palette[] = await getPaletteFromURL(imageUrl);
  const palette: Color[] = colorPalette.map((colour) => Color.rgb(colour));
  return palette;
}

export function getMetacriticColour(score: number): Color {
  if (score >= 75) {
    return Color.rgb("#48b80f");
  } else if (score >= 50 && score <= 74) {
    return Color.rgb("#ffb300");
  } else {
    return Color.rgb("#ff2929");
  }
}

export const getMetacriticScoreName = (score: number): string => {
  switch (true) {
    case score >= 90 && score <= 100:
      return "Exceptional";
    case score >= 81 && score <= 89:
      return "Universal Acclaim";
    case score >= 61 && score <= 80:
      return "Generally Favorable Reviews";
    case score >= 40 && score <= 60:
      return "Mixed or Average Reviews";
    case score >= 20 && score <= 39:
      return "Generally Unfavorable Reviews";
    case score >= 0 && score <= 19:
      return "Overwhelming Dislike";
    default:
      return "Invalid Score";
  }
};
