import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, id: uuidv4() } };
      },
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addBun: {
      reducer: (state, action) => {
        state.bun = action.payload;
      },
      prepare: (bun) => {
        return { payload: { ...bun, id: uuidv4() } };
      },
    },
    removeBun: (state, action) => {
      state.bun = null;
    },
    moveIngredient: (state, action) => {
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

export const selectBun = (state) => state.burgerConstructor.bun;
export const selectIngredient = (state) => state.burgerConstructor.ingredients;

export default burgerConstructorSlice.reducer;
