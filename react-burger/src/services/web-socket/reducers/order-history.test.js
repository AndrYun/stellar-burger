import { orderHistoryReducer, initialState } from './order-history';
import {
  ORDER_HISTORY_CLOSE,
  ORDER_HISTORY_CLOSED,
  ORDER_HISTORY_ERROR,
  ORDER_HISTORY_MESSAGE,
  ORDER_HISTORY_SUCCESS,
} from '../actions/order-history';
import { mockError, mockOrderFeedAndHistory } from '../../mocks/mocks';

describe('check order history connection', () => {
  it('should return the initial state', () => {
    expect(orderHistoryReducer(undefined, {})).toEqual(initialState);
  });
  it('should check ORDER_HISTORY_SUCCESS', () => {
    expect(
      orderHistoryReducer(initialState, { type: ORDER_HISTORY_SUCCESS })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });
  it('should check ORDER_HISTORY_ERROR', () => {
    expect(
      orderHistoryReducer(initialState, {
        type: ORDER_HISTORY_ERROR,
        payload: mockError,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: mockError,
    });
  });
  it('should check ORDER_HISTORY_CLOSED', () => {
    expect(
      orderHistoryReducer(initialState, { type: ORDER_HISTORY_CLOSED })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });
  it('should check ORDER_HISTORY_CLOSE', () => {
    expect(
      orderHistoryReducer(initialState, { type: ORDER_HISTORY_CLOSE })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      error: undefined,
    });
  });
  it('should check ORDER_HISTORY_MESSAGE', () => {
    expect(
      orderHistoryReducer(initialState, {
        type: ORDER_HISTORY_MESSAGE,
        payload: mockOrderFeedAndHistory,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      orderHistory: mockOrderFeedAndHistory,
    });
  });
});
