
import * as React from "react";
import { cn } from "@/lib/utils";

const ZenCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "zen-card border-0 shadow-lg transition-all duration-300 hover:shadow-xl",
      className
    )}
    {...props}
  />
));
ZenCard.displayName = "ZenCard";

const ZenCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ZenCardHeader.displayName = "ZenCardHeader";

const ZenCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-gray-800",
      className
    )}
    {...props}
  />
));
ZenCardTitle.displayName = "ZenCardTitle";

const ZenCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
ZenCardDescription.displayName = "ZenCardDescription";

const ZenCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ZenCardContent.displayName = "ZenCardContent";

const ZenCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
ZenCardFooter.displayName = "ZenCardFooter";

export { 
  ZenCard, 
  ZenCardHeader, 
  ZenCardFooter, 
  ZenCardTitle, 
  ZenCardDescription, 
  ZenCardContent 
};
