import { AverageStarRating } from "./average-star-rating";
import { BentoBox, BentoBoxProps } from "./ui/bento-box";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Game } from "@/types/game";
import { ReviewButton } from "./review-button";
import { User } from "@supabase/supabase-js";
import * as React from "react";
import Link from "next/link";
import { Tables } from "@/types/supabase";
import { Review } from "./review";

export interface GameReviewBoxProps extends BentoBoxProps {
  game: Game;
  user: User | null;
  reviews: Tables<"reviews">[] | null;
  reviewAuthor: Tables<"profiles"> | null;
  userReview: Tables<"reviews"> | null;
}

const GameReviewBox = React.forwardRef<HTMLDivElement, GameReviewBoxProps>(
  (
    {
      game,
      user,
      reviews,
      reviewAuthor,
      userReview,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const averageRatingScore = (): number => {
      const totalRating = reviews?.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      if (totalRating && reviews) {
        return totalRating / reviews?.length;
      }

      return 0;
    };

    return (
      <BentoBox
        className={cn("", className)}
        ref={ref}
        {...props}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <AverageStarRating averageRating={averageRatingScore()} />
            <Link
              href="#reviews"
              className="w-fit">
              <Button
                variant={"link"}
                size={"none"}>
                {reviews && reviews?.length <= 0 && <h6>No reviews</h6>}
                {reviews && reviews?.length == 1 && (
                  <h6>{reviews?.length} Review</h6>
                )}
                {reviews && reviews?.length > 1 && (
                  <h6>{reviews?.length} Reviews</h6>
                )}
              </Button>
            </Link>
          </div>
          <ReviewButton
            game={game}
            user={user}
          />
        </div>
        {user ? (
          userReview ? (
            <>
              <Review
                review={userReview}
                reviewAuthor={reviewAuthor}
                className="p-4 shadow-none"
              />
              <Link href={`#reviews/${userReview.id}`}>
                <Button variant={"link"}>Read more</Button>
              </Link>
            </>
          ) : (
            <p>Write your first review</p>
          )
        ) : (
          <p>
            <Link
              href={"/sign-up"}
              className="font-bold hover:underline">
              Sign up
            </Link>{" "}
            or{" "}
            <Link
              href={"/log-in"}
              className="font-bold hover:underline">
              Log in
            </Link>{" "}
            to leave a review
          </p>
        )}
        {children}
      </BentoBox>
    );
  }
);

GameReviewBox.displayName = "GameReviewBox";

export { GameReviewBox };
