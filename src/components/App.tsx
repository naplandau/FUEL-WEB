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
import Home from './Home/Home';
import StationDetail from './ListStations/StationDetails';
import ListStations from './ListStations/ListStations';
import { getMe } from '../reducers/user.reducer';
import HistoryProps from "../types/HistoryProps.type";
import ListTransactions from './ListTransactions/ListTransactions';

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
                <Route path={paths.home} exact component={Home} />
                <Route path={`${paths.listStations()}/:id`} exact component={StationDetail} />
                <Route path={paths.listStations()} exact component={ListStations} />
                <Route path={paths.listTransactions()} exact component={ListTransactions} />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default App;