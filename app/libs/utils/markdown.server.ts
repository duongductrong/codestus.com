import { parse, transform, type RenderableTreeNodes } from "@markdoc/markdoc";

import { callout, codeSanBoxEmbed, fence } from "../constants/markdown";

export function markdown(markdown: string): RenderableTreeNodes {
  return transform(parse(markdown), {
    nodes: {
      fence,
    },
    tags: {
      codeSanBoxEmbed,
      callout,
    },
  });
}
