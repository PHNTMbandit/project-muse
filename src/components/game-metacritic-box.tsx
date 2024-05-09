import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { MetascorePill } from "./metascore-pill";
import { getMetacriticColour } from "@/utils/colour";

export interface GameMetacriticBoxProps extends BentoBoxProps {
  metacriticPlatforms: [
    {
      metascore: number;
      url: string;
      platform: {
        platform: number;
        name: string;
        slug: string;
      };
    }
  ];
}

const GameMetacriticBox = React.forwardRef<
  HTMLDivElement,
  GameMetacriticBoxProps
>(({ metacriticPlatforms, className, children, ...props }, ref) => {
  return (
    <BentoBox
      className={cn("", className)}
      ref={ref}
      header="Metacritic"
      {...props}>
      {children}
      <div className="flex flex-wrap gap-2">
        {metacriticPlatforms
          .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
          .map((score, index) => (
            <MetascorePill
              key={index}
              pillColour={getMetacriticColour(score.metascore)}
              metascore={score}
            />
          ))}
      </div>
    </BentoBox>
  );
});

GameMetacriticBox.displayName = "GameMetacriticBox";

export { GameMetacriticBox };
