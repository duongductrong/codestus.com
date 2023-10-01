import { ReactNode } from "react"

export type ParamsProps<T extends string = ""> = Omit<
  {
    params: Record<T, string> & { locale: keyof typeof dictionaries }
  },
  ""
>

export type SearchParamsProps<T extends string = ""> = Omit<
  {
    searchParams: Record<T, string>
  },
  ""
>

export type LayoutProps<T extends string = ""> = Omit<
  {
    children: ReactNode
  } & Record<T, ReactNode>,
  ""
>

export type ValuesOf<T> = T[keyof T]

export type ChainKeyPath<T> = T extends object
  ? {
      [K in keyof T]: K | `${K}${ChainKeyPath<T[K]> extends "" ? "" : "."}${ChainKeyPath<T[K]>}`
    }[keyof T]
  : ""
