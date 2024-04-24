import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.InputHTMLAttributes<HTMLDivElement> {}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h1 className="text-5xl">Muse</h1>
      </div>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
