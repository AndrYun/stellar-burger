import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../../components/utils/request';
import { RootState } from '../../store';

interface IOrderNumber {
  number: string | undefined;
}

interface IOrderData {
  success: boolean;
  name: string | undefined;
  order: IOrderNumber;
}

interface IOrderState {
  data: IOrderData;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  data: {
    success: false,
    name: undefined,
    order: {
      number: undefined,
    },
  },
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk<
  IOrderData,
  string[],
  { rejectValue: string }
>('order/sendOrder', async (ingredients, thunkAPI) => {
  const res = await request('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue('Failed to send order');
  }

  return res.json();
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      sendOrder.fulfilled,
      (state, action: PayloadAction<IOrderData>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      sendOrder.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      }
    );
  },
});

export const selectOrder = (state: RootState) => state.order;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;

export default orderSlice.reducer;
