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
      <div className="flex justify-end items-center w-full gap-2">
        <Icon />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full border-b border-input bg-background py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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
