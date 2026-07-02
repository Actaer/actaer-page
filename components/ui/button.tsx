import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border border-transparent text-sm font-normal tracking-[0.16px] transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 aria-invalid:ring-2 aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-(--blue-hover) active:bg-(--blue-pressed)",
        secondary:
          "bg-foreground text-background hover:bg-(--inverse-surface-1)",
        outline:
          "border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-muted",
        destructive: "bg-destructive text-white hover:bg-[#ba1b23]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 gap-2 px-4",
        xs: "h-8 gap-1 px-3 text-xs",
        sm: "h-10 gap-2 px-4",
        lg: "h-12 gap-2 px-6",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
