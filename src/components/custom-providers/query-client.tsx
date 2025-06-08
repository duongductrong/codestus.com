"use client"

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderTanstack,
} from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient({})

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProviderTanstack client={queryClient}>{children}</QueryClientProviderTanstack>
}
