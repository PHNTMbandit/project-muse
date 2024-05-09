"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CommandDialog } from "@/components/ui/command";
import { Game } from "@/types/game";
import { getGames } from "@/app/api/games";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchGameButton } from "./search-game-button";
import { TbSearch } from "react-icons/tb";
import * as React from "react";
import debounce from "lodash.debounce";
import Link from "next/link";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder, className, children, ...props }, ref) => {
    const [isLoading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState<Game[]>([]);

    const debouncedFetchData = debounce(handleSearch, 300);

    async function handleSearch(search: string) {
      setResults(await getGames({ searchText: search }));
      setLoading(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedFetchData(e.target.value);
      setLoading(true);
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      setOpen(false);
    }

    async function onOpen(e: React.MouseEvent<HTMLButtonElement>) {
      setOpen(!open);
      setResults(await getGames({ searchText: "" }));
    }

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Button
          onClick={onOpen}
          variant={"icon"}>
          <TbSearch />
          <p className="hidden lg:block">Search games</p>
        </Button>
        <CommandDialog
          open={open}
          onOpenChange={setOpen}>
          <div className="space-y-4 py-4 px-4 bg-accent-blue">
            <Input
              icon={TbSearch}
              onChange={handleChange}
              placeholder="Search for a game..."
            />
            {!isLoading ? (
              <ScrollArea className="flex flex-col h-96">
                <ul className="space-y-2">
                  {results.map((result, index) => (
                    <li key={index}>
                      <Link href={`/games/${result.id}`}>
                        <SearchGameButton
                          game={result}
                          onClick={handleClick}></SearchGameButton>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="h-96">Loading</p>
            )}
          </div>
        </CommandDialog>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
