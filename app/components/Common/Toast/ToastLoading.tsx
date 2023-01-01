import { useTransition } from "@remix-run/react";
import type { FC } from "react";
import { TRANSITION_STATE, TRANSITION_TYPE } from "~/libs/constants/remixHook";
import SpinIcon from "../Icon/SpinIcon";
import DynamicPortal from "../Portal/DynamicPortal";
import Toast from "./Toast";

export interface ToastLoadingProps {}

const ToastLoading: FC<ToastLoadingProps> = (props) => {
  const transition = useTransition();

  const isNavigating =
    transition.state === TRANSITION_STATE.LOADING &&
    transition.type === TRANSITION_TYPE.NORMAL_LOAD;

  return (
    <DynamicPortal id="toast-loading">
      <Toast
        open={isNavigating}
        title="Thông báo"
        describe="Đang điều hướng đến trang yêu cầu."
        prefixIcon={<SpinIcon />} />
    </DynamicPortal>
  );
};

export default ToastLoading;
