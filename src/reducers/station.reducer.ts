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
import AddEditTank from '../types/AddEditTank.type';
import AddEditPool from '../types/AddEditPool.type';
import addTankApi from '../apis/addTank.api';
import addPoolApi from '../apis/addPool.api';
import deletePoolApi from '../apis/deletePool.api';
import deleteTankApi from '../apis/deleteTank.api';
import updateTankApi from '../apis/updateTank.api';
import updatePoolApi from '../apis/updatePool.api';
import getFuelPriceApi from '../apis/getFuelPrices.api';

const initialState = {
    station: null as StationDetails,
    listPrices: {},
    listStations: Array<StationDetails>(),
    error_code: 0
};

const listStationsSlice = createSlice({
    name: 'stationReducer',
    initialState,
    reducers: {
        setStationDetails(state, action: PayloadAction<{
            station: StationDetails,
            error_code: number,
        }>) {
            state.station = action.payload.station;
            state.error_code = action.payload.error_code;
        },
        resetStation(state) {
            state.station = null;
        },
        setListStations(state, action: PayloadAction<{
            listStations: Array<StationDetails>,
        }>) {
            state.listStations = action.payload.listStations;
            state.error_code = 0;
        },
        addStation(state, action: PayloadAction<StationDetails>) {
            state.listStations.push(action.payload);
            state.error_code = 0;
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
            state.error_code = 0;
        },
        setListPrices(state, action: PayloadAction<Object>) {
            state.listPrices = action.payload;
        },
        clearListStations(state) {
            state.listStations = [];
        },
        setError(state, action: PayloadAction<number>) {
            state.error_code = action.payload;
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
    resetStation,
    setListPrices
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

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
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
        return dispatch(setError(response.data.code));
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

    if (isResponseError(response)) {
        return dispatch(setError(response.data.code));
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

export const deletePool = (poolId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await deletePoolApi(poolId, accessToken);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }))
}

export const deleteTank = (tankId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await deleteTankApi(tankId, accessToken);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }
    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }))
}

export const createTank = (tank: AddEditTank): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await addTankApi(accessToken, tank);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }));
}

export const createPool = (pool: AddEditPool): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await addPoolApi(accessToken, pool);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }));
}

export const updateTank = (tank = {
    fuel_type: '',
    tank_position: 0,
}, tankId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await updateTankApi(tankId, accessToken, tank);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }));
}

export const updatePool = (pool = {
    type_name: '',
    fuel_amount: 0,
}, poolId: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const { authenticationReducer } = state;
    const { accessToken } = authenticationReducer;
    if (!accessToken) {
        return;
    }

    const response = await updatePoolApi(poolId, accessToken, pool);

    if (isResponseError(response)) {
        return dispatch(setStationDetails({ station: null, error_code: response.data.code }));
    }

    dispatch(setStationDetails({
        station: response.data.data,
        error_code: 0
    }));
}

export const fetchFuelPrices = (): AppThunk => async (dispatch) => {
    const response = await getFuelPriceApi();
    console.log(response);
    if (isResponseError(response)) {
        return dispatch(setListPrices({}));
    }

    dispatch(setListPrices(response.data.data));
}

export default listStationsSlice.reducer;