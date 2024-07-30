import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../components/utils/url';
import {
  authUserHandler,
  fetchWithRefresh,
  userRegisterHandler,
  getUserData,
  forgotPasswordRequest,
  resetPasswordHandler,
} from '../../components/utils/api';

const initialState = {
  user: null,
  authHasChecked: false,
  emailSubmitedForResetPass: false,
};

// register
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }) => {
    const res = await userRegisterHandler(name, email, password);
    return res.user;
  }
);

// авторизация login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await authUserHandler(email, password);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// запрос данных
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    const res = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });
    return res.user;
  }
);

// изменение данных
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ name, email, password }, thunkAPI) => {
    const res = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return res.user;
  }
);

export const getUser = () => {
  return (dispatch) => {
    return getUserData.then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

// проверка авторизации
export const authUserChecking = createAsyncThunk(
  'user/checking',
  async (_, thunkAPI) => {
    try {
      const res = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      });
      return res.user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Authentication check failed');
    }
  }
);

// запрос на forgot-password
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email) => {
    const res = await forgotPasswordRequest(email);
    return res;
  }
);

// reset-password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }) => {
    const res = await resetPasswordHandler(password, token);
    if (!res.success) {
      throw new Error('Failed to reset password');
    }
    return res;
  }
);

// logout
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  await fetchWithRefresh(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return {};
});

export const authUserSlice = createSlice({
  name: 'user',
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
      .addCase(registerUser.fulfilled, (state, action) => {
        // нет изменений в хранилище после регистрации
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(authUserChecking.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(authUserChecking.rejected, (state) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.authHasChecked = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.emailSubmitedForResetPass = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        // нет изменений в хранилище
      });
  },
});

export const { setAuthChecked, setUser } = authUserSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAuthChecked = (state) => state.user.authHasChecked;
export const selectEmailSubmited = (state) =>
  state.user.emailSubmitedForResetPass;

export default authUserSlice.reducer;
