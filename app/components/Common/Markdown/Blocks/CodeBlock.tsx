/* eslint-disable react/jsx-key */
import clsx from "clsx";
import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { FC } from "react";

export interface CodeBlockProps {
  language: Language;
  children?: any;
}

const CodeBlock: FC<CodeBlockProps> = ({ language, children }) => {
  return (
    <Highlight
      {...defaultProps}
      data-language={language}
      language={language}
      code={children}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(className, "!bg-slate-900")} style={style}>
          {tokens.map((line, i) => {
            const _getLineProps = getLineProps({ line, key: i });
            return (
              <div {..._getLineProps} className={clsx(_getLineProps.className)}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });

                  return (
                    true && (
                      <span
                        {...tokenProps}
                        className={clsx(tokenProps.className)}
                      />
                    )
                  );
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
