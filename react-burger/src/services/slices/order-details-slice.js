import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { request } from '../../components/utils/request';
import { createOrderRequest } from '../../components/utils/createOrderRequest.ts';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  // createOrderRequest
  async (payload) => {
    const res = await createOrderRequest(payload);
    return res.json();
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
