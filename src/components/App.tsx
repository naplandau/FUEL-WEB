/* eslint-disable react-hooks/exhaustive-deps */
//import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import { connect, ConnectedProps } from 'react-redux';

import paths from '../configs/paths.config';

//import { RootState } from '../reducers/root.reducer';
//import Home from './Home/Home';
import Login from './Login';
import Page404 from './common/Page404';
import Home from './Home/Home';
import StationDetail from './ListStations/StationDetails';
import ListStations from './ListStations/ListStations'

const App = () => {
    return (
        <Router basename={paths.base}>
            <Switch>
                <Route path={paths.base} exact component={Login} />
                <Route path={paths.home} exact component={Home} />
                <Route path={`${paths.listStations()}/:id`} exact component={StationDetail} />
                <Route path={paths.listStations()} exact component={ListStations} />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default App;