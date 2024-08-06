import { checkResponse } from './checkResponse';
import { BASE_URL } from './url';

export const request = (endpoint: string, options: any) => {
  return fetch(`${BASE_URL}` + endpoint, options).then(checkResponse);
};
