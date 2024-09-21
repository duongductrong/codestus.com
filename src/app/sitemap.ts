import { allTags } from "@/constants/tags"
import { PAGE_URLS } from "@/constants/urls"
import { prisma } from "@/lib/prisma"
import { allPosts } from "content-collections"
import dayjs from "dayjs"
import { MetadataRoute } from "next"

const URL = process.env.APP_URL

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  // const [posts, tags] = await prisma.$transaction([
  //   prisma.post.findMany({}),
  //   prisma.tag.findMany({}),
  // ])
  const [posts, tags] = [allPosts, allTags]

  const staticRoutes = [
    {
      url: URL,
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap

  const postRoutes = posts.map<MetadataRoute.Sitemap[0]>((post) => ({
    url: `${URL}${PAGE_URLS.POST_DETAIL.replace(":id", post.slug)}`,
    changeFrequency: "daily",
    lastModified: dayjs(post.publishAt).toDate(),
    priority: 1,
  }))

  const tagRoutes = tags.map<MetadataRoute.Sitemap[0]>((tag) => ({
    url: `${URL}${PAGE_URLS.TAG_DETAIL.replace(":id", tag.slug)}`,
    changeFrequency: "daily",
    lastModified: dayjs(tag.created_at).toDate(),
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes]
}
