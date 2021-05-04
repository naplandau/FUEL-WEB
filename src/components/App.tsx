/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/root.reducer';
import { getAccessToken } from '../reducers/authorization.reducer';
import loading from '../assets/loadings/medium.loading.gif';
import localStorageKeys from '../configs/localStorageKeys.config';

import paths from '../configs/paths.config';

//import { RootState } from '../reducers/root.reducer';
//import Home from './Home/Home';
import Login from './Login';
import Page404 from './common/Page404';
import ListUsers from './ListUsers/ListUsers';
import StationDetails from './ListStations/StationDetails';
import UserDetails from './ListUsers/UserDetails';
import ListStations from './ListStations/ListStations';
import { getMe } from '../reducers/account.reducer';
import ListTransactions from './ListTransactions/ListTransactions';
import ListVouchers from './ListVouchers/ListVouchers';
import ListHistoryPrices from './ListHistoryPrices/ListHistoryPrices';
import AdminProfile from './Home/AdminProfile';

const stateToProps = (state: RootState) => ({
    accessToken: state.authenticationReducer.accessToken,
    isAuthorizing: state.authorizationReducer.isAuthorizing,
    me: state.accountReducer.me
})

const dispatchToProps = {
    getMe,
    getAccessToken
};

const connector = connect(stateToProps, dispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

const App = ({
    me,
    accessToken,
    isAuthorizing,
    getMe,
    getAccessToken
}: AppProps) => {
    // useEffect(() => {
    //     let autoFetchAccessToken: NodeJS.Timeout = null;
    //     if (accessToken) {

    //         autoFetchAccessToken = setInterval(() => {
    //             getAccessToken(me.id);
    //         }, 3600) // auto fetch access token every 12 hours
    //     }

    //     return () => {
    //         try {
    //             clearInterval(autoFetchAccessToken);
    //             autoFetchAccessToken = null;
    //         }
    //         catch { /** ignored */ }
    //     }
    // }, [accessToken])

    return (
        <Router basename={paths.base}>
            <Switch>
                <Route path={paths.base} exact component={Login} />
                <Route path={paths.listUsers()} exact component={ListUsers} />
                <Route path={`${paths.listStations()}/:id`} exact component={StationDetails} />
                <Route path={paths.listStations()} exact component={ListStations} />
                <Route path={paths.listTransactions()} exact component={ListTransactions} />
                <Route path={`${paths.listUsers()}/:id`} exact component={UserDetails} />
                <Route path={paths.listVouchers()} exact component={ListVouchers} />
                <Route path={paths.listHistoryPrices()} exact component={ListHistoryPrices} />
                <Route path={paths.profile} exact component={AdminProfile} />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default connector(App);