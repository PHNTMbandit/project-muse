"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import { getGames } from "@/lib/games";
import { SearchBarResults } from "./search-bar-results";
import { Game } from "@/types/game-type";
import debounce from "lodash.debounce";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder, className, children, ...props }, ref) => {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<Game[]>([]);

    const debouncedFetchData = debounce(handleSearch, 300);

    async function handleSearch(search: string) {
      setResults(await getGames(search));
      setQuery(search);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedFetchData(e.target.value);
    }

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Input
          icon={CiSearch}
          placeholder={placeholder}
          className="w-3/4"
          onChange={handleChange}
        />
        {query && <SearchBarResults games={results} />}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
