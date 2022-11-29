import { renderers, type RenderableTreeNodes } from "@markdoc/markdoc";
import * as React from "react";
import CodeBlock from "./Blocks/CodeBlock";

export interface MarkdownProps {
  content: RenderableTreeNodes;
}

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <>
      {renderers.react(content, React, {
        components: {
          CodeBlock,
        },
      })}
    </>
  );
};

export default Markdown;
