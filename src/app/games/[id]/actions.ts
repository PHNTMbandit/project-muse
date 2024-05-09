"use server";

import { Game } from "@/types/game";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function getReview(
  game: Game,
  user: User | null
): Promise<Tables<"reviews"> | null> {
  const supabase = createClient();

  if (user) {
    const reviewData = await supabase
      .from("reviews")
      .select()
      .eq("game_id", game.id)
      .eq("reviewer_id", user.id)
      .single();

    return reviewData.data;
  } else {
    return null;
  }
}

export async function getReviews(
  game: Game
): Promise<Tables<"reviews">[] | null> {
  const supabase = createClient();

  const reviewData = await supabase
    .from("reviews")
    .select()
    .eq("game_id", game.id);

  return reviewData.data;
}

export async function getReviewAuthor(
  reviewAuthorId: Tables<"reviews">["reviewer_id"] | undefined
): Promise<Tables<"profiles"> | null> {
  const supabase = createClient();

  if (reviewAuthorId) {
    const reviewData = await supabase
      .from("profiles")
      .select()
      .eq("id", reviewAuthorId)
      .single();

    return reviewData.data;
  } else {
    return null;
  }
}
