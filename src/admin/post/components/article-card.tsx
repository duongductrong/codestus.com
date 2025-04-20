import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Article } from "@/layouts/admin/data"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="bg-card border-border overflow-hidden transition-all hover:border-muted-foreground/20">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock size={14} className="mr-1" />
              {article.readingTime}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.author}</span>
            <div className="flex items-center">
              <CalendarDays size={14} className="mr-1" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
