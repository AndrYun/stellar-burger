import { request } from './request';

export const createOrderRequest = async (
  ingredients: string[],
  thunkAPI: any
) => {
  try {
    return request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(error);
  }
};

// async (ingredients, thunkAPI) => {
//   try {
//     return request('/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ingredients }),
//     }).then((res) => res.json());
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// }
