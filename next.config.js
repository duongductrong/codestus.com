/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: true,
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
  images: {
    domains: [
      "avatars.githubusercontent.com"
    ]
  }
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
