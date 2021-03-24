/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/root.reducer';

import paths from '../configs/paths.config';

//import { RootState } from '../reducers/root.reducer';
//import Home from './Home/Home';
import Login from './Login';
import Page404 from './common/Page404';
import ListUsers from './ListUsers/ListUsers';
import StationDetails from './ListStations/StationDetails';
import UserDetails from './ListUsers/UserDetails';
import ListStations from './ListStations/ListStations';
import { getMe } from '../reducers/user.reducer';
import HistoryProps from "../types/HistoryProps.type";
import ListTransactions from './ListTransactions/ListTransactions';
import ListVouchers from './ListVouchers.tsx/ListVouchers';

// const stateToProps = (state: RootState) => ({
//     accessToken: state.authenticationReducer.accessToken,
// })

// const dispatchToProps = {
//     getMe,
// };

// const connector = connect(stateToProps, dispatchToProps);

// type AppProps = ConnectedProps<typeof connector> & HistoryProps;

const App = () => {

    // useEffect(() => {
    //     getMe();
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
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default App;