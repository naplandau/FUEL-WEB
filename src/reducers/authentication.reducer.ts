import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localStorageKeys from '../configs/localStorageKeys.config';

const initialState = {
  accessToken: localStorage.getItem(localStorageKeys.accessToken) || '',
};

const authenticationSlice = createSlice({
  name: 'authenticationReducer',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setAccessToken,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;