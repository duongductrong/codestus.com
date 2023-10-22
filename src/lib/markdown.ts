import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import RehypeVideo from "rehype-video"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"
import rehypeHighlight from "rehype-highlight"

export const processMarkdown = (content: string | null | undefined) =>
  unified()
    .use(remarkToc)
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(RehypeVideo, { details: false })
    .use(rehypeStringify)
    .process(content || "")

export const generateHtmlFromMarkdownVFile = async (data: ReturnType<typeof processMarkdown>) =>
  String(await data)
