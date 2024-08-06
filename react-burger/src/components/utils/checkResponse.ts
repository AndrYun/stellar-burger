export const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error('Space connection lost (((');
  }
  return res;
};
