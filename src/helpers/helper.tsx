export const formatId = (id: string) => {
  if (id.length <= 12) {
    return id;
  }
  return `${id.slice(0, 7)}...${id.slice(-5)}`;
};
