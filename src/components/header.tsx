"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { Page } from "@/types/page";
import { TbHome, TbDeviceGamepad } from "react-icons/tb";
import { ProfilePicture } from "./profile-picture";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className={cn("flex items-center mb-16", className)}>
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
      <div className="basis-1/3 flex justify-end gap-4">
        <SearchBar placeholder={"Search games"} />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <ProfilePicture />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export { Header };
