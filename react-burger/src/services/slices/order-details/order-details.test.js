import orderReducer, { sendOrder } from './order-details-slice';
import { mockOrder } from '../../mocks/mocks';

describe('check order request', () => {
  const initialState = {
    data: {
      success: false,
      name: undefined,
      order: {
        number: undefined,
      },
    },
    isLoading: false,
    error: null,
  };
  it('should send order pending', () => {
    const state = orderReducer(initialState, sendOrder.pending('pending'));

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should send order fulfilled', () => {
    const state = orderReducer(
      initialState,
      sendOrder.fulfilled(mockOrder, 'fulfilled')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.data).toEqual(mockOrder);
  });

  it('should send order rejected', () => {
    const error = 'Something went wrong';
    const state = orderReducer(
      initialState,
      sendOrder.rejected(error, 'rejected')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.error).toEqual(error);
  });
});
