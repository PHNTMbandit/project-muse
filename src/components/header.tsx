import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProfilePicture } from "./profile-picture";
import { createClient } from "@/utils/supabase/server";

export interface HeaderProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  async ({ className, children, ...props }, ref) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (
      <nav
        className={cn(
          "flex border-b pt-4 pb-4 z-10 bg-card sticky top-0 justify-between items-center",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <div>
          <h1>Project Muse</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Link href={"/dashboard"}>
            <p>Dashboard</p>
          </Link>
          {!user && (
            <Link href={"/log-in"}>
              <p>Log In</p>
            </Link>
          )}
          {user && (
            <form
              action="/auth/signout"
              method="post">
              <Link
                href={"/log-in"}
                type="submit">
                <p>Sign Out</p>
              </Link>
            </form>
          )}
          {user && <ProfilePicture />}
        </div>
      </nav>
    );
  }
);

Header.displayName = "Header";

export { Header };
