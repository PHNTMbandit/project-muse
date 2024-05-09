import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { ScrollArea } from "./ui/scroll-area";

export interface GameDescriptionBoxProps extends BentoBoxProps {
  description: string;
}

const GameDescriptionBox = React.forwardRef<
  HTMLDivElement,
  GameDescriptionBoxProps
>(({ description, className, children, ...props }, ref) => {
  return (
    <BentoBox
      header="About"
      className={cn("", className)}
      ref={ref}
      {...props}>
      {children}
      <ScrollArea className="h-72">
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </ScrollArea>
    </BentoBox>
  );
});

GameDescriptionBox.displayName = "GameDescriptionBox";

export { GameDescriptionBox };
