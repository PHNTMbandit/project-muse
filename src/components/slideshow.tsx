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
          "rounded-3xl overflow-hidden hover:cursor-grab active:cursor-grabbing",
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
              className="aspect-video relative pl-4">
              <Image
                src={image}
                alt={"Slideshow Image"}
                fill
                priority
                sizes="1"
                className="object-cover shadow shadow-transparent"
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
