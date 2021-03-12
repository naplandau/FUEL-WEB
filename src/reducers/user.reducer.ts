import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllUsersApi from '../apis/getAllUsers.api';
import getMeApi from '../apis/getMe.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';
import getUserDetailsApi from '../apis/getUserDetails.api';

const initialState = {
    user: null as User,
    me: null as User,
    listUsers: Array<User>(),
    error: ''
};

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<{
            user: User,
            error: string,
        }>) {
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
        resetUser(state) {
            state.user = null
        },
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
    setUserDetails,
    setUsers,
    setMe,
    resetUser
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

export const fetchUserDetails = (userId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();

    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;

    if (!accessToken) {
        return;
    }

    const response = await getUserDetailsApi(accessToken, userId);

    if (isResponseError(response)) {
        return dispatch(setUserDetails({
            user: null,
            error: response.error
        }))
    }

    dispatch(setUserDetails({
        user: response.data.data,
        error: ''
    }))
}
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
            error: response.error
        }))
    }
    dispatch(setMe({
        me: response.data.data,
        error: ''
    }))


}

export default userSlice.reducer;