export type Game = {
  achievements_count: number;
  added_by_status: {};
  added: number;
  additions_count: number;
  alternative_names: string[];
  background_image_additional: string;
  background_image: string;
  creators_count: number;
  description: string;
  esrb_rating: { id: number; slug: string; name: string };
  game_series_count: number;
  id: number;
  metacritic_platforms: [{ metascore: number; url: string }];
  metacritic_url: string;
  metacritic: number;
  movies_count: number;
  name_original: string;
  name: string;
  parent_achievements_count: string;
  parents_count: number;
  platforms: [
    {
      platform: { id: number; slug: string; name: string };
      released_at: string;
      requirements: { minimum: string; recommended: string };
    }
  ];
  playtime: number;
  rating_top: number;
  rating: number;
  ratings_count: number;
  ratings: {};
  reactions: {};
  reddit_count: number;
  reddit_description: string;
  reddit_logo: string;
  reddit_url: number;
  released: string;
  reviews_text_count: string;
  screenshots_count: number;
  slug: string;
  suggestions_count: number;
  tba: boolean;
  twitch_count: string;
  updated: string;
  website: string;
  youtube_count: string;
};
