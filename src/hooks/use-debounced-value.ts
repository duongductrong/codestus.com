import { useState } from "react"
import { useDebounce } from "react-use"

export function useDebouncedValue<T>(value: T, delay: number = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useDebounce(() => {
    setDebouncedValue(value)
  }, delay, [value])

  return debouncedValue
}
