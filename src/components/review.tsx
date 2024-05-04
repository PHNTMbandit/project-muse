import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";

export interface ReviewProps extends BentoBoxProps {
  reviewerUsername: string | undefined;
  text: string;
  rating: number;
}

const Review = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ text, reviewerUsername, rating, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <h6>{reviewerUsername}</h6>
        <p>{rating}</p>
        <p>{text}</p>
      </BentoBox>
    );
  }
);

Review.displayName = "Review";

export { Review };
