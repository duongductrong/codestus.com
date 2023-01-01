/* eslint-disable react/jsx-key */
import clsx from "clsx";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { FC } from "react";

export interface FenceProps {
  language: Language;
  children?: any;
}

const Fence: FC<FenceProps> = ({ language, children }) => (
  <Highlight {...defaultProps} data-language={language} language={language} code={children}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={clsx(className, "!bg-slate-800 dark:!bg-neutral-800 rounded-lg")} style={style}>
        <div className="token-line">
          <span className="token plain"> </span>
        </div>
        {tokens.map((line, i) => {
          const _getLineProps = getLineProps({ line, key: i });
          return (
            <div {..._getLineProps} className={clsx(_getLineProps.className)}>
              {line.map((token, key) => {
                const tokenProps = getTokenProps({ token, key });

                const isKeyword = tokenProps.className.includes("keyword");
                const isPlain = tokenProps.className.includes("plain");
                const isOperator = tokenProps.className.includes("operator");
                const isProperty = tokenProps.className.includes("property");
                const isString = tokenProps.className.includes("string");
                const isAttrName = tokenProps.className.includes("attr-name");
                const method = tokenProps.className.includes("method");
                const _function = tokenProps.className.includes("function");
                const propertyAccess = tokenProps.className.includes("property-access");

                return true && <span {...tokenProps} className={clsx(tokenProps.className)} />;
              })}
            </div>
          );
        })}
      </pre>
    )}
  </Highlight>
);

Fence.defaultProps = {
  children: null,
};

export default Fence;
