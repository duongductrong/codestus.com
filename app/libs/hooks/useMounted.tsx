import { useEffect, useState } from "react";

export function useMounted(dep = []) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [...dep]);

  return {
    mounted: isMounted,
  };
}
