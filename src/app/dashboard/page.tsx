import { getGames } from "@/api/rawg-api";
import { CardRow } from "@/components/card-row";
import { Showcase } from "@/components/showcase";
import React from "react";

const DashboardPage = async () => {
  const data = await getGames();

  return (
    <main>
      <Showcase games={data} />
      <div className="space-y-8">
        <CardRow
          title="New"
          games={data}
        />
        <CardRow
          title="Trending"
          games={data}
        />
        <CardRow
          title="Popular"
          games={data}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
