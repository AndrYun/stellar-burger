import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';
import modalReducer from './slices/modal-slice';
import constructorReducer from './slices/burger-constructor-slice';
import orderReducer from './slices/order-details-slice';
import authUserReducer from './slices/user-auth-slice';
import { socketMiddleware } from './web-socket/socket-middleware';
import { feedActions } from './web-socket/actions';

// const store = configureStore({
//   reducer: {
//     ingredients: ingredientsReducer,
//     modal: modalReducer,
//     burgerConstructor: constructorReducer,
//     order: orderReducer,
//     user: authUserReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(socketMiddleware(feedActions)),
// });

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: authUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(feedActions)),
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
