import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const avatarClasses = cva(
  "relative flex shrink-0 overflow-hidden rounded-full transition-transform duration-300 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-16 w-16",
        md: "h-24 w-24",
        lg: "h-32 w-32",
      },
      ring: {
        none: "",
        blue: "ring-4 ring-blue-500",
        orange: "ring-4 ring-orange-500",
      },
      rotate: {
        true: "hover:rotate-6",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      ring: "blue",
      rotate: true,
    },
  }
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "sm" | "md" | "lg";
    ring?: "none" | "blue" | "orange";
    rotate?: boolean;
  }
>(({ className, size, ring, rotate, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarClasses({ size, ring, rotate }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
