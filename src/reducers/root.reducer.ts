import { combineReducers } from '@reduxjs/toolkit';

import stationReducer from './station.reducer';

const rootReducer = combineReducers({
    stationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;