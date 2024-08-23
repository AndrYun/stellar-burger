import { IFeed } from '../../../components/utils/types';
import {
  ORDER_HISTORY_CLOSE,
  ORDER_HISTORY_CLOSED,
  ORDER_HISTORY_ERROR,
  ORDER_HISTORY_MESSAGE,
  ORDER_HISTORY_SUCCESS,
  TOrderHistoryActions,
} from '../actions/order-history';

interface IWSState {
  wsConnected: boolean;
  orderHistory: IFeed | null;
  error?: Event;
}

export const initialState = {
  wsConnected: false,
  orderHistory: null,
};

export const orderHistoryReducer = (
  state: IWSState = initialState,
  action: TOrderHistoryActions
): IWSState => {
  switch (action.type) {
    case ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case ORDER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case ORDER_HISTORY_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case ORDER_HISTORY_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case ORDER_HISTORY_MESSAGE:
      return {
        ...state,
        error: undefined,
        orderHistory: action.payload,
      };
    default:
      return state;
  }
};
