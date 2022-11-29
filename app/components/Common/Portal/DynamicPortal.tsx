/* eslint-disable react-hooks/exhaustive-deps */
import type { HTMLAttributes } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import React from "react";
import { createPortal } from "react-dom";

export interface DynamicPortalProps
  extends Pick<HTMLAttributes<HTMLElement>, "children" | "id"> {}

const DynamicPortal = ({ id, children, ...props }: DynamicPortalProps) => {
  const el = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!id) id = new Date().getTime().toString();

    const getOrCreateElementById =
      document.getElementById(id) || document.createElement("div");

    getOrCreateElementById.setAttribute("id", id);
    el.current = getOrCreateElementById;

    document.body.appendChild(getOrCreateElementById);

    return () => {
      el.current = null;
      getOrCreateElementById.remove();
    };
  }, [id]);

  return mounted && el.current
    ? createPortal(children, el.current as HTMLElement)
    : null;
};

export default DynamicPortal;
