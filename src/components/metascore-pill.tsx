import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";
import Color from "color";
import getPlatformIcon from "@/utils/platform-icons";
import Link from "next/link";

export interface MetascorePillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pillColour: Color;
  metascore: {
    metascore: number;
    url: string;
    platform: {
      platform: number;
      name: string;
      slug: string;
    };
  };
}

const MetascorePill = React.forwardRef<HTMLButtonElement, MetascorePillProps>(
  ({ pillColour, metascore, className, children, ...props }, ref) => {
    const platformIcon = getPlatformIcon(metascore.platform.name);
    return (
      <Link
        href={metascore.url}
        target="_blank">
        <Button
          style={{ backgroundColor: `${pillColour}` }}
          className={cn("flex gap-2 items-center justify-center", className)}
          ref={ref}
          {...props}>
          {children}
          {platformIcon}
          <p>{metascore.metascore}</p>
        </Button>
      </Link>
    );
  }
);

MetascorePill.displayName = "MetascorePill";

export { MetascorePill };
