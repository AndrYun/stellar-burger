import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../components/utils/url';
import {
  authUserHandler,
  fetchWithRefresh,
  userRegisterHandler,
  getUserData,
  forgotPasswordRequest,
  resetPasswordHandler,
} from '../../../components/utils/api';
import { AppDispatch, RootState } from '../../store';

interface IUserData {
  name?: string;
  email?: string;
}

interface IAuthState {
  user: IUserData | null;
  authHasChecked: boolean;
  emailSubmitedForResetPass: boolean;
}

interface IAuthCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials extends IAuthCredentials {
  name: string;
}

interface IResetPasswordPayload {
  password: string;
  token: string;
}

const initialState: IAuthState = {
  user: null,
  authHasChecked: false,
  emailSubmitedForResetPass: false,
};

// register
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: IRegisterCredentials) => {
    const res = await userRegisterHandler(name, email, password);
    return res.user;
  }
);

// авторизация login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: IAuthCredentials) => {
    const res = await authUserHandler(email, password);
    localStorage.setItem('accessToken', res.accessToken || '');
    localStorage.setItem('refreshToken', res.refreshToken || '');
    return res.user;
  }
);

// запрос данных
export const fetchUserData = createAsyncThunk<IUserData>(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    const res = await fetchWithRefresh<IUserData>(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    });
    return res;
  }
);

// изменение данных
export const updateUserData = createAsyncThunk<IUserData, IRegisterCredentials>(
  'user/updateUserData',
  async ({ name, email, password }, thunkAPI) => {
    const res = await fetchWithRefresh<IUserData>(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return res;
  }
);

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return getUserData()
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch((err) => {
        console.log('Failed to fetch user data:', err);
      });
  };
};

// проверка авторизации
export const authUserChecking = createAsyncThunk<
  IUserData,
  void,
  { rejectValue: string }
>('user/checking', async (_, thunkAPI) => {
  const res = await fetchWithRefresh<IUserData>(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    },
  });
  return res;
});

// запрос на forgot-password
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => {
    const res = await forgotPasswordRequest(email);
    return res;
  }
);

// reset-password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }: IResetPasswordPayload) => {
    const res = await resetPasswordHandler(password, token);
    if (!res.success) {
      throw new Error('Failed to reset password');
    }
    return res;
  }
);

// logout
export const logout = createAsyncThunk(
  'user/logout',
  async (token: string | null, thunkAPI) => {
    await fetchWithRefresh(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {};
  }
);

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.authHasChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserData | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        // нет изменений в хранилище после регистрации
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.error('Registation failed: ', action.error?.message);
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUserData>) => {
        state.user = action.payload;
        state.authHasChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login failed:', action.error?.message);
      })
      .addCase(
        authUserChecking.fulfilled,
        (state, action: PayloadAction<IUserData>) => {
          state.user = action.payload;
          state.authHasChecked = true;
        }
      )
      .addCase(authUserChecking.rejected, (state) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.authHasChecked = true;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<IUserData>) => {
          state.user = action.payload;
          state.authHasChecked = true;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        console.error('Fetch user data failed:', action.error?.message);
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<IUserData>) => {
          state.user = action.payload;
        }
      )
      .addCase(updateUserData.rejected, (state, action) => {
        console.error('Update user data failed:', action.error.message);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.error('Logout failed:', action.error.message);
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.emailSubmitedForResetPass = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.error('Forgot password request failed:', action.error.message);
      })
      .addCase(resetPassword.fulfilled, () => {
        // нет изменений в хранилище
      })
      .addCase(resetPassword.rejected, (state, action) => {
        console.error('Reset password failed:', action.error.message);
      });
  },
});

export const { setAuthChecked, setUser } = authUserSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectAuthChecked = (state: RootState) =>
  state.user.authHasChecked;
export const selectEmailSubmited = (state: RootState) =>
  state.user.emailSubmitedForResetPass;

export default authUserSlice.reducer;
