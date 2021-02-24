import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllStationsApi from '../apis/getAllStations.api';
import deleteStationApi from '../apis/deleteStation.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import StationDetails from '../types/Station.type';

const initialState = {
    listStations: Array<StationDetails>(),
};

const listStationsSlice = createSlice({
    name: 'stationReducer',
    initialState,
    reducers: {
        setListStations(state, action: PayloadAction<{
            listStations: Array<StationDetails>,
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
} = listStationsSlice.actions;

export const fetchListStations = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getAllStationsApi(accessToken);

    if (isResponseError(response)) {
        return dispatch(clearListStations());
    }

    dispatch(setListStations({
        listStations: response.data.data,
    }));
};

export const deleteStation = (stationId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { stationReducer } = state;

    const response = await deleteStationApi(stationId);

    if (!isResponseError(response)) {
        dispatch(setListStations({
            listStations: stationReducer.listStations.filter(station => station._id !== stationId),
        }));
    }
}

export default listStationsSlice.reducer;