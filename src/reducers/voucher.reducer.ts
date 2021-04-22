import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import Voucher from '../types/Voucher.type';
import getVoucherDetailsApi from '../apis/getVoucherDetails.api';

import getAllVouchersApi from '../apis/getAllVouchers.api';

const initialState = {
    listVouchers: Array<Voucher>(),
    voucher: null as Voucher,
    isFetchingVoucher: true,
    code: 0
};

const listVouchersSlice = createSlice({
    name: 'voucherReducer',
    initialState,
    reducers: {
        setVoucherDetails(state, action: PayloadAction<{
            voucher: Voucher,
            code: number,
        }>) {
            state.voucher = action.payload.voucher;
            state.code = action.payload.code;
            state.isFetchingVoucher = false;
        },
        resetVoucher(state) {
            state.voucher = null;
            state.isFetchingVoucher = true;
        },
        setListVouchers(state, action: PayloadAction<{
            listVouchers: Array<Voucher>,
        }>) {
            state.listVouchers = action.payload.listVouchers;
            state.code = 0;
        },
        clearListVouchers(state) {
            state.listVouchers = [];
        },
        setError(state, action: PayloadAction<number>) {
            state.code = action.payload;
        },
    }
});

export const {
    setListVouchers,
    clearListVouchers,
    setError,
    setVoucherDetails,
    resetVoucher
} = listVouchersSlice.actions;

export const fetchVoucherDetails = (voucherId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getVoucherDetailsApi(accessToken, voucherId);

    if (isResponseError(response)) {
        return dispatch(setVoucherDetails({ voucher: null, code: response.data.code }));
    }

    dispatch(setVoucherDetails({
        voucher: response.data.data,
        code: 0
    }));
}

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