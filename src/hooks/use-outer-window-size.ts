import { useState } from "react";
import { useEvent } from "react-use";

export function useOuterWindowSize() {
  const [width, setWidth] = useState(() => {
    try {
      return window?.outerWidth;
    } catch {
      return 0;
    }
  });
  const [height, setHeight] = useState(() => {
    try {
      return window?.outerHeight;
    } catch {
      return 0;
    }
  });

  useEvent("resize", () => {
    setWidth(window.outerWidth);
    setHeight(window.outerHeight);
  });

  return { width, height };
}
