"use client"

import { PostWithRelations } from "@/api/posts"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { PostFormValues, postFormSchema } from "../../schema/post-form"
import { FormFields } from "./form-fields"

interface PostFormProps {
  initialData?: PostWithRelations
  onSubmit: SubmitHandler<PostFormValues>
  onError?: SubmitErrorHandler<PostFormValues>
  onBack?: () => void
  isSubmitting?: boolean
}

export const PostForm = ({
  initialData,
  onSubmit,
  onError,
  onBack,
  isSubmitting,
}: PostFormProps) => {
  const methods = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      thumbnail: initialData?.thumbnail || "",
      content: initialData?.content || "",
      status: initialData?.status || "draft",
      topicId: initialData?.topicId || null,
      tags: initialData?.tags?.map((t) => t.tag.id) || [],
    },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <h1 className="text-2xl font-bold mb-4 text-center">
          {initialData ? "Edit Post" : "Create New Post"}
        </h1>

        <FormFields
          control={methods.control}
          errors={methods.formState.errors}
          autoGenerateSlug={!initialData}
          topActions={
            <div className="flex [&>*]:flex-1 gap-4">
              <Button variant="outline" type="button" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : initialData ? "Save" : "Save"}
              </Button>
            </div>
          }
        />
      </form>
    </FormProvider>
  )
}
