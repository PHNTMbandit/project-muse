import * as React from "react";
import { cn } from "@/lib/utils";
import Color from "color";

export interface BentoBoxProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  boxColour: Color;
  header?: string;
}

const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ boxColour, header, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-3xl shadow-lg ring-1 ring-white/5 text-left py-4 px-6",
          { "text-secondary": boxColour.isLight() },
          className
        )}
        ref={ref}
        style={{ backgroundColor: `${boxColour}` }}
        {...props}>
        {header && <h4 className="mb-2">{header}</h4>}
        {children}
      </div>
    );
  }
);

BentoBox.displayName = "BentoBox";

export { BentoBox };
