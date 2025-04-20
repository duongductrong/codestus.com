"use client"

import { SecondaryNavigation } from "@/layouts/admin/components/secondary-navigation"
import { TopNavigation } from "@/layouts/admin/components/top-navigation"

export interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div className="min-h-screen bg-background text-foreground flex flex-col">
    <TopNavigation />
    <SecondaryNavigation />

    {children}
  </div>
)
export default AdminLayout
