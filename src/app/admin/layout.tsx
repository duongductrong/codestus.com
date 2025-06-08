"use client"

import { Toaster } from "@/components/ui/sonner"
import AdminLayout from "@/layouts/admin/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export interface AdminLayoutProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Layout = ({ children }: AdminLayoutProps) => (
  <QueryClientProvider client={queryClient}>
    <AdminLayout>
      {children}
      <Toaster position="top-right" />
    </AdminLayout>
  </QueryClientProvider>
)

export default Layout
