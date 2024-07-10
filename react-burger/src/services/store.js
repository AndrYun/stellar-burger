import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';
import modalReducer from './slices/modal-slice';
import constructorReducer from './slices/burger-constructor-slice';
import orderReducer from './slices/order-details-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
  },
});

export default store;
