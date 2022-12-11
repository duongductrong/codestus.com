export const fence = {
  render: "Fence",
  attributes: {
    language: {
      type: String,
    },
  },
};

export const codeSanBoxEmbed = {
  render: "CodeSanBoxEmbed",
  children: ["paragraph", "tag"],
  attributes: {
    url: {
      type: String,
    },
  },
};

export const callout = {
  render: "Callout",
  children: ["paragraph", "tag", "list"],
  attributes: {
    color: {
      type: String,
    }
  },
};
