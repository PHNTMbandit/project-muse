import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Store } from "@/types/store";

export interface GameStoresBoxProps extends BentoBoxProps {
  stores: Store[];
}

const GameStoresBox = React.forwardRef<HTMLDivElement, GameStoresBoxProps>(
  ({ stores, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        {stores.map((store, index) => (
          <p key={index}>{store.store_id}</p>
        ))}
      </BentoBox>
    );
  }
);

GameStoresBox.displayName = "GameStoresBox";

export { GameStoresBox };
