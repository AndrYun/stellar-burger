// принимаем fetch из api.js и подставляем их в сreateAsyncThunk - login, authChecking and logout
// и в authUserSlice есть extraReducers для каждого асинхронного вызова:
// login.pending, fulfilled and rejected со state and action
// и далее каждый вызов записывает или удаляет payload из state

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../components/utils/url';
import { authUserHandler, fetchWithRefresh } from '../../components/utils/api';

const initialState = {
  user: null,
  authHasChecked: false,
};

// авторизация login
export const login = createAsyncThunk(
  'authUser/login',
  async ({ email, password }) => {
    const res = await authUserHandler(email, password);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// export const getUser = () => {
//   return (dispatch) => {
//     return BASE_URL.getUser().then((res) => {
//       dispatch(setUser(res.user));
//     });
//   };
// };

export const getUser = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  });
};

export const authUserChecking = createAsyncThunk(
  'authUser/checking',
  async ({ dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      BASE_URL.getUser()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk('authUser/logout', async () => {
  await BASE_URL.logout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.authHasChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUserChecking.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setAuthChecked, setUser } = authUserSlice.actions;

export const selectUser = (state) => state.authUser.user;
export const selectAuthChecked = (state) => state.authUser.authHasChecked;

export default authUserSlice.reducer;
