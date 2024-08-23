import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/burger-ingredients-slice';
import modalReducer from './slices/modal-slice';
import constructorReducer from './slices/burger-constructor-slice';
import orderReducer from './slices/order-details-slice';
import authUserReducer from './slices/user-auth-slice';
import { socketMiddleware } from './web-socket/socket-middleware';
import { feedActions } from './web-socket/actions/feed';
import { orderFeedReducer } from './web-socket/reducers/feed';
import { orderHistoryActions } from './web-socket/actions/order-history';
import { orderHistoryReducer } from './web-socket/reducers/order-history';

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
  feedSocket: orderFeedReducer,
  historySocket: orderHistoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedActions),
      socketMiddleware(orderHistoryActions)
    ),
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
