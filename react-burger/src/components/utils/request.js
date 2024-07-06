import { checkResponse } from './checkResponse';
import { BASE_URL } from './url';

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}` + endpoint, options).then(checkResponse);
};
