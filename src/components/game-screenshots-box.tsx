import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Slideshow } from "./slideshow";
import { GameScreenshot } from "@/types/screenshot";

export interface GameScreenshotsBoxProps extends BentoBoxProps {
  screenshots: GameScreenshot[];
}

const GameScreenshotsBox = React.forwardRef<
  HTMLDivElement,
  GameScreenshotsBoxProps
>(({ screenshots, className, children, ...props }, ref) => {
  return (
    <BentoBox
      className={cn("p-0", className)}
      ref={ref}
      {...props}>
      {children}
      <Slideshow images={screenshots.map((screenshot) => screenshot.image)} />
    </BentoBox>
  );
});

GameScreenshotsBox.displayName = "GameScreenshotsBox";

export { GameScreenshotsBox };
