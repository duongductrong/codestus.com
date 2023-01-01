import clsx from "clsx";
import React from "react";

const SpinIcon = () => (
  <div
    className={clsx(
      "w-5 h-5 rounded-full animate-spin",
      "border-2 border-t-white border-r-blue-600 border-b-red-600 border-l-green-600 border-neutral-600",
    )}
  />
);

export default SpinIcon;
