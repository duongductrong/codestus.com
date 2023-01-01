import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import { Children, cloneElement } from "react";
import { MdInfo, MdOutlineWarning, MdRemoveCircle } from "react-icons/md";

export interface CalloutProps extends Pick<HTMLAttributes<any>, "children"> {
  color: "info" | "error" | "warn";
}

const Callout: FC<CalloutProps> = ({ color = "info", children }) => {
  const calloutThemeColor = {
    info: "bg-teal-400/50 dark:bg-teal-200 text-teal-900",
    error: "bg-red-400/50 dark:bg-red-200 text-red-900",
    warn: "bg-yellow-400/50 dark:bg-yellow-200 text-yellow-900",
  }[color];

  const CalloutIcons = {
    info: MdInfo,
    warn: MdOutlineWarning,
    error: MdRemoveCircle,
  }[color] as any;

  return (
    <div className={clsx("flex p-4", "rounded-lg text-[15px]", calloutThemeColor)}>
      <div className="mr-2 leading-normal">
        <CalloutIcons size={20} />
      </div>
      <div className="!m-0 leading-normal">
        {Children.toArray(children).map((child: any) => cloneElement(child, { className: "!m-0" }))}
      </div>
    </div>
  );
};

export default Callout;
