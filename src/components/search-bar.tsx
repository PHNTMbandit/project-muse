"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TbSearch } from "react-icons/tb";
import { getGames } from "@/app/api/games";
import { Game } from "@/types/game";
import debounce from "lodash.debounce";
import { CommandDialog } from "@/components/ui/command";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      setResults(await getGames(search));
      setLoading(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedFetchData(e.target.value);
      setLoading(true);
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      setOpen(false);
    }

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Button
          onClick={() => setOpen(!open)}
          variant={"icon"}>
          <TbSearch />
          <p className="hidden lg:block">Search games</p>
        </Button>
        <CommandDialog
          open={open}
          onOpenChange={setOpen}>
          <div className="space-y-2">
            <Input
              icon={TbSearch}
              onChange={handleChange}
              placeholder="Search for a game..."
            />
            {!isLoading ? (
              <ScrollArea className="flex flex-col h-96">
                {results.map((result, index) => (
                  <ul key={index}>
                    <Link href={`/games/${result.id}`}>
                      <Button
                        variant={"outline"}
                        onClick={handleClick}
                        className="w-full rounded-none">
                        {result.name}
                      </Button>
                    </Link>
                  </ul>
                ))}
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
