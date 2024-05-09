import * as React from "react";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "inline-flex gap-2 items-center h-10 w-full rounded-md bg-secondary/20 px-3 py-2 focus-within:ring-2 focus-within:ring-primary"
        )}>
        <Icon />
        <input
          type={type}
          className={cn(
            "group w-full bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
