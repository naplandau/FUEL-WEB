import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import Price from '../types/Price.type';

import getAllHistoryPricesApi from '../apis/getAllHistoryPrices.api';
import addPriceApi, { AddPrice } from '../apis/adminAddPrice.api';

const initialState = {
    listHistoryPrices: Array<Price>(),
    code: 0
};

const listHistoryPricesSlice = createSlice({
    name: 'historyPriceReducer',
    initialState,
    reducers: {
        setListHistoryPrices(state, action: PayloadAction<{
            listHistoryPrices: Array<Price>,
        }>) {
            state.listHistoryPrices = action.payload.listHistoryPrices;
            state.code = 0;
        },
        addPrice(state, action: PayloadAction<Price>) {
            state.listHistoryPrices.push(action.payload);
        },
        clearListHistoryPrices(state) {
            state.listHistoryPrices = [];
            state.code = 0
        },
        setError(state, action: PayloadAction<number>) {
            state.code = action.payload;
        },
    }
});

export const {
    setListHistoryPrices,
    clearListHistoryPrices,
    setError,
    addPrice
} = listHistoryPricesSlice.actions;

export const fetchListHistoryPrices = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getAllHistoryPricesApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(clearListHistoryPrices());
    }

    dispatch(setListHistoryPrices({
        listHistoryPrices: response.data.data,
    }));
};

export const adminAddPrice = (credentials: AddPrice): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await addPriceApi(accessToken, credentials);
    console.log(response);

    if (isResponseError(response)) {
        return dispatch(setError(response.data.code));
    }
    dispatch(addPrice(response.data.data));
}

export default listHistoryPricesSlice.reducer;