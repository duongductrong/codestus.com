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
  description?: string
  thumbnail?: string
  content?: string
  status?: "draft" | "published"
  topicId?: number
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {
  views?: number
  publishAt?: Date
} 