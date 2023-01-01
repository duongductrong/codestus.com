import { useMounted } from "./useMounted";

export function useLocalStorage<T>(key: string) {
  const { mounted } = useMounted();

  return mounted
    ? {
        get: (): T => window.localStorage.getItem(key) as T,
        set: (value: string) => window.localStorage.setItem(key, value),
        remove: () => window.localStorage.removeItem(key),
        clearAll: () => window.localStorage.clear(),
      }
    : null;
}
