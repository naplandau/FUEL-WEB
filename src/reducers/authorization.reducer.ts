import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import loginApi, { LoginBody } from '../apis/login.api';
import localStorageKeys from '../configs/localStorageKeys.config';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import { setAccessToken } from './authentication.reducer';

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

  console.log(response);

  localStorage.setItem(localStorageKeys.refreshToken, response.data.data.refreshToken);
  localStorage.setItem(localStorageKeys.accessToken, response.data.data.accessToken);

  dispatch(setAccessToken(response.data.data.accessToken));
  dispatch(loginSuccess(response.data.data.refreshToken));
};

// export const getAccessToken = (): AppThunk => async (dispatch) => {
//   const refreshToken = localStorage.getItem(localStorageKeys.refreshToken);
//   const response = await getAccessTokenApi(refreshToken);
//   if (isResponseError(response)) {
//     dispatch(loginFailed(''));
//     dispatch(setAccessToken(''));
//     return localStorage.clear();
//   }

//   localStorage.setItem(localStorageKeys.accessToken, response.data.accessToken);
//   dispatch(setAccessToken(response.data.accessToken));
//   dispatch(loginSuccess(refreshToken));
// };

// export const logout = (): AppThunk => async (dispatch, getState) => {
//   const state = getState();
//   const { authorizationReducer } = state;
//   //await logoutApi(authorizationReducer.refreshToken);
//   dispatch(loginFailed(''));
//   dispatch(setAccessToken(''));
// };

export default authorizationSlice.reducer;