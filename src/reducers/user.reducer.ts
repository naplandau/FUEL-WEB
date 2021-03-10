import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllUsersApi from '../apis/getAllUsers.api';
import getMeApi from '../apis/getMe.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';

const initialState = {
    me: null as User,
    listUsers: Array<User>(),
    error: ''
};

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<Array<User>>) {
            state.listUsers = action.payload;
        },
        setMe(state, action: PayloadAction<{
            me: User,
            error: string
        }>) {
            state.me = action.payload.me;
            state.error = action.payload.error;
        }
    },
});

export const {
    setUsers,
    setMe
} = userSlice.actions;

export const getUsers = (): AppThunk => async (dispatch, getState) => {
    const state = getState();

    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;

    if (!accessToken) {
        return;
    }

    const response = await getAllUsersApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(setUsers([]));
    }

    dispatch(setUsers(response.data.data.filter((user: User) => user.role !== 1)));
}

export const getMe = (): AppThunk => async (dispatch, getState) => {
    const state = getState();

    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;

    if (!accessToken) {
        return;
    }

    const response = await getMeApi(accessToken);
    console.log(response)

    if (isResponseError(response)) {
        return dispatch(setMe({
            me: null,
            error: response.error
        }))
    }
    dispatch(setMe({
        me: response.data.data,
        error: ''
    }))


}

export default userSlice.reducer;