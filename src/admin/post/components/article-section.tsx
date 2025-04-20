import { Article } from "@/layouts/admin/data"
import { ArticleCard } from "@/admin/post/components/article-card"

interface ArticleSectionProps {
  articles: Article[]
}

export function ArticleSection({ articles }: ArticleSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Articles</h2>
      </div>
      <div className="grid gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
