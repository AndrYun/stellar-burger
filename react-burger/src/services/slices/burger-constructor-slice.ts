import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../components/utils/types';
import { RootState } from '../store';

interface IBurgerConstructor {
  bun: IIngredient | null;
  ingredients: IIngredient[];
}

const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<IIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, id: uuidv4() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<number | undefined>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addBun: {
      reducer: (state, action: PayloadAction<IIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (bun: IIngredient) => {
        return { payload: { ...bun, id: uuidv4() } };
      },
    },
    removeBun: (state) => {
      state.bun = null;
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const [draggedIngredient] = state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedIngredient);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  addBun,
  removeBun,
  removeIngredient,
  moveIngredient,
  resetConstructor,
} = burgerConstructorSlice.actions;

export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectIngredient = (state: RootState) =>
  state.burgerConstructor.ingredients;

export default burgerConstructorSlice.reducer;
