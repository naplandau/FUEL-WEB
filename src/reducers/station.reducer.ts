import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getAllStationsApi from '../apis/getAllStations.api';
import deleteStationApi from '../apis/deleteStation.api';
import getStationDetailsApi from '../apis/getStationDetails.api';
import { AppThunk } from '../configs/store.config';
import { isResponseError } from '../types/ResponseError.type';
import StationDetails from '../types/Station.type';
import addStationApi from '../apis/addStation.api';
import updateStationApi from '../apis/updateStation.api';
import AddEditStation from '../types/AddEditStation.type';

const initialState = {
    station: null as StationDetails,
    listStations: Array<StationDetails>(),
    error: ''
};

const listStationsSlice = createSlice({
    name: 'stationReducer',
    initialState,
    reducers: {
        setStationDetails(state, action: PayloadAction<{
            station: StationDetails,
            error: string,
        }>) {
            state.station = action.payload.station;
            state.error = action.payload.error;
        },
        resetStation(state) {
            state.station = null;
        },
        setListStations(state, action: PayloadAction<{
            listStations: Array<StationDetails>,
        }>) {
            state.listStations = action.payload.listStations;
            state.error = '';
        },
        addStation(state, action: PayloadAction<StationDetails>) {
            state.listStations.push(action.payload);
            state.error = '';
        },
        editStation(state, action: PayloadAction<StationDetails>) {
            state.listStations = state.listStations.map(station => {
                if (station._id === action.payload._id) {
                    return {
                        ...station,
                        description: action.payload.description,
                        name: action.payload.name,
                        long: action.payload.long,
                        lat: action.payload.lat,
                        address: action.payload.address,
                        working_hour_from: action.payload.working_hour_from,
                        working_hour_to: action.payload.working_hour_to
                    }
                }
                return station;
            })
            state.error = '';
        },
        clearListStations(state) {
            state.listStations = [];
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
});

export const {
    setStationDetails,
    setListStations,
    clearListStations,
    setError,
    addStation,
    editStation,
    resetStation
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

export const fetchStationDetails = (stationId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await getStationDetailsApi(accessToken, stationId);
    console.log(response);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error: response.error }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error: ''
    }));
}

export const createStation = (station: AddEditStation): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await addStationApi(accessToken, station);

    if (isResponseError(response)) {
        return dispatch(setError(response.error));
    }

    dispatch(addStation(response.data.data));
}

export const updateStation = (station = {
    name: '',
    address: '',
    description: '',
    long: 0,
    lat: 0,
    working_hour_from: '',
    working_hour_to: ''
}, stationId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await updateStationApi(stationId, accessToken, station);
    console.log(response);

    if (isResponseError(response)) {
        return dispatch(setError(response.error));
    }

    dispatch(editStation(response.data.data));
}

export const deleteStation = (stationId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer, stationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await deleteStationApi(stationId, accessToken);

    if (!isResponseError(response)) {
        dispatch(setListStations({
            listStations: stationReducer.listStations.filter(station => station._id !== stationId),
        }));
    }
}

export default listStationsSlice.reducer;