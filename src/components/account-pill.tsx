import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AccountPillProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const AccountPill = React.forwardRef<HTMLDivElement, AccountPillProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-xl p-1 w-fit bg-background/10 shadow-lg ring-1 ring-black/5 backdrop-blur-lg",
          className
        )}
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

AccountPill.displayName = "AccountPill";

export { AccountPill };
