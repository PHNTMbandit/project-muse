"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export interface SlideshowProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  images: string[];
}

const Slideshow = React.forwardRef<HTMLDivElement, SlideshowProps>(
  ({ images, className, children, ...props }, ref) => {
    const plugin = React.useRef(
      Autoplay({
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      })
    );
    return (
      <Carousel
        className={cn(
          "rounded-3xl h-full w-full hover:cursor-grab active:cursor-grabbing overflow-hidden",
          className
        )}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        ref={ref}
        {...props}>
        {children}
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="relative aspect-video w-full">
              <Image
                src={image}
                alt={"Slideshow Image"}
                priority
                fill
                sizes="1"
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
);

Slideshow.displayName = "Slideshow";

export { Slideshow };
