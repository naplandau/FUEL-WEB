import { combineReducers } from '@reduxjs/toolkit';

import stationReducer from './station.reducer';
import usersReducer from './user.reducer';
import authorizationReducer from './authorization.reducer';
import authenticationReducer from './authentication.reducer';

const rootReducer = combineReducers({
    stationReducer,
    usersReducer,
    authorizationReducer,
    authenticationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;