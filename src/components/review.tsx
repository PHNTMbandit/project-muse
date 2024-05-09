import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Tables } from "@/types/supabase";
import { AverageStarRating } from "./average-star-rating";

export interface ReviewProps extends BentoBoxProps {
  review: Tables<"reviews"> | null;
  reviewAuthor: Tables<"profiles"> | null;
}

const Review = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ review, reviewAuthor, className, children, ...props }, ref) => {
    return (
      <BentoBox
        className={cn("flex flex-col space-y-2", className)}
        ref={ref}
        {...props}>
        {children}
        <div className="flex gap-2">
          <AverageStarRating averageRating={review?.rating} />
          <h6>{reviewAuthor?.username}</h6>
        </div>
        <p className="line-clamp-6">{review?.text}</p>
      </BentoBox>
    );
  }
);

Review.displayName = "Review";

export { Review };
