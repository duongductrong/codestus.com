import GoogleAnalyticsBody from "@/components/google-analytics/google-analytics-body"
import GoogleAnalyticsHead from "@/components/google-analytics/google-analytics-head"
import { LayoutProps } from "@/types/utilities"

const isProduction = process.env.APP_ENV === "production"

export interface SiteLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const SiteLayout = ({ children, header }: SiteLayoutProps) => (
  <main className="max-w-[800px] mx-auto">
    {header}
    {children}

    <GoogleAnalyticsBody active={isProduction} />
    <GoogleAnalyticsHead active={isProduction} />
  </main>
)

export default SiteLayout
