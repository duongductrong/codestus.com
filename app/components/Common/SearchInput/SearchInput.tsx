/* eslint-disable react/button-has-type */
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import type { ButtonHTMLAttributes, FC, InputHTMLAttributes } from "react";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  searchButtonText?: string;
  searchButtonType?: "submit" | "button";
  searchButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  loading?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
  className,
  searchButtonText = "Search",
  searchButtonProps,
  id = "default-search",
  loading,
  ...props
}) => (
  <div className={clsx(className)}>
    <label htmlFor={id} className="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white">
      {searchButtonText}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-neutral-500 dark:text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        {...props}
        type="search"
        id={id}
        className={clsx(
          "block w-full p-4 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg",
          "bg-neutral-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:border-neutral-600",
          "dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        )}
      />
      <button
        {...searchButtonProps}
        type={searchButtonProps?.type ?? "submit"}
        className={clsx(
          "text-white absolute right-2.5 bottom-2.5font-medium rounded-lg text-sm px-4 py-2",
          "focus:ring-4 focus:outline-none focus:ring-blue-300",
          "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        )}>
        {loading && <Spinner size="sm" className="mr-2" />}
        {searchButtonText}
      </button>
    </div>
  </div>
);

SearchInput.defaultProps = {
  searchButtonText: "",
  searchButtonProps: {},
  searchButtonType: "submit",
  loading: false,
};

export default SearchInput;
