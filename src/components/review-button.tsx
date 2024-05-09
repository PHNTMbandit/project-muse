"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { Game } from "@/types/game";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TbPencilStar } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";
import { useToast } from "./ui/use-toast";
import { AverageStarRating } from "./average-star-rating";
import { Textarea } from "./ui/textarea";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";

export interface ReviewButtonProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  game: Game;
  user: User | null;
}

const ReviewButton = React.forwardRef<HTMLDivElement, ReviewButtonProps>(
  ({ game, user, className, children, ...props }, ref) => {
    const supabase = createClient();
    const [open, setOpen] = React.useState(false);
    const [savedReview, setSavedReview] =
      React.useState<Tables<"reviews"> | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const formSchema = z.object({
      text: z
        .string()
        .min(2)
        .max(1000, { message: "Review cannot be longer than 1000 characters" }),
      rating: z.number().min(0.5).max(5),
    });

    React.useEffect(() => {
      const getSavedReview = async () => {
        if (user) {
          const review = await supabase
            .from("reviews")
            .select()
            .eq("reviewer_id", user?.id)
            .single();
          setSavedReview(review.data);
        }
      };
      getSavedReview();
    }, [supabase, user?.id, open, user]);

    function ReviewForm() {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          text: savedReview?.text,
          rating: savedReview?.rating,
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        if (user) {
          if (savedReview) {
            await supabase
              .from("reviews")
              .update({
                text: values.text,
                rating: values.rating,
              })
              .eq("reviewer_id", user?.id);
          } else {
            await supabase.from("reviews").insert({
              game_id: game.id,
              reviewer_id: user?.id,
              text: values.text,
              rating: values.rating,
            });
          }

          toast({
            title: "Review saved",
          });
        }

        setOpen(false);
        router.refresh();
      }

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-80"
                      placeholder="Write your review here..."
                      {...field}
                    />
                  </FormControl>
                  {field.value.length > 1000 ? (
                    <p className="text-red-500">{field.value.length}/1000</p>
                  ) : (
                    <p>{field.value.length}/1000</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <Slider
                      min={0.5}
                      max={5}
                      step={0.5}
                      defaultValue={[value]}
                      onValueChange={(vals: Number[]) => {
                        onChange(vals[0]);
                      }}
                      value={[form.getValues("rating")]}
                    />
                  </FormControl>
                  <FormDescription>
                    <AverageStarRating averageRating={value} />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      );
    }

    if (isDesktop) {
      return (
        <Dialog
          open={open}
          onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              variant="outline"
              disabled={!user}>
              <TbPencilStar size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn("sm:max-w-[425px]", className)}
            {...props}>
            <DialogHeader>
              <DialogTitle>
                {user?.user_metadata["username"]}&apos;s review
              </DialogTitle>
              <DialogDescription>
                Let the people know what you think of {game.name}!
              </DialogDescription>
            </DialogHeader>
            <ReviewForm />
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            size={"icon"}
            variant="outline"
            disabled={!user}>
            <TbPencilStar size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className={cn("sm:max-w-[425px]", className)}>
          <DrawerHeader className="text-left">
            <DrawerTitle>Your review</DrawerTitle>
            <DrawerDescription>
              Let the people know what you think of {game.name}!
            </DrawerDescription>
          </DrawerHeader>
          <ReviewForm />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);

ReviewButton.displayName = "ReviewButton";

export { ReviewButton };
