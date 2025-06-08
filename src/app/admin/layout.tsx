"use client"

import { RequireAuth } from "@/features/auth/components/require-auth"
import AdminLayout from "@/layouts/admin/layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth requireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </RequireAuth>
  )
}
