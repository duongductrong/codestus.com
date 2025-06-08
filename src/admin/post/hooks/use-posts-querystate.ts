import { parseAsString, useQueryStates } from "nuqs"

export const usePostsQueryStates = () => {
  const [queryStates, setQueryStates] = useQueryStates({
    search: parseAsString.withDefault(""),
  })

  return [queryStates, setQueryStates] as const
}
