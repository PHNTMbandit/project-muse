"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { Button } from "./ui/button";

export interface LikeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LikeButton = React.forwardRef<HTMLButtonElement, LikeButtonProps>(
  ({ className, children, ...props }, ref) => {
    const [isLike, setIsLike] = React.useState(false);
    return (
      <Button
        className={cn("", className)}
        variant={"ghost"}
        size={"icon"}
        ref={ref}
        {...props}
        onClick={() => setIsLike(!isLike)}>
        {children}
        {isLike ? (
          <PiHeartStraightFill className="" />
        ) : (
          <PiHeartStraightLight className="" />
        )}
      </Button>
    );
  }
);

LikeButton.displayName = "LikeButton";

export { LikeButton };
