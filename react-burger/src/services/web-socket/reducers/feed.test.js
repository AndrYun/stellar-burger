import { orderFeedReducer, initialState } from './feed';
import {
  FEED_SUCCESS,
  FEED_CLOSE,
  FEED_DISCONNECT,
  FEED_ERROR,
  FEED_MESSAGE,
} from '../actions/feed';
import { mockError, mockOrderFeedAndHistory } from '../../mocks/mocks';

describe('check feed connection', () => {
  it('should return the initial state', () => {
    expect(orderFeedReducer(undefined, {})).toEqual(initialState);
  });
  it('should check FEED_SUCCESS', () => {
    expect(orderFeedReducer(initialState, { type: FEED_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });
  it('should check FEED_ERROR', () => {
    expect(
      orderFeedReducer(initialState, { type: FEED_ERROR, payload: mockError })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: mockError,
    });
  });
  it('should check FEED_DISCONNECT', () => {
    expect(orderFeedReducer(initialState, { type: FEED_DISCONNECT })).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });
  it('should check FEED_CLOSE', () => {
    expect(orderFeedReducer(initialState, { type: FEED_CLOSE })).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });
  it('should check FEED_MESSAGE', () => {
    expect(
      orderFeedReducer(initialState, {
        type: FEED_MESSAGE,
        payload: mockOrderFeedAndHistory,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      orderFeed: mockOrderFeedAndHistory,
    });
  });
});
