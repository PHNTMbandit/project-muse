import * as React from "react";
import { cn } from "@/lib/utils";

export interface BentoBoxProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  title: string;
}

const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-xl p-4 space-y-3 bg-primary/15 shadow-lg ring-1 ring-black/5 backdrop-blur",
          className
        )}
        ref={ref}
        {...props}>
        <h4>{title}</h4>
        {children}
      </div>
    );
  }
);

BentoBox.displayName = "BentoBox";

export { BentoBox };
