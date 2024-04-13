"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CiSearch } from "react-icons/ci";
import { getGames } from "@/lib/games";
import { Game } from "@/types/game-type";
import debounce from "lodash.debounce";
import { CommandDialog, CommandShortcut } from "@/components/ui/command";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };
      document.addEventListener("keydown", down);
      handleSearch("");
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Button
          onClick={() => setOpen(!open)}
          variant={"outline"}>
          <CommandShortcut className="flex items-center gap-2">
            <CiSearch />
            <h6>CTRL+K</h6>
          </CommandShortcut>
        </Button>
        <CommandDialog
          open={open}
          onOpenChange={setOpen}>
          <div className="space-y-2">
            <Input
              onChange={handleChange}
              placeholder="Search for a game..."
            />
            {!isLoading ? (
              <ScrollArea className="flex flex-col h-96">
                {results.map((result, index) => (
                  <ul key={index}>
                    <Button
                      variant={"outline"}
                      className="w-full rounded-none">
                      {result.name}
                    </Button>
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
