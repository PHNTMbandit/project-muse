import * as React from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";
import { NavButton } from "./nav-button";

export interface NavBarProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const NavBar = React.forwardRef<HTMLDivElement, NavBarProps>(
  ({ className, children, ...props }, ref) => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user;
    }

    return (
      <nav
        className={cn(
          "flex gap-4 justify-center items-center rounded-full w-fit p-2 bg-background/10 shadow-lg ring-1 ring-black/5 backdrop-blur-lg",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <NavButton href={"/dashboard"} />
        <NavButton href={"/library"} />
        {/* {user && (
          <form
            action="/auth/signout"
            method="post">
            <NavButton
              destination={"/log-in"}
              type="submit"
              tooltip="Sign Out"
              icon={<PiSignOut size={25} />}
              fillIcon={<PiSignOutFill size={25} />}
            />
          </form>
        )} */}
      </nav>
    );
  }
);

NavBar.displayName = "NavBar";

export { NavBar };
