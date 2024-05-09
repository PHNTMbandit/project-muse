import * as React from "react";
import { cn } from "@/lib/utils";
import { FaStar, FaStarHalf } from "react-icons/fa";

export interface AverageStarRatingProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  averageRating: number | undefined;
}

const AverageStarRating = React.forwardRef<
  HTMLDivElement,
  AverageStarRatingProps
>(({ averageRating, className, children, ...props }, ref) => {
  if (averageRating) {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    return (
      <div
        className={cn("flex", className)}
        ref={ref}
        {...props}>
        {children}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar
            key={index}
            size={20}
          />
        ))}
        {hasHalfStar && <FaStarHalf size={20} />}
      </div>
    );
  }
});

AverageStarRating.displayName = "AverageStarRating";

export { AverageStarRating };
