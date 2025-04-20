import GoogleAnalyticsBody from "@/components/google-analytics/google-analytics-body"
import GoogleAnalyticsHead from "@/components/google-analytics/google-analytics-head"

export interface SiteLayoutProps {
  children: React.ReactNode

  isActiveAnalytics?: boolean
}

const SiteLayout = ({ children, isActiveAnalytics = true }: SiteLayoutProps) => (
  <main className="max-w-[800px] mx-auto">
    {children}

    <GoogleAnalyticsBody active={isActiveAnalytics} />
    <GoogleAnalyticsHead active={isActiveAnalytics} />
  </main>
)

export default SiteLayout
