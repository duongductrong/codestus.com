/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: true,
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
    outputFileTracingIncludes: {
      "/posts/[id]": ["node_modules/shiki/**/*"],
    },
  },
  env: {
    APP_URL: process.env.APP_URL,
    APP_ENV: process.env.APP_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
