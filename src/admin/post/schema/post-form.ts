import { z } from "zod"

export const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullish().describe("A brief description of the post"),
  thumbnail: z.string().nullish().describe("URL of the post thumbnail image"),
  content: z.string().nullish().describe("The main content of the post"),
  status: z.union([z.literal("draft"), z.literal("published")]).describe("Publication status"),
  topicId: z.number().nullish().describe("ID of the associated topic"),
  tags: z.array(z.number()).describe("Array of tag IDs"),
})

export type PostFormValues = z.infer<typeof postFormSchema>
