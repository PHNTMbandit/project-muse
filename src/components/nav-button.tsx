import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { headers } from "next/headers";

export interface NavButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const NavButton = React.forwardRef<HTMLAnchorElement, NavButtonProps>(
  ({ href, className, children, ...props }, ref) => {
    const headersList = headers();
    const referer = headersList.get("referer")?.split("/")[3];
    const domain = href.split("/")[1];

    return (
      <Link
        href={href}
        className={cn(
          "p-2 pl-3 pr-3 rounded-full hover:bg-background/20",
          referer === domain && "hover:bg-background bg-background",
          className
        )}
        ref={ref}
        {...props}>
        {children}
        <p className="capitalize text-sm font-bold">{href.split("/")[1]}</p>
      </Link>
    );
  }
);

NavButton.displayName = "NavButton";

export { NavButton };
