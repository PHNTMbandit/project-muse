import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import Image from "next/image";

export interface GameImageBoxProps extends BentoBoxProps {
  backgroundImage: string;
}

const GameImageBox = React.forwardRef<HTMLDivElement, GameImageBoxProps>(
  ({ backgroundImage, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn(
          "aspect-video relative overflow-hidden w-full h-full",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <Image
          src={backgroundImage}
          alt={"Background Image"}
          fill
          priority
          sizes="1"
          className="object-cover"
        />
      </BentoBox>
    );
  }
);

GameImageBox.displayName = "GameImageBox";

export { GameImageBox };
