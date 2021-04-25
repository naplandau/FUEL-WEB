import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getMeApi from '../apis/getMe.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';
import updateAccountApi, { UpdateAccountBody } from '../apis/updateAccount.api';
import changeAccountAvatarApi from '../apis/changeAccountAvatar.api';

const initialState = {
    me: null as User,
    code: 0
};

const accountSlice = createSlice({
    name: 'accountReducer',
    initialState,
    reducers: {
        setMe(state, action: PayloadAction<User>) {
            state.me = action.payload;
            state.code = 0;
        },
        clearMe(state) {
            state.me = initialState.me;
        },
        setError(state, action: PayloadAction<number>) {
            state.code = action.payload;
        }
    },
});

export const {
    setMe,
    clearMe,
    setError
} = accountSlice.actions;

export const getMe = (): AppThunk => async (dispatch, getState) => {
    const state = getState();

    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;

    if (!accessToken) {
        return;
    }

    const response = await getMeApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(setMe(null))
    }
    dispatch(setMe(response.data.data))
}

export const updateProfile = (credentials: UpdateAccountBody): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await updateAccountApi(credentials, accessToken);
    console.log(response);
    if (isResponseError(response)) {
        return dispatch(setError(response.data.code));
    }

    dispatch(setMe(response.data.data));
}

export const updateAccountAvatar = (credentials: FormData): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await changeAccountAvatarApi(credentials, accessToken);
    console.log(response)

    if (isResponseError(response)) {
        return dispatch(setError(response.data.code));
    }

    dispatch(setMe(response.data.data));
}

export default accountSlice.reducer;