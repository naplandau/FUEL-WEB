import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllUsersApi from '../apis/getAllUsers.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import User from '../types/User.type';

const initialState = {
    listUsers: Array<User>(),
};

const userSlice = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<Array<User>>) {
            state.listUsers = action.payload;
        },
    },
});

export const {
    setUsers
} = userSlice.actions;

export const getUsers = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    console.log(accessToken)
    const response = await getAllUsersApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(setUsers([]));
    }

    dispatch(setUsers(response.data.data.filter((user: User) => user.role !== 1)));
}

export default userSlice.reducer;