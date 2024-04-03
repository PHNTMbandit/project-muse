import { getGames } from "@/api/rawg-api";
import { CardRow } from "@/components/card-row";
import React from "react";

const DashboardPage = async () => {
  const data = await getGames();

  return (
    <div>
      <CardRow games={data} />
    </div>
  );
};

export default DashboardPage;
