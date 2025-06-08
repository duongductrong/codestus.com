import EditPostScreen from "@/admin/post/screens/edit"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return <EditPostScreen id={Number(params.id)} />
} 