import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import Price from '../types/Price.type';

import getAllHistoryPricesApi from '../apis/getAllHistoryPrices.api';

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
        clearListHistoryPrices(state) {
            state.listHistoryPrices = [];
        },
        setError(state, action: PayloadAction<number>) {
            state.code = action.payload;
        },
    }
});

export const {
    setListHistoryPrices,
    clearListHistoryPrices,
    setError
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

export default listHistoryPricesSlice.reducer;