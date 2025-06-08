"use client"

import {
  QueryClient,
  isServer,
  QueryClientProvider as QueryClientProviderTanstack,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { PropsWithChildren } from "react"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export const queryClient = getQueryClient()

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProviderTanstack client={queryClient}>
    <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    <ReactQueryDevtools />
  </QueryClientProviderTanstack>
)
