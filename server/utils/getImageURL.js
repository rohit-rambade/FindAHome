export const getImagePublicIdFromUrl = (imageUrl) => {
  const startIndex = imageUrl.lastIndexOf("/") + 1;
  const endIndex = imageUrl.lastIndexOf(".");
  return imageUrl.substring(startIndex, endIndex);
};
