import { renderers, type RenderableTreeNodes } from "@markdoc/markdoc";
import * as React from "react";
import Fence from "./Blocks/Fence";
import CodeSanBoxEmbed from "./Blocks/CodeSanBoxEmbed";

export interface MarkdownProps {
  content: RenderableTreeNodes;
}

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <>
      {renderers.react(content, React, {
        components: {
          Fence,
          CodeSanBoxEmbed,
        },
      })}
    </>
  );
};

export default Markdown;
