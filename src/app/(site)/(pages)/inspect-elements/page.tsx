import BlogRenderer from "@/components/custom-markdowns/blog-renderer"
import { generateHtmlFromMarkdownVFile, processMarkdown } from "@/lib/markdown"
import Inspect from "./inspect.mdx"

export default async function InspectElements() {
  const content = await generateHtmlFromMarkdownVFile(
    processMarkdown(`
    # markdown
    ## markdown

    \`\`\`tsx

    console.log(123)

    \`\`\`
  `)
  )
  return (
    <div className="prose dark:prose-invert max-w-full p-4">
      <Inspect />
      <BlogRenderer content={content} />
    </div>
  )
}
