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
          dispatch({ type: wsActions.success, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: wsActions.error, payload: event });
        };
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch({ type: wsActions.message, payload: parseData });
        };
        socket.onclose = (event) => {
          dispatch({ type: wsActions.disconnect, payload: event });
        };
        if (action.type === wsActions.closing) {
          socket.close(1000, action.payload);
        }
      }
      next(action);
    };
  };
};

// export const socketMiddleware = (
//   wsUrl: string,
//   wsActions: IWSActions
// ): Middleware => {
//   return (store: MiddlewareAPI) => {
//     let socket: WebSocket | null = null;

//     return (next) => (action) => {
//       const { dispatch } = store;
//       const { type } = action;
//       const { init, success, disconnect, error, closing, message } = wsActions;
//       if (init.match(action)) {
//         const wsUrl = action.payload;
//         socket = new WebSocket(wsUrl);
//       }
//       if (socket) {
//         socket.onopen = (event) => {
//           dispatch(success());
//         };
//         socket.onerror = (event) => {
//           dispatch({ type: error, payload: event });
//         };
//         socket.onmessage = (event) => {
//           dispatch({ type: message, payload: event });
//         };
//         socket.
//       }
//     };
//   };
// };
