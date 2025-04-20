import AdminLayout from "@/layouts/admin/layout"
import React from "react"

export interface AdminLayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: AdminLayoutProps) => <AdminLayout>{children}</AdminLayout>

export default Layout
