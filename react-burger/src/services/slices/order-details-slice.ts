import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../components/utils/request';
import { RootState } from '../store';

interface IOrderState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  data: null,
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk<
  string,
  string[],
  { rejectValue: string }
>('order/sendOrder', async (ingredients, thunkAPI) => {
  try {
    return request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    }).then((res) => res.json());
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
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
      (state, action: PayloadAction<string>) => {
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

export default orderSlice.reducer;
