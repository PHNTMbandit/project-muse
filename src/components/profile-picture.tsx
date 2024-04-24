import * as React from "react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ProfilePictureProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const ProfilePicture = React.forwardRef<HTMLDivElement, ProfilePictureProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    );
  }
);

ProfilePicture.displayName = "ProfilePicture";

export { ProfilePicture };
