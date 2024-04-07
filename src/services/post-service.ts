import { prisma } from "@/lib/prisma"

class PostService {

  get status() {
    return {
      publish: 1,
      draft: 0
    }
  }

  getAllPosts() {
    return prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
  }

  detail(id: string) {
    return prisma.post.findFirst({ where: { slug: id, status: this.status.publish }, include: { users: true } })
  }

  getPostsFromTag(tagId: bigint | number) {
    return prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        post_tags: { some: { tagId } },
      },
    })
  }
}

const postService = new PostService()

export default postService
