import { getGames } from "@/api/rawg-api";
import { GameCardRow } from "@/components/game-card-row";
import { Showcase } from "@/components/showcase";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function DashboardPage() {
  const supabase = createClient();
  const data = await getGames();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      {/* <Showcase games={data} /> */}
      <div>
        <h2>Welcome back {user?.user_metadata.username}!</h2>
        <h3>This is what&apos;s been happening...</h3>
      </div>
      <div className="mt-8 space-y-4">
        <GameCardRow
          title="New"
          games={data}
        />
        <GameCardRow
          title="Trending"
          games={data}
        />
        <GameCardRow
          title="Popular"
          games={data}
        />
      </div>
    </main>
  );
}
