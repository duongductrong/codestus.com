import { Post, Tag, Topic } from "@/db/schema"

export interface PostWithRelations extends Post {
  tags?: {
    tag: Tag
  }[]
  topic?: Topic | null
}

export interface CreatePostPayload {
  title: string
  slug: string
  description?: string | null
  thumbnail?: string | null
  content?: string | null
  status?: "draft" | "published"
  topicId?: number | null
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {
  views?: number
  publishAt?: Date | null
} 