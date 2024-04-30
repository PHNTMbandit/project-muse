"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { Page } from "@/types/page";
import { TbHome, TbDeviceGamepad } from "react-icons/tb";
import { ProfilePicture } from "./profile-picture";
import { User } from "@supabase/auth-js/dist/module/lib/types";
import { FiLogIn } from "react-icons/fi";

type HeaderProps = {
  className?: string;
  user: User | null;
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

function Header({ className, user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center mb-8", className)}>
      <h1 className="basis-1/3">Muse</h1>
      <nav className="basis-1/3 flex justify-center gap-8">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.url}>
            <Button
              variant={"icon"}
              className={cn(
                `hover:border-${page.color}`,
                pathname.includes(page.url) && `bg-${page.color}`
              )}>
              <page.icon
                className={cn(
                  `stroke-${page.color}`,
                  pathname.includes(page.url) && `stroke-primary`
                )}
              />
              <p
                className={cn(
                  `text-${page.color}`,
                  pathname.includes(page.url) && "text-primary"
                )}>
                {page.label}
              </p>
            </Button>
          </Link>
        ))}
      </nav>
      <div className="basis-1/3 flex justify-end gap-4">
        <SearchBar placeholder={"Search games"} />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <ProfilePicture />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.user_metadata["username"]}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form
                  action={"/auth/signout"}
                  method="post">
                  <Button variant={"ghost"}>Sign Out</Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/log-in"}>
            <Button variant={"icon"}>
              <FiLogIn />
              <p>Log In</p>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export { Header };
