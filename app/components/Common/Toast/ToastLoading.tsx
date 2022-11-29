import { useTransition } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { TRANSITION_STATE, TRANSITION_TYPE } from "~/libs/constants/remixHook";
import { GENERAL_ROUTES } from "~/libs/constants/routes";
import DynamicPortal from "../Portal/DynamicPortal";
import clsx from "clsx";

export interface ToastLoadingProps {}

const ToastLoading: FC<ToastLoadingProps> = (props) => {
  const transition = useTransition();

  const isNavigating =
    transition.state === TRANSITION_STATE.LOADING &&
    transition.type === TRANSITION_TYPE.NORMAL_LOAD;

  return (
    <DynamicPortal id="toast-loading">
      <div
        className={clsx(
          "fixed bottom-4 right-4",
          "border rounded-lg py-4 px-6 bg-[#151618] dark:bg-white shadow-lg",
          "text-sm text-white",
          "flex items-center pointer-events-none",
          " transition-all duration-300",
          {
            "translate-x-0": isNavigating,
            "opacity-0 -translate-x-4": !isNavigating,
          },
        )}>
        <div className="w-5 h-5 rounded-full border-2 border-t-white border-neutral-600 animate-spin"></div>
        <span className="inline-block ml-3 text-white dark:text-black">Đang tải..</span>
      </div>
    </DynamicPortal>
  );
};

export default ToastLoading;
