import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
