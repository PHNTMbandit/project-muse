import * as React from "react";
import { cn } from "@/lib/utils";
import Color from "color";

export interface BentoBoxProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  boxColour?: Color;
  header?: string;
  interactable?: boolean;
}

const BentoBox = React.forwardRef<HTMLDivElement, BentoBoxProps>(
  ({ boxColour, header, interactable, className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-3xl outline outline-black text-left py-4 px-6 transition-all",
          { "text-secondary": boxColour?.isLight() },
          { "hover:scale-105 hover:z-10 cursor-pointer": interactable },
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
