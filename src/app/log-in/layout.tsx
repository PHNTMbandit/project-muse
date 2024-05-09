import { Game } from "@/types/game";
import React from "react";
import { getGames } from "../api/games";
import Image from "next/image";

export default async function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const games: Game[] = await getGames({ searchText: "the legend of zelda" });

  return (
    <section className="grid grid-cols-10 gap-4 p-4 w-screen h-screen overflow-hidden">
      {games.slice(0, 14).map((game, index) => (
        <div
          key={index}
          className="aspect-video relative w-full h-full col-span-2 brightness-50">
          <Image
            src={game.background_image}
            alt={game.background_image}
            fill
            priority
            sizes="1"
            className="object-cover rounded-3xl"
          />
        </div>
      ))}
      {children}
    </section>
  );
}
