import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: [],
  ingredients: [],
};

// отображаем булки и ингредиенты отдельном

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
});
