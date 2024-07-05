import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../components/utils/url';
import { request } from '../../components/utils/request';

const initialState = {
  ingredients: [],
  isLoadingByApi: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    return request(BASE_URL)
      .then((res) => res.json())
      .then((result) => result.data);
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoadingByApi = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoadingByApi = false;
      state.ingredients = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoadingByApi = false;
      state.error = action.error.message;
    });
  },
});

export const selectIngredients = (state) => state.ingredients.ingredients;
export const selectIsLoadingByApi = (state) => state.ingredients.isLoadingByApi;
export const selectError = (state) => state.ingredients.error;

export default ingredientsSlice.reducer;
