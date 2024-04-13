import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

class PostService {
  get status() {
    return {
      publish: 1,
      draft: 0,
    }
  }

  get cookieKeys() {
    return {
      views: (id: string) => `${id}_views`,
    }
  }

  hitPageViews(id: string) {
    const cacheKey = this.cookieKeys.views(id)

    if (cookies().get(cacheKey)) return Promise.resolve()

    cookies().set(this.cookieKeys.views(id), new Date().getTime().toString(), {
      expires: new Date(Date.now() + 1000 * 30),
    })
    return prisma.post.update({ where: { slug: id }, data: { views: { increment: 1 } } })
  }

  getAllPosts() {
    return prisma.post.findMany({
      where: {
        status: this.status.publish,
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }

  detail(id: string) {
    return prisma.post.findFirst({
      where: { slug: id, status: this.status.publish },
      include: { user: true },
    })
  }

  getPostsFromTag(tagId: bigint | number) {
    return prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        post_tags: {
          some: {
            tagId,
          },
        },
      },
    })
  }
}

const postService = new PostService()

export default postService
