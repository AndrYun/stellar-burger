import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../components/utils/url';

const initialState = {
  user: null,
  authHasChecked: false,
};

export const getUser = () => {
  return (dispatch) => {
    return BASE_URL.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = createAsyncThunk('authUser/login', async () => {
  const res = await BASE_URL.login();
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const { setAuthChecked, setUser } = authUserSlice.actions;

export const selectUser = (state) => state.authUser.user;
export const selectAuthChecked = (state) => state.authUser.authHasChecked;

export default authUserSlice.reducer;
