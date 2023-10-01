import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const ToggleThemeButton = dynamic(
  () =>
    import("@/components/custom-themes/toggle-theme-button").then((module) => ({
      default: module.ToggleThemeButton,
    })),
  { ssr: false }
)

export interface SiteHeaderProps {}

const SiteHeader = (props: SiteHeaderProps) => (
  <div className="p-5 border-b border-border flex items-center gap-3">
    <p className="text-2xl font-semibold">Blog</p>

    <ToggleThemeButton className="ml-auto" />
  </div>
)

export default SiteHeader
