import { ForwardRefComponent } from "@/types/react-polymorphic"
import { cn } from "@/utils/tailwind-utils"
import { VariantProps, cva } from "class-variance-authority"
import { LucideIcon } from "lucide-react"
import { ReactNode, forwardRef } from "react"

const siteSidebarItemVariants = cva(
  [
    "p-4 cursor-pointer ",
    "flex items-center gap-4",
    "text-muted-foreground hover:bg-muted font-normal border-b first:border-t border-border",
  ],
  {
    variants: {
      active: {
        true: "font-semibold text-foreground [*_svg]:fill-white",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export interface SiteSidebarItemProps extends VariantProps<typeof siteSidebarItemVariants> {
  children: ReactNode
  className?: string
  Icon: LucideIcon
}

const SiteSidebarItem = forwardRef(
  ({ children, active, className, as: Comp = "div", Icon, ...props }, ref) => (
    <Comp {...props} ref={ref} className={cn(siteSidebarItemVariants({ active, className }))}>
      <Icon className="w-6 h-6 shrink-0" strokeWidth={active ? 2 : 1.25} />
      <span className="hidden lg:block">{children}</span>
    </Comp>
  )
) as ForwardRefComponent<"div", SiteSidebarItemProps>

export default SiteSidebarItem
