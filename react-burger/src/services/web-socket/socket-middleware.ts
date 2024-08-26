import type { Middleware } from 'redux';
import { IWSActions } from '../../components/utils/types';
import { RootState } from '../store';

export const socketMiddleware = (
  wsActions: IWSActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (action.type === wsActions.init) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: wsActions.success,
            payload: 'WebSocket connection established',
          });
        };
        socket.onerror = (event) => {
          dispatch({
            type: wsActions.error,
            payload: 'WebSocket error occurred',
          });
        };
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData = JSON.parse(event.data);
          dispatch({ type: wsActions.message, payload: { ...parseData } });
        };
        socket.onclose = (event) => {
          dispatch({
            type: wsActions.disconnect,
            payload: { code: event.code, reason: event.reason },
          });
        };
        if (action.type === wsActions.closing) {
          socket.close(1000, action.payload);
        }
      }
      next(action);
    };
  };
};
