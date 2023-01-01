/* eslint-disable react/no-unescaped-entities */
import { Link } from "@remix-run/react";
import { GENERAL_ROUTES } from "~/libs/constants/routes";

export type ErrorNotFoundProps = {};

const ErrorNotFound = (props: ErrorNotFoundProps) => (
  <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p className="mt-4 mb-8 dark:text-gray-400">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          rel="noopener noreferrer"
          to={GENERAL_ROUTES.HOME}
          className="px-8 py-3 font-semibold rounded bg-black dark:bg-white text-white dark:text-black">
          Back to homepage
        </Link>
      </div>
    </div>
  </section>
);

export default ErrorNotFound;
