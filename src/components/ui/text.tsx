import { ForwardRefComponent } from "@/types/react-polymorphic"
import { cn } from "@/utils/tailwind-utils"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"

export const textVariants = cva([], {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 text-base font-normal",
    },
  },
  defaultVariants: {},
})

export interface TextProps extends VariantProps<typeof textVariants> {}

export const Text = forwardRef(({ as: Comp = "p", variant, className, ...props }, ref) => (
  <Comp {...props} ref={ref} className={cn(textVariants({ variant, className }))} />
)) as ForwardRefComponent<"p", TextProps>
