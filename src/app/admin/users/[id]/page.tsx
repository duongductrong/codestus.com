"use client"

import { UserForm } from "@/admin/user/components/user-form"
import { useGetUser } from "@/api/users/get-user"
import { useUpdateUser } from "@/api/users/update-user"
import { notFound } from "next/navigation"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { data: user, isLoading } = useGetUser({ variables: { id: params.id } })
  const { mutate: updateUser, isPending } = useUpdateUser()

  if (isLoading) {
    return (
      <main className="container py-6">
        <div>Loading...</div>
      </main>
    )
  }

  if (!user) {
    notFound()
  }

  return (
    <main className="container py-6">
      <UserForm
        defaultValues={{
          name: user.name,
          email: user.email,
          role: user.role as "user" | "admin",
        }}
        onSubmit={async (data) => {
          await updateUser({ id: params.id, ...data })
        }}
        isSubmitting={isPending}
        mode="edit"
      />
    </main>
  )
}
