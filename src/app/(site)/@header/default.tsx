"use client"

import dynamic from "next/dynamic"
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
    <div className="p-5 border-b border-border flex items-center gap-3">
      <Heading className="text-2xl font-semibold">Codestus.com</Heading>

      <ToggleThemeButton className="ml-auto" />
    </div>
  )
}

export default SiteHeader
