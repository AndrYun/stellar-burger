import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (ingredients, thunkAPI) => {
    try {
      const response = await fetch(
        'https://norma.nomoreparties.space/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients }),
        }
      );
      if (!response.ok) {
        throw new Error('Мы потеряли Ваш заказ :(');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
