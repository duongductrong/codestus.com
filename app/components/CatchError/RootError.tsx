import { useCatch } from "@remix-run/react";
import type { FC, ReactNode } from "react";
import ErrorNotFound from "./ErrorNotFound";

export interface RootErrorMap {
  [x: string | number]: ReactNode | JSX.Element | FC<any> | HTMLElement;
}

const errors: RootErrorMap = {
  "404": ErrorNotFound,
};

export function RootError() {
  const caught = useCatch();

  const ErrorRender = errors[caught.status.toString() as string] as FC<any>;

  return <ErrorRender />;
}
