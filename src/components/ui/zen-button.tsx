
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const zenButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "zen-button shadow-lg",
        secondary: "zen-button-secondary shadow-lg",
        ghost: "hover:bg-zen-blue/50 hover:text-zen-green",
        outline: "border-2 border-zen-green text-zen-green hover:bg-zen-green hover:text-white",
        floating: "bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90 shadow-lg",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ZenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof zenButtonVariants> {
  asChild?: boolean;
}

const ZenButton = React.forwardRef<HTMLButtonElement, ZenButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(zenButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ZenButton.displayName = "ZenButton";

export { ZenButton, zenButtonVariants };
