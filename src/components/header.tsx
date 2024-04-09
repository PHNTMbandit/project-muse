import * as React from "react";
import { cn } from "@/lib/utils";
import { NavBar } from "./nav-bar";
import { AccountPill } from "./account-pill";

export interface HeaderProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  async ({ className, children, ...props }, ref) => {
    return (
      <header
        className={cn(
          "grid grid-cols-3 justify-items-center items-center p-6",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <h5 className="justify-self-start">Project Muse</h5>
        <NavBar />
        <AccountPill className="justify-self-end" />
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };
