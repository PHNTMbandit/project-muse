import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import getPlatformIcon, {
  removeObjectsWithDuplicateStartingString as filterPlatforms,
} from "@/utils/platform-icons";

export interface GameNameBoxProps extends BentoBoxProps {
  gameName: string;
  platforms: [
    {
      platform: {
        id: number;
        slug: string;
        name: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }
  ];
}

const GameNameBox = React.forwardRef<HTMLDivElement, GameNameBoxProps>(
  ({ gameName, platforms, className, children, ...props }, ref) => {
    const filteredPlatforms = filterPlatforms(platforms);

    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h3 className="text-2xl font-extrabold uppercase">{gameName}</h3>
        <div className="flex flex-wrap-reverse gap-2">
          {filteredPlatforms
            .sort((a, b) => b.platform.name.localeCompare(a.platform.name))
            .map((platform, index) => {
              return (
                <div key={index}>{getPlatformIcon(platform.platform.name)}</div>
              );
            })}
        </div>
      </BentoBox>
    );
  }
);

GameNameBox.displayName = " GameNameBox";

export { GameNameBox };
