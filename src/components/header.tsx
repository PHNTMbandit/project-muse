import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ProfilePicture } from "./profile-picture";

type HeaderProps = {
  className: string;
};

const pages = ["discover", "library"];

async function Header({ className }: HeaderProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h1>Muse</h1>
      <div className="flex">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={`/${page}`}>
            <Button variant={"ghost"}>
              <h2>{page}</h2>
            </Button>
          </Link>
        ))}
        <Link href={"/account"}>
          <Button variant={"link"}>
            <ProfilePicture />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { Header };
