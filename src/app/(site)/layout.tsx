import GoogleAnalyticsBody from "@/components/google-analytics/google-analytics-body"
import GoogleAnalyticsHead from "@/components/google-analytics/google-analytics-head"
import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface SiteLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const SiteLayout = ({ children, sidebar, header }: SiteLayoutProps) => (
  <>
    {/* {sidebar} */}
    <main className="max-w-[800px] mx-auto border border-border">
      {header}
      {children}

      <GoogleAnalyticsBody />
      <GoogleAnalyticsHead />
    </main>
  </>
)

export default SiteLayout
