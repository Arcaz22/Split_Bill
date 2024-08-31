import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// Definisikan varian untuk input
const inputClasses = cva(
//   "flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  "flex w-full rounded-xl border focus:outline-none",
  {
    variants: {
      size: {
        small: "h-8 px-2 text-xs",
        medium: "h-10 px-3 text-sm",
        large: "h-12 px-4 text-base",
      },
      variant: {
        default: "border border-[#061A40] focus:border-[#0353A4] focus:ring focus:ring-[#B9D6F2]",
        outline: "border border-[#0353A4] focus:ring focus:ring-[#B9D6F2]",
        filled: "bg-[#B9D6F2] text-[#061A40] border-none focus:ring-2 focus:ring-[#0353A4]"
      },
    },
    defaultVariants: {
      size: "medium",
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "small" | "medium" | "large";
  variant?: "default" | "outline" | "filled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClasses({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
