import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../../components/utils/request';
import { RootState } from '../../store';
import { IIngredient } from '../../../components/utils/types';

interface IBurgerIngredients {
  ingredients: IIngredient[];
  isLoadingByApi: boolean;
  error: string | null;
}

const initialState: IBurgerIngredients = {
  ingredients: [],
  isLoadingByApi: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk<
  IIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, thunkAPI) => {
  const res = await request('/ingredients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.data as IIngredient[];
});

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoadingByApi = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<IIngredient[]>) => {
        state.isLoadingByApi = false;
        state.ingredients = action.payload;
      }
    );
    builder.addCase(
      fetchIngredients.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoadingByApi = false;
        state.error = action.payload || 'Something went wrong';
      }
    );
  },
});

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIsLoadingByApi = (state: RootState) =>
  state.ingredients.isLoadingByApi;
export const selectError = (state: RootState) => state.ingredients.error;

export default ingredientsSlice.reducer;
