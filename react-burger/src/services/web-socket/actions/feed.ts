// import { createAction } from '@reduxjs/toolkit';
import { IFeed, IWSActions } from '../../../components/utils/types';

export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';
export const FEED_SUCCESS: 'FEED_SUCCESS' = 'FEED_SUCCESS';
export const FEED_CLOSE: 'FEED_CLOSE' = 'FEED_CLOSE';
export const FEED_MESSAGE: 'FEED_MESSAGE' = 'FEED_MESSAGE';
export const FEED_ERROR: 'FEED_ERROR' = 'FEED_ERROR';

// interfaces
export interface IFeedConnect {
  readonly type: typeof FEED_CONNECT;
  readonly payload: string;
}
export interface IFeedClose {
  readonly type: typeof FEED_CLOSE;
  readonly payload: string;
}
export interface IFeedSuccess {
  readonly type: typeof FEED_SUCCESS;
  readonly payload: Event;
}
export interface IFeedError {
  readonly type: typeof FEED_ERROR;
  readonly payload: Event;
}
export interface IFeedDisconnect {
  readonly type: typeof FEED_DISCONNECT;
  readonly payload: Event;
}
export interface IFeedMessage {
  readonly type: typeof FEED_MESSAGE;
  readonly payload: IFeed;
}

export type IFeedActions =
  | IFeedConnect
  | IFeedClose
  | IFeedSuccess
  | IFeedError
  | IFeedDisconnect
  | IFeedMessage;

export const feedConnect = (url: string) => {
  return {
    type: FEED_CONNECT,
    payload: url,
  };
};

export const feedDisconnect = (reason: string) => {
  return {
    type: FEED_DISCONNECT,
    payload: reason,
  };
};

export const feedActions: IWSActions = {
  init: FEED_CONNECT,
  success: FEED_SUCCESS,
  disconnect: FEED_DISCONNECT,
  error: FEED_ERROR,
  closing: FEED_CLOSE,
  message: FEED_MESSAGE,
};
