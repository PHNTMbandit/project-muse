import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { SearchBar } from "./search-bar";

type HeaderProps = {
  className?: string;
};

const pages = ["discover", "library"];

async function Header({ className }: HeaderProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={cn("flex items-center", className)}>
      <h1 className="basis-1/3">Muse</h1>
      <div className="basis-1/3 flex justify-center gap-8">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={`/${page}`}>
            <Button
              variant={"tab"}
              size={"none"}>
              <h2>{page}</h2>
            </Button>
          </Link>
        ))}
      </div>
      <div className="basis-1/3">
        <SearchBar placeholder={"Search games"} />
      </div>
    </div>
  );
}

export { Header };
