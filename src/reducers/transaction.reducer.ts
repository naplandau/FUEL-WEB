import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import TransactionDetails from '../types/Transaction.type';

import getAllTransactionsApi from '../apis/getAllTransactions.api';

const initialState = {
    listTransactions: Array<TransactionDetails>(),
    error: ''
};

const listTransactionsSlice = createSlice({
    name: 'transactionReducer',
    initialState,
    reducers: {
        setListTransactions(state, action: PayloadAction<{
            listTransactions: Array<TransactionDetails>,
        }>) {
            state.listTransactions = action.payload.listTransactions;
            state.error = '';
        },
        clearListTransactions(state) {
            state.listTransactions = [];
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
});

export const {
    setListTransactions,
    clearListTransactions,
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

export default listTransactionsSlice.reducer;