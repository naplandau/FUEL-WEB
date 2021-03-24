import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import Voucher from '../types/Voucher.type';

import getAllVouchersApi from '../apis/getAllVouchers.api';

const initialState = {
    listVouchers: Array<Voucher>(),
    error: ''
};

const listVouchersSlice = createSlice({
    name: 'VoucherReducer',
    initialState,
    reducers: {
        setListVouchers(state, action: PayloadAction<{
            listVouchers: Array<Voucher>,
        }>) {
            state.listVouchers = action.payload.listVouchers;
            state.error = '';
        },
        clearListVouchers(state) {
            state.listVouchers = [];
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
});

export const {
    setListVouchers,
    clearListVouchers,
    setError
} = listVouchersSlice.actions;

export const fetchListVouchers = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getAllVouchersApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(clearListVouchers());
    }

    dispatch(setListVouchers({
        listVouchers: response.data.data,
    }));
};

export default listVouchersSlice.reducer;