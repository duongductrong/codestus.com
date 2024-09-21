// import { prisma } from "@/lib/prisma"

class TagService {
  detail(id: string) {
    return []
    // return prisma.tag.findFirst({ where: { slug: id } })
  }
}

const tagService = new TagService()

export default tagService
