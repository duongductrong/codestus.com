import { renderers, type RenderableTreeNodes } from "@markdoc/markdoc";
import * as React from "react";
import Fence from "./Blocks/Fence";
import CodeSanBoxEmbed from "./Blocks/CodeSanBoxEmbed";
import Callout from "./Blocks/Callout";

export interface MarkdownProps {
  content: RenderableTreeNodes;
}

const Markdown = ({ content }: MarkdownProps) => (
    <>
      {renderers.react(content, React, {
        components: {
          Fence,
          CodeSanBoxEmbed,
          Callout,
        },
      })}
    </>
  );

export default Markdown;
