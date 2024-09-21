import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import dayjs from "dayjs"

const posts = defineCollection({
  name: "posts",
  directory: "src/contents",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    publishAt: z
      .string()
      .transform((date) => dayjs(date).toISOString())
      .optional(),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
    views: z.number().default(0).optional(),
    createdAt: z.string().transform((date) => dayjs(date).toISOString()),
    updatedAt: z.string().transform((date) => dayjs(date).toISOString()),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)
    return {
      ...document,
      slug: document.slug || document._meta.path,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
