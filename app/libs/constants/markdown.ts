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
