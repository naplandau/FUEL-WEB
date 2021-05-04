import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import loginApi, { LoginBody } from '../apis/login.api';
import localStorageKeys from '../configs/localStorageKeys.config';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import { setAccessToken } from './authentication.reducer';
import getAccessTokenApi from '../apis/getAccessToken.api';

const initialState = {
  refreshToken: '',
  code: 0,
  isAuthorizing: true,
};

const authorizationSlice = createSlice({
  name: 'authorizationReducer',
  initialState,
  reducers: {
    setIsAuthorizing(state) {
      state.isAuthorizing = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      state.code = 200;
      state.isAuthorizing = false;
    },
    loginFailed(state, action: PayloadAction<number>) {
      state.code = action.payload;
      state.refreshToken = '';
      state.isAuthorizing = false;
      localStorage.clear();
    }
  },
});

export const {
  loginSuccess,
  loginFailed
} = authorizationSlice.actions;

export const login = (credentials: LoginBody): AppThunk => async (dispatch) => {
  const response = await loginApi(credentials);

  if (isResponseError(response)) {
    console.log('bbbbb')
    return dispatch(loginFailed(response.data.code));
  }

  if (response.data.code !== 200)
    return dispatch(loginFailed(response.data.code));

  localStorage.setItem(localStorageKeys.refreshToken, response.data.data.refreshToken);
  localStorage.setItem(localStorageKeys.accessToken, response.data.data.accessToken);
  // localStorage.setItem(localStorageKeys.userId, response.data.data.userId);

  dispatch(setAccessToken(response.data.data.accessToken));
  dispatch(loginSuccess(response.data.data.refreshToken));
};

export const getAccessToken = (userId: string): AppThunk => async (dispatch) => {
  const refreshToken = localStorage.getItem(localStorageKeys.refreshToken);
  const response = await getAccessTokenApi({ userId: userId, refreshToken: refreshToken });
  if (isResponseError(response)) {
    dispatch(loginFailed(0));
    dispatch(setAccessToken(''));
    return localStorage.clear();
  }

  localStorage.setItem(localStorageKeys.accessToken, response.data.accessToken);
  dispatch(setAccessToken(response.data.accessToken));
  dispatch(loginSuccess(refreshToken));
};

// export const logout = (): AppThunk => async (dispatch, getState) => {
//   const state = getState();
//   const { authorizationReducer } = state;
//   //await logoutApi(authorizationReducer.refreshToken);
//   dispatch(loginFailed(''));
//   dispatch(setAccessToken(''));
// };

export default authorizationSlice.reducer;