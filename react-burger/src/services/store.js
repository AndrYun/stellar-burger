import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';
import modalReducer from './slices/modal-slice';
import constructorReducer from './slices/burger-constructor-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
  },
});

export default store;
