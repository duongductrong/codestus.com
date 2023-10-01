import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { cn } from "@/utils/tailwind-utils"
import { ReactNode } from "react"

export interface SiteSidebarProps {
  children: ReactNode
}

const SiteSidebar = ({ children }: SiteSidebarProps) => (
  <div
    className={cn(
      "hidden xs:block lg:w-[300px]",
      "fixed top-0 left-0 h-screen overflow-auto",
      "bg-background border-r border-border pt-4"
    )}
  >
    <Link
      href={PAGE_URLS.HOME}
      className={cn(
        "w-[40px] h-[40px] rounded-full font-black bg-foreground text-background",
        "opacity-0 lg:opacity-100 flex items-center justify-center text-lg ml-4"
      )}
    >
      C
    </Link>
    <div className="flex flex-col mt-6">{children}</div>
  </div>
)

export default SiteSidebar
