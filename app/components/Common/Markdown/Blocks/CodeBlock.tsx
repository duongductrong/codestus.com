/* eslint-disable react/jsx-key */
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
        <pre
          className={className}
          style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const tokenProps = getTokenProps({ token, key });

                return true && <span {...tokenProps} />;
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
