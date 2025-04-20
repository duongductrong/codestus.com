"use client"

import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import dynamic from "next/dynamic"
import Image from "next/image"
import { usePathname } from "next/navigation"

const ToggleThemeButton = dynamic(
  () =>
    import("@/components/custom-themes/toggle-theme-button").then((module) => ({
      default: module.ToggleThemeButton,
    })),
  { ssr: false }
)

export interface SiteHeaderProps {}

const SiteHeader = (props: SiteHeaderProps) => {
  const pathname = usePathname()

  const checkBlogDetails = /^\/posts\/(.*)/

  const Heading = checkBlogDetails.test(pathname) ? "p" : "h1"

  return (
    <div className="p-5 flex items-center gap-3">
      <Link href={PAGE_URLS.HOME} className="flex items-center gap-2">
        <Image
          src="/assets/peeps-avatar-alpha-transparent.png"
          alt="Peeps Avatar"
          width={32}
          height={32}
          className="w-8 h-w-8 rounded-full mx-auto bg-amber-500"
        />
        <Heading className="text-lg font-semibold">Hello, codestus.</Heading>
      </Link>

      <ToggleThemeButton className="ml-auto" />
    </div>
  )
}

export default SiteHeader
