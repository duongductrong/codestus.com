"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
// import { Tag } from "@prisma/client"
import { usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"

export interface SLayoutTagsItemsProps {
  tags: any[]
}

const SLayoutTagsItems = ({ tags }: SLayoutTagsItemsProps) => {
  const pathname = usePathname()

  const regex = useMemo(() => new RegExp(`^${pathname}(.*)`), [pathname])

  const isActiveAll = useMemo(() => /^\/$/.test(pathname), [pathname])
  const getIsTagActive = useCallback(
    (slug: string) => regex.test(PAGE_URLS.TAG_DETAIL.replace(":id", slug)) && pathname !== "/",
    [pathname]
  )

  return (
    <>
      {" "}
      <Button
        as={Link}
        href={PAGE_URLS.HOME}
        size="sm"
        variant={isActiveAll ? "default" : "outline"}
        className="rounded-full"
      >
        All
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag.slug}
          as={Link}
          href={PAGE_URLS.TAG_DETAIL.replace(":id", tag.slug)}
          size="sm"
          variant={getIsTagActive(tag.slug) ? "default" : "outline"}
          className="rounded-full"
        >
          {tag.name}
        </Button>
      ))}
    </>
  )
}

export default SLayoutTagsItems
