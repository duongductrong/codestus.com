import { parse, transform, type RenderableTreeNodes } from "@markdoc/markdoc";

const codeblock = {
  render: "CodeBlock",
  attributes: {
    language: {
      type: String,
    },
  },
};

export function markdown(markdown: string): RenderableTreeNodes {
  return transform(parse(markdown), {
    nodes: {
      fence: codeblock,
    },
  });
}
