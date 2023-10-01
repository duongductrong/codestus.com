import { LayoutProps } from "@/types/utilities"
import React from "react"

export interface SiteLayoutProps extends LayoutProps<"sidebar" | "header"> {}

const SiteLayout = ({ children, sidebar, header }: SiteLayoutProps) => (
  <>
    {sidebar}
    <main className="xs:ml-[56px] lg:ml-[300px]">
      {header}
      {children}
    </main>
  </>
)

export default SiteLayout
