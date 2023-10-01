"use client"

import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { Inbox, LucideIcon, Package, PercentCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import SiteSidebar from "../_components/site-sidebar"
import SiteSidebarItem from "../_components/site-sidebar-item"

export interface ParallelSiteSidebarProps {}

const ParallelSiteSidebar = (props: ParallelSiteSidebarProps) => {
  const pathname = usePathname()

  const items = useMemo<{ title: string; path: string; icon: LucideIcon }[]>(
    () => [
      {
        title: "Readings",
        path: PAGE_URLS.HOME,
        icon: Inbox,
      },
      {
        title: "Labs",
        path: PAGE_URLS.LABS,
        icon: Package,
      },
      {
        title: "Inspect",
        path: PAGE_URLS.INSPECT,
        icon: PercentCircle,
      },
    ],
    []
  )

  return (
    <SiteSidebar>
      {items.map((item) => {
        const isItemActive =
          pathname !== "/" ? new RegExp(`^${pathname}`).test(item.path) : pathname === item.path

        return (
          <SiteSidebarItem as={Link} key={item.path} href={item.path} Icon={item.icon} active={isItemActive}>
            {item.title}
          </SiteSidebarItem>
        )
      })}
    </SiteSidebar>
  )
}

export default ParallelSiteSidebar
