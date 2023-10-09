import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface SiteLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const SiteLayout = ({ children, sidebar, header }: SiteLayoutProps) => (
  <>
    {/* {sidebar} */}
    <main className="max-w-[800px] mx-auto border border-border">
      {header}
      {children}
    </main>
  </>
)

export default SiteLayout
