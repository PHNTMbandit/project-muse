import * as React from "react";
import { cn } from "@/lib/utils";

export interface BentoBoxProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-3xl shadow-lg ring-1 ring-white/5", className)}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }
);

BentoBox.displayName = "BentoBox";

export { BentoBox };
