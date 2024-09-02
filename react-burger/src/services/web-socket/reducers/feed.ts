import { IFeed } from '../../../components/utils/types';
import {
  FEED_CLOSE,
  FEED_DISCONNECT,
  FEED_MESSAGE,
  IFeedActions,
} from '../actions/feed';
import { FEED_ERROR, FEED_SUCCESS } from '../actions/feed';

interface IWSState {
  wsConnected: boolean;
  orderFeed: IFeed | null;
  error?: Event;
}

export const initialState: IWSState = {
  wsConnected: false,
  orderFeed: null,
};

export const orderFeedReducer = (
  state: IWSState = initialState,
  action: IFeedActions
) => {
  switch (action.type) {
    case FEED_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case FEED_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case FEED_DISCONNECT:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case FEED_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case FEED_MESSAGE:
      return {
        ...state,
        error: undefined,
        orderFeed: action.payload,
      };
    default:
      return state;
  }
};
