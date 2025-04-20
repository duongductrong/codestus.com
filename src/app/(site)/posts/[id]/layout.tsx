import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/router"
import { PAGE_URLS } from "@/constants/urls"
import { LayoutProps as NextLayoutProps } from "@/types/utilities"
import { ArrowLeft } from "lucide-react"

export interface LayoutProps extends NextLayoutProps<"related"> {}

const Layout = ({ related, children }: LayoutProps) => (
  <section className="p-6">
    <div className="flex items-center gap-2">
      <Button as={Link} href={PAGE_URLS.HOME} variant="muted" size="icon" className="rounded-full">
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <p className="text-muted-foreground">Go back</p>
    </div>
    {children}
    {related}
  </section>
)

export default Layout
