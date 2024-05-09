import * as React from "react";
import { cn } from "@/lib/utils";
import {
  removeObjectsWithDuplicateStartingString as filterPlatforms,
  getPlatformIconFamily,
} from "@/utils/platform-icons";

export interface GamePlatformIconsProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
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

const GamePlatformIcons = React.forwardRef<
  HTMLDivElement,
  GamePlatformIconsProps
>(({ platforms, className, children, ...props }, ref) => {
  const filteredPlatforms = filterPlatforms(platforms);
  return (
    <div
      className={cn("", className)}
      ref={ref}
      {...props}>
      {children}
      <ul className="flex flex-wrap gap-2 items-center justify-start">
        {filteredPlatforms
          .sort((a, b) => a.platform.name.localeCompare(b.platform.name))
          .map((platform, index) => {
            return (
              <li key={index}>
                {getPlatformIconFamily(platform.platform.name)}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

GamePlatformIcons.displayName = "GamePlatformIcons";

export { GamePlatformIcons };
