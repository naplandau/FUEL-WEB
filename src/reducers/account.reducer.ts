import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getMeApi from '../apis/getMe.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';

const initialState = {
    me: {
        id: '',
        name: '',
        email: '',
        avatar: '',
    },
    code: 0
};

const accountSlice = createSlice({
    name: 'accountReducer',
    initialState,
    reducers: {
        setMe(state, action: PayloadAction<{
            me: User,
            error: number
        }>) {
            state.me = action.payload.me;
            state.code = action.payload.error;
        }
    },
});

export const {
    setMe,
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
        return dispatch(setMe({
            me: null,
            error: response.data.code
        }))
    }
    dispatch(setMe({
        me: response.data.data,
        error: 0
    }))
}

export default accountSlice.reducer;