import { prisma } from "./db.server";

class TagService {
  getTagBySlug(slug: string) {
    return prisma.tag.findUniqueOrThrow({
      where: {
        slug,
      },
    });
  }
}

const tagService = new TagService();

export default tagService;
