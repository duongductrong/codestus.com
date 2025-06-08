import SiteLayout from "@/layouts/site/layout"
import { LayoutProps } from "@/types/utilities"

const isProduction = process.env.APP_ENV === "production"

interface SiteLayoutProps extends LayoutProps<"header"> {}

const Layout = ({ children, header }: SiteLayoutProps) => (
  <SiteLayout isActiveAnalytics={!!isProduction}>
    {header}
    {children}
  </SiteLayout>
)

export default Layout
