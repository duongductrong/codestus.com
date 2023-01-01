import type { FC } from "react";

export interface EmbedBlockProps {
  url?: string;
}

const CodeSanBoxEmbed: FC<EmbedBlockProps> = ({ url }) => (
  <iframe
    src={url}
    className="w-full h-[500px] rounded-lg overflow-hidden"
    title="Counter render (forked)"
    // eslint-disable-next-line max-len
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
);

CodeSanBoxEmbed.defaultProps = {
  url: "",
};

export default CodeSanBoxEmbed;
