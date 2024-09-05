import userReducer, {
  registerUser,
  login,
  authUserChecking,
  updateUserData,
  logout,
} from './user-auth-slice';
import {
  mockUserData,
  mockRegisterData,
  mockLoginData,
} from '../../mocks/mocks';

describe('check user reducer', () => {
  const initialState = {
    user: null,
    authHasChecked: false,
    emailSubmitedForResetPass: false,
  };
  // register
  describe('check async register', () => {
    it('should register pending', () => {
      const state = userReducer(
        initialState,
        registerUser.pending('pending', mockRegisterData)
      );
      expect(state.user).toBeNull();
    });

    it('should register fulfilled', () => {
      const state = userReducer(
        initialState,
        registerUser.fulfilled(mockUserData, 'fulfilled', mockRegisterData)
      );

      expect(state.user).toBeNull();
    });

    it('should register rejected', () => {
      const state = userReducer(
        initialState,
        registerUser.rejected('fulfilled', mockRegisterData)
      );

      expect(state.user).toBeNull();
    });
  });

  // login
  describe('check async login', () => {
    it('should login pending', () => {
      const state = userReducer(
        initialState,
        login.pending('pending', mockLoginData)
      );

      expect(state.user).toBeNull();
    });

    it('should login fulfilled', () => {
      const state = userReducer(
        initialState,
        login.fulfilled(mockUserData, 'fulfilled', mockLoginData)
      );

      expect(state.user).toEqual(mockUserData);
    });

    it('should login rejected', () => {
      const state = userReducer(
        initialState,
        login.rejected('rejected', mockLoginData)
      );

      expect(state.user).toBeNull();
    });
  });

  // logout
  describe('check logout', () => {
    it('should logout fulfilled', () => {
      const state = userReducer(
        initialState,
        logout.fulfilled(undefined, 'fulfilled')
      );

      expect(state.user).toBeNull();
    });
  });

  // auth checking
  describe('checking auth', () => {
    it('should check auth fulfilled', () => {
      const state = userReducer(
        initialState,
        authUserChecking.fulfilled(mockUserData, 'fulfilled')
      );

      expect(state.authHasChecked).toBeTruthy();
      expect(state.user).toEqual(mockUserData);
    });

    it('should check auth rejected', () => {
      const state = userReducer(
        initialState,
        authUserChecking.rejected(mockUserData, 'rejected')
      );

      expect(state.authHasChecked).toBeTruthy();
    });
  });

  // update user data
  describe('update user data', () => {
    it('should update user data fulfilled', () => {
      const state = userReducer(
        initialState,
        updateUserData.fulfilled(mockUserData, 'fulfilled')
      );

      expect(state.user).toEqual(mockUserData);
    });
  });
});
