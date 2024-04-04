import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeaderProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex justify-between items-center", className)}
        ref={ref}
        {...props}>
        {children}
        <h1>Project Muse</h1>
      </div>
    );
  }
);

Header.displayName = "Header";

export { Header };
