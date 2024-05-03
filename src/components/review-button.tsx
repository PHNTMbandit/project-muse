"use client";

import * as React from "react";
import { Input } from "./ui/input";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TbPencilStar } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";

export interface ReviewButtonProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  game: Game;
  user: User | null;
}

const ReviewButton = React.forwardRef<HTMLDivElement, ReviewButtonProps>(
  ({ game, user, className, children, ...props }, ref) => {
    const supabase = createClient();
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const formSchema = z.object({
      text: z.string().min(2).max(1000),
      rating: z.number().min(1).max(5).default(1),
    });

    function ReviewForm() {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          text: "",
          rating: 1,
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        if (user) {
          await supabase.from("reviews").insert({
            game_id: game.id,
            reviewer_id: user?.id,
            text: values.text,
            rating: values.rating,
          });
        }

        setOpen(false);
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
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Input
                      icon={TbPencilStar}
                      placeholder="Write your review here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[value]}
                      onValueChange={(vals: Number[]) => {
                        onChange(vals[0]);
                      }}
                      value={[form.getValues("rating")]}
                    />
                  </FormControl>
                  <FormDescription>{[value]}</FormDescription>
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
            <Button variant="outline">
              <TbPencilStar />
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn("sm:max-w-[425px]", className)}
            ref={ref}
            {...props}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
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
          <Button variant="outline">
            <TbPencilStar />
          </Button>
        </DrawerTrigger>
        <DrawerContent className={cn("sm:max-w-[425px]", className)}>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
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
