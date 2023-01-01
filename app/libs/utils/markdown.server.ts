import { parse, transform, type RenderableTreeNodes } from "@markdoc/markdoc";

import { callout, codeSanBoxEmbed, fence } from "../constants/markdown";

export function markdown(_markdown: string): RenderableTreeNodes {
  return transform(parse(_markdown), {
    nodes: {
      fence,
    },
    tags: {
      codeSanBoxEmbed,
      callout,
    },
  });
}
