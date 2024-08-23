import { IFeed, IWSActions } from '../../../components/utils/types';

export const ORDER_HISTORY_START: 'ORDER_HISTORY_START' = 'ORDER_HISTORY_START';
export const ORDER_HISTORY_CLOSE: 'ORDER_HISTORY_CLOSE' = 'ORDER_HISTORY_CLOSE';
export const ORDER_HISTORY_SUCCESS: 'ORDER_HISTORY_SUCCESS' =
  'ORDER_HISTORY_SUCCESS';
export const ORDER_HISTORY_ERROR: 'ORDER_HISTORY_ERROR' = 'ORDER_HISTORY_ERROR';
export const ORDER_HISTORY_CLOSED: 'ORDER_HISTORY_CLOSED' =
  'ORDER_HISTORY_CLOSED';
export const ORDER_HISTORY_MESSAGE: 'ORDER_HISTORY_MESSAGE' =
  'ORDER_HISTORY_MESSAGE';

export interface IOrderHistoryStart {
  readonly type: typeof ORDER_HISTORY_START;
  readonly payload: string;
}

export interface IOrderHistoryClose {
  readonly type: typeof ORDER_HISTORY_CLOSE;
  readonly payload: string;
}
export interface IOrderHistorySuccess {
  readonly type: typeof ORDER_HISTORY_SUCCESS;
  readonly payload: Event;
}

export interface IOrderHistoryError {
  readonly type: typeof ORDER_HISTORY_ERROR;
  readonly payload: Event;
}

export interface IOrderHistoryClosed {
  readonly type: typeof ORDER_HISTORY_CLOSED;
  readonly payload: Event;
}

export interface IOrderHistoryMessage {
  readonly type: typeof ORDER_HISTORY_MESSAGE;
  readonly payload: IFeed;
}

export type TOrderHistoryActions =
  | IOrderHistoryStart
  | IOrderHistoryClose
  | IOrderHistorySuccess
  | IOrderHistoryError
  | IOrderHistoryClosed
  | IOrderHistoryMessage;

export const orderHistoryStart = (url: string) => {
  return {
    type: ORDER_HISTORY_START,
    payload: url,
  };
};

export const orderHistoryClose = (reason: string) => {
  return {
    type: ORDER_HISTORY_CLOSE,
    payload: reason,
  };
};

export const orderHistoryActions: IWSActions = {
  init: ORDER_HISTORY_START,
  success: ORDER_HISTORY_SUCCESS,
  disconnect: ORDER_HISTORY_CLOSED,
  error: ORDER_HISTORY_ERROR,
  closing: ORDER_HISTORY_CLOSE,
  message: ORDER_HISTORY_MESSAGE,
};
