import { combineReducers } from '@reduxjs/toolkit';

import stationReducer from './station.reducer';
import userReducer from './user.reducer';
import authorizationReducer from './authorization.reducer';
import authenticationReducer from './authentication.reducer';

const rootReducer = combineReducers({
    userReducer,
    authenticationReducer,
    authorizationReducer,
    stationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;