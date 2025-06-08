"use client"

import { UserForm } from "@/admin/user/components/user-form"
import { useCreateUser } from "@/api/users/create-user"

export default function CreateUserPage() {
  const { mutateAsync: createUser, isPending } = useCreateUser()

  return (
    <main className="container py-6">
      <UserForm
        onSubmit={async (data) => {
          await createUser({
            name: data.name,
            email: data.email,
            password: data.password || "",
            role: data.role,
          })
        }}
        isSubmitting={isPending}
        mode="create"
      />
    </main>
  )
}
