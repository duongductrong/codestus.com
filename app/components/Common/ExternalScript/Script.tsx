import type { FC, ScriptHTMLAttributes } from "react";
import { useEffect } from "react";
import { useHydrated } from "remix-utils";

export interface ScriptProps extends ScriptHTMLAttributes<HTMLScriptElement> {}

const Script: FC<ScriptProps> = (props) => {
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated) {
      const script = document.createElement("script");
      const attributes = props;

      Object.entries(attributes).forEach(([attributeName, value]) => {
        script.setAttribute(attributeName, value.toString());
      });

      document.body.append(script);

      return () => {
        script.remove();
      };
    }
  }, [hydrated]);

  return null;
};

export default Script;
