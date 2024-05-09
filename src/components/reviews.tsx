import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Tables } from "@/types/supabase";
import { Review } from "./review";
import { getReviewAuthor } from "@/app/games/[id]/actions";
import Color from "color";

export interface ReviewsProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  reviews: Tables<"reviews">[] | null;
  backgroundColour: Color;
}

const Reviews = React.forwardRef<HTMLDivElement, ReviewsProps>(
  ({ reviews, backgroundColour, className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col gap-4", className)}
        ref={ref}
        {...props}>
        {children}
        {reviews?.map(async (review, index) => {
          const reviewAuthor = await getReviewAuthor(review.reviewer_id);
          return (
            <Review
              id={`reviews/${review.id}`}
              key={index}
              review={review}
              reviewAuthor={reviewAuthor}
              boxColour={backgroundColour}
              className="col-span-12"
            />
          );
        })}
      </div>
    );
  }
);

Reviews.displayName = "Reviews";

export { Reviews };
