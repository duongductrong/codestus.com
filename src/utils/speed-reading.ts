export const getSpeedReading = (content?: string | null) =>
  Math.round(Number(content?.length) / 938)
