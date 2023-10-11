import { prisma } from "@/lib/prisma"

class PostService {
  getAllPosts() {
    return prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
  }

  detail(id: string) {
    return prisma.post.findFirst({ where: { slug: id }, include: { users: true } })
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
