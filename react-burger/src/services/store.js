import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';
import modalReducer from './slices/modal-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
  },
});

export default store;
