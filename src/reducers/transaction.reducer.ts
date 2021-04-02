import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import TransactionDetails from '../types/Transaction.type';

import getAllTransactionsApi from '../apis/getAllTransactions.api';
import getUserTransactionsApi from '../apis/getUserTransactions.api';

const initialState = {
    userListTransactions: Array<TransactionDetails>(),
    listTransactions: Array<TransactionDetails>(),
    code: 0
};

const listTransactionsSlice = createSlice({
    name: 'transactionReducer',
    initialState,
    reducers: {
        setListTransactions(state, action: PayloadAction<{
            listTransactions: Array<TransactionDetails>,
        }>) {
            state.listTransactions = action.payload.listTransactions;
            state.code = 0;
        },
        clearListTransactions(state) {
            state.listTransactions = [];
        },
        setUserListTransactions(state, action: PayloadAction<{
            listTransactions: Array<TransactionDetails>,
        }>) {
            state.userListTransactions = action.payload.listTransactions;
            state.code = 0;
        },
        clearUserListTransactions(state) {
            state.userListTransactions = [];
        },
        setError(state, action: PayloadAction<number>) {
            state.code = action.payload;
        },
    }
});

export const {
    setListTransactions,
    clearListTransactions,
    setUserListTransactions,
    clearUserListTransactions,
    setError
} = listTransactionsSlice.actions;

export const fetchListTransactions = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getAllTransactionsApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(clearListTransactions());
    }

    dispatch(setListTransactions({
        listTransactions: response.data.data,
    }));
};

export const fetchUserListTransactions = (userId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getUserTransactionsApi(accessToken, userId);

    if (isResponseError(response)) {
        return dispatch(clearUserListTransactions());
    }

    dispatch(setUserListTransactions({
        listTransactions: response.data.data,
    }));
}

export default listTransactionsSlice.reducer;