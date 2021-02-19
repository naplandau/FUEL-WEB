import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllStationsApi from '../apis/getAllStations.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import StationType from '../types/Station.type';

const initialState = {
    listStations: Array<StationType>(),
};

const stationSlice = createSlice({
    name: 'stationSlice',
    initialState,
    reducers: {
        setListStations(state, action: PayloadAction<{
            listStations: Array<StationType>,
        }>) {
            state.listStations = action.payload.listStations;
        },
        clearListStations(state) {
            state.listStations = [];
        }
    }
});

export const {
    setListStations,
    clearListStations,
} = stationSlice.actions;

export const fetchListStations = (): AppThunk => async (dispatch, getState) => {
    //const state = getState();
    //const { authenticationReducer } = state;

    const response = await getAllStationsApi();

    if (isResponseError(response)) {
        return dispatch(clearListStations());
    }

    dispatch(setListStations({
        listStations: response.data.stations,
    }));
};

export default stationSlice.reducer;