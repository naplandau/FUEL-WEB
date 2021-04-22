import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllUsersApi from '../apis/getAllUsers.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';
import getUserDetailsApi from '../apis/getUserDetails.api';

const initialState = {
    user: null as User,
    listUsers: Array<User>(),
    code: 0,
    isFetchingUser: true,
};

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<{
            user: User,
            error: number,
        }>) {
            state.user = action.payload.user;
            state.code = action.payload.error;
            state.isFetchingUser = false;
        },
        resetUser(state) {
            state.user = null;
            state.isFetchingUser = true;
        },
        setUsers(state, action: PayloadAction<Array<User>>) {
            state.listUsers = action.payload;
        },
    },
});

export const {
    setUserDetails,
    setUsers,
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
    console.log(response);

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
            error: response.data.code
        }))
    }

    dispatch(setUserDetails({
        user: response.data.data,
        error: 0
    }))
}


export default userSlice.reducer;