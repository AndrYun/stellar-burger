export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error('Space connection lost (((');
  }
  return res;
};
