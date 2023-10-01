import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { LayoutProps } from "@/types/utilities"
import { ArrowLeft } from "lucide-react"

export interface PostsLayoutProps extends LayoutProps<"related"> {}

const PostsLayout = ({ related, children }: PostsLayoutProps) => (
  <section className="p-6">
    <Button as={Link} href={PAGE_URLS.HOME} variant="muted" size="icon" className="rounded-full">
      <ArrowLeft className="w-4 h-4" />
    </Button>
    {children}
    {related}
  </section>
)

export default PostsLayout
