import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

type ThemeMode = "dark" | "light";

export function useThemeMode() {
  const storage = useLocalStorage<ThemeMode>("theme-mode") as ReturnType<
    typeof useLocalStorage
  >;
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => (storage?.get() as ThemeMode) ?? "light");

  const toggleThemeMode = () => {
    const reverseMode = themeMode === "light" ? "dark" : "light";

    setThemeMode(reverseMode);

    storage?.set(reverseMode);
  };

  // Only run first time
  useEffect(() => {
    const currentMode = storage?.get() as ThemeMode;
    if (storage && currentMode) {
      setThemeMode(currentMode);
      
    }
  }, [storage]);

  return { themeMode, toggleThemeMode };
}
