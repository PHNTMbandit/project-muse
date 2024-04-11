import React from "react";
import { getGames } from "@/api/rawg-api";
import { BentoBox } from "@/components/bento-box";
import { createClient } from "@/utils/supabase/server";
import { Showcase } from "@/components/showcase";

export default async function DiscoverPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const games = await getGames();

  return <main className="flex flex-col items-center"></main>;
}
