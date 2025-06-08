import OpenGraphImage from "@/assets/images/open-graph-image.png"
import { RouterProvider } from "@/components/ui/router"
import { Toaster } from "@/components/ui/sonner"
import PreferredBody from "@/components/ui/theme/preferred-body"
import PreferredHTML from "@/components/ui/theme/preferred-html"
import PreferredThemeProvider from "@/components/ui/theme/preferred-theme-provider"
import { AuthProvider } from "@/features/auth/contexts/auth-context"
import "@/lib/bigint"
import { inter } from "@/lib/fonts"
import { QueryClientProvider } from "@/lib/react-query"
import "@/styles/globals.scss"
import { cn } from "@/utils/tailwind-utils"
import type { Metadata } from "next"
import Favicon from "./favicon.ico"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || ""),
  icons: [
    {
      type: "image/x-icon",
      rel: "icon",
      url: Favicon.src,
    },
  ],
  title: {
    default: "Codestus.com",
    template: "%s - Codestus.com",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Blog, Chia sẻ kinh nghiệm Frontend về React.js, Vue.js và những kinh nghiệm về lập trình - Codestus.com",
  keywords:
    "javascript tips, lập trình javascript, php tips, lập trình php, code javascript hay, lập trình php, fullstack, cộng đồng lập trình",
  robots: "index, follow",
  verification: {
    google: "eXhMtN2gkr5bkyhvyTamHYNwGBBEQRkdPu5t7cgXqss",
  },
  // themeColor: {
  //   color: "#ffffff",
  // },
  openGraph: {
    type: "website",
    url: "/",
    title: "Trang chủ - Codestus.com",
    description:
      "Blog, Chia sẻ kinh nghiệm Frontend về React.js, Vue.js và những kinh nghiệm về lập trình - Codestus.com",
    images: [OpenGraphImage.src],
    siteName: "codestus.com",
  },
  twitter: {
    title: "Trang chủ - Codestus.com",
    description:
      "Blog, Chia sẻ kinh nghiệm Frontend về React.js, Vue.js và những kinh nghiệm về lập trình - Codestus.com",
    card: "summary_large_image",
    creator: "duongductrong",
    images: [OpenGraphImage.src],
    site: "codestus.com",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PreferredHTML lang="vi" className={cn(inter.variable, "font-inter")}>
      <PreferredBody ifRegexMatch="" then={{ className: "" }} otherwise={{ className: "" }}>
        <QueryClientProvider>
          <AuthProvider>
            <PreferredThemeProvider>
              <RouterProvider>
                {children}
                <Toaster position="bottom-center" />
              </RouterProvider>
            </PreferredThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </PreferredBody>
    </PreferredHTML>
  )
}
