"use client"

import { ADMIN_URLS } from "@/constants/admin"
import { mainNavigation, NavigationItem } from "@/layouts/admin/data"
import { cn } from "@/utils/tailwind-utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SecondaryNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-background sticky top-0 z-10">
      <nav className="flex overflow-auto hide-scrollbar">
        {mainNavigation.map((item: any) => {
          const regex = new RegExp(
            item.href === ADMIN_URLS.OVERVIEW ? `${item.href}$` : `^${item.href}`
          )
          const isActive = regex.test(pathname)
          return <NavItem key={item.name} item={item} active={isActive} />
        })}
      </nav>
    </div>
  )
}

function NavItem({ item, active }: { item: NavigationItem; active?: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors relative",
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {item.name}
      {item.hasNotification && (
        <span
          className="absolute top-3 right-1 h-1.5 w-1.5 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}
