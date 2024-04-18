"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { Page } from "@/types/page";
import { TbHome, TbDeviceGamepad } from "react-icons/tb";

type HeaderProps = {
  className?: string;
};

const pages: Page[] = [
  { label: "Discover", url: "/discover", icon: TbHome, color: "accent-purple" },
  {
    label: "Games",
    url: "/games",
    icon: TbDeviceGamepad,
    color: "accent-blue",
  },
];

function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center", className)}>
      <h1 className="basis-1/3">Muse</h1>
      <nav className="basis-1/3 flex justify-center gap-8">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.url}>
            <Button
              variant={"ghost"}
              className={cn(
                `hover:border-${page.color} space-x-2`,
                pathname.includes(page.url) && `bg-${page.color}`
              )}>
              <page.icon
                className={cn(
                  `stroke-${page.color}`,
                  pathname.includes(page.url) && `stroke-primary`
                )}
              />
              <h2
                className={cn(
                  `text-${page.color} hidden lg:block`,
                  pathname.includes(page.url) && "text-primary"
                )}>
                {page.label}
              </h2>
            </Button>
          </Link>
        ))}
      </nav>
      <SearchBar
        placeholder={"Search games"}
        className="basis-1/3 flex justify-end"
      />
    </div>
  );
}

export { Header };
