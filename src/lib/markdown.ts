import nord from "@/lib/shiki/themes/nord.json"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"

export const processMarkdown = (content: string | null | undefined) =>
  unified()
    .use(remarkToc)
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypePrettyCode, {
      // See Options section below.
      theme: nord as any,
    })
    .use(rehypeStringify)
    .process(content || "")

export const generateHtmlFromMarkdownVFile = async (data: ReturnType<typeof processMarkdown>) =>
  String(await data)
