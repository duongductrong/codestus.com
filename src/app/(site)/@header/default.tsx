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
      <Link href={PAGE_URLS.HOME}>
        <Heading className="text-2xl font-semibold">Codestus.com</Heading>
      </Link>

      <a
        href="https://github.com/duongductrong"
        target="_blank"
        role="button"
        className="ml-auto"
        rel="noreferrer"
      >
        <Image
          alt="My github avatar"
          src="https://avatars.githubusercontent.com/u/39333905?v=4"
          className="w-10 h-10 rounded-full"
          width={40}
          height={40}
        />
      </a>
      <ToggleThemeButton />
    </div>
  )
}

export default SiteHeader
